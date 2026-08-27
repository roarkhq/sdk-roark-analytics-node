#!/bin/sh
#
# Installs the Roark CLI.
#
#   curl -fsSL https://roark.ai/install.sh | sh
#
# The CLI is published to npm, but this script deliberately does not run
# `npm install -g`. A global install writes into whatever prefix npm happens to
# be configured with - often a root-owned one, which is why the usual advice
# ends in `sudo` - and it puts the CLI at the mercy of the next `npm cache
# clean` or Node upgrade. Instead this fetches the published tarball, checks it
# against the integrity hash the registry serves, and unpacks it under
# ~/.roark/versions/<version>, with a `current` symlink and a small shim on
# PATH. Nothing outside $ROARK_HOME and $ROARK_BIN_DIR is written, and no step
# needs elevation.
#
# Node is still required (>= 20): the CLI is JavaScript, and npm - which ships
# with Node - is what resolves the dependency tree into the version directory.
# That resolution is local to the install directory, never global.
#
# Environment:
#   ROARK_VERSION      version to install, or `latest` (default: latest)
#   ROARK_HOME         where versions live (default: ~/.roark)
#   ROARK_BIN_DIR      where the `roark` symlink goes (default: ~/.local/bin)
#
# Flags: --version <v>, --uninstall, --help

set -eu

PACKAGE='@roarkanalytics/cli'
REGISTRY="${ROARK_REGISTRY:-https://registry.npmjs.org}"
VERSION="${ROARK_VERSION:-latest}"
ROARK_HOME="${ROARK_HOME:-$HOME/.roark}"
BIN_DIR="${ROARK_BIN_DIR:-$HOME/.local/bin}"
MIN_NODE_MAJOR=20
UNINSTALL=0

# ---------------------------------------------------------------- output ----

# Colour only when stderr is a terminal. Progress goes to stderr throughout so
# that `curl ... | sh > log` still shows the user what is happening, and so the
# script stays silent on stdout for anyone parsing it.
if [ -t 2 ] && [ -z "${NO_COLOR:-}" ]; then
  BOLD=$(printf '\033[1m') DIM=$(printf '\033[2m') RED=$(printf '\033[31m')
  GREEN=$(printf '\033[32m') RESET=$(printf '\033[0m')
else
  BOLD='' DIM='' RED='' GREEN='' RESET=''
fi

say() { printf '%s\n' "$*" >&2; }
step() { printf '%s==>%s %s\n' "$BOLD" "$RESET" "$*" >&2; }
detail() { printf '    %s%s%s\n' "$DIM" "$*" "$RESET" >&2; }

die() {
  printf '%serror:%s %s\n' "$RED" "$RESET" "$1" >&2
  shift
  for line in "$@"; do printf '       %s\n' "$line" >&2; done
  exit 1
}

usage() {
  cat >&2 <<EOF
Install the Roark CLI.

Usage:
  curl -fsSL https://roark.ai/install.sh | sh
  curl -fsSL https://roark.ai/install.sh | sh -s -- --version 0.1.1

Options:
  --version <version>   install a specific version (default: latest)
  --uninstall           remove the CLI and everything this script installed
  --help                show this message

Environment:
  ROARK_VERSION         same as --version
  ROARK_HOME            install root (default: ~/.roark)
  ROARK_BIN_DIR         directory for the roark symlink (default: ~/.local/bin)
EOF
}

# ------------------------------------------------------------------ args ----

while [ $# -gt 0 ]; do
  case "$1" in
    --version)
      [ $# -ge 2 ] || die '--version needs a value, e.g. --version 0.1.1'
      VERSION="$2"
      shift 2
      ;;
    --version=*)
      VERSION="${1#--version=}"
      shift
      ;;
    --uninstall)
      UNINSTALL=1
      shift
      ;;
    --help | -h)
      usage
      exit 0
      ;;
    *) die "unknown option: $1" 'Run with --help to see the supported flags.' ;;
  esac
done

# ------------------------------------------------------------- uninstall ----

if [ "$UNINSTALL" -eq 1 ]; then
  step "Removing the Roark CLI"
  # Only remove the symlink if it is ours. Someone with a `roark` from Homebrew
  # or npm on the same PATH should keep it.
  if [ -L "$BIN_DIR/roark" ]; then
    link=$(readlink "$BIN_DIR/roark")
    case "$link" in
      "$ROARK_HOME"/*) rm -f "$BIN_DIR/roark" && detail "removed $BIN_DIR/roark" ;;
      *) detail "left $BIN_DIR/roark alone: it points at $link, not at $ROARK_HOME" ;;
    esac
  fi
  if [ -d "$ROARK_HOME" ]; then
    rm -rf "$ROARK_HOME"
    detail "removed $ROARK_HOME"
  fi
  say ''
  say "Uninstalled. Your credential file, if you stored one elsewhere, was not touched."
  exit 0
fi

# ------------------------------------------------------ required tooling ----

have() { command -v "$1" >/dev/null 2>&1; }

if have curl; then
  DOWNLOAD='curl'
elif have wget; then
  DOWNLOAD='wget'
else
  die 'neither curl nor wget is installed' 'One of them is needed to reach the npm registry.'
fi

have tar || die 'tar is not installed' 'The published package is a tarball; tar unpacks it.'

have node || die \
  'Node.js is not installed' \
  "The Roark CLI is a Node program and needs Node $MIN_NODE_MAJOR or newer." \
  'Install it from https://nodejs.org, or with your package manager, then re-run this script.'

node_version=$(node --version 2>/dev/null | sed 's/^v//')
node_major=${node_version%%.*}
case "$node_major" in
  '' | *[!0-9]*) die "could not read the Node version (got '$node_version')" ;;
esac
[ "$node_major" -ge "$MIN_NODE_MAJOR" ] || die \
  "Node $node_version is too old" \
  "The CLI needs Node $MIN_NODE_MAJOR or newer. Upgrade Node and re-run this script."

have npm || die \
  'npm is not installed' \
  'npm normally ships with Node; it is used here to resolve the CLI dependencies' \
  "into $ROARK_HOME. Nothing is installed globally."

# --------------------------------------------------------------- fetch -----

# One helper for both downloaders so the rest of the script never branches.
# `-` writes to stdout, matching curl's default.
download() {
  url="$1"
  dest="${2:--}"
  if [ "$DOWNLOAD" = 'curl' ]; then
    if [ "$dest" = '-' ]; then curl -fsSL "$url"; else curl -fsSL "$url" -o "$dest"; fi
  else
    if [ "$dest" = '-' ]; then wget -qO- "$url"; else wget -qO "$dest" "$url"; fi
  fi
}

step "Resolving $PACKAGE@$VERSION"

# The registry serves a per-version document at /<pkg>/<version>, and `latest`
# is a valid path segment there, so one request covers both cases. Node parses
# the JSON: it is already a hard requirement, which makes jq one fewer thing to
# depend on.
metadata_url="$REGISTRY/$(printf '%s' "$PACKAGE" | sed 's|/|%2f|')/$VERSION"
# stderr is dropped here, and only here: a 404 on this request is an expected
# outcome (a version that does not exist), and the message below says more about
# it than curl's does.
metadata=$(download "$metadata_url" 2>/dev/null || true)
[ -n "$metadata" ] || die \
  "could not find $PACKAGE@$VERSION on the registry" \
  "Tried $metadata_url" \
  'Check the version number, and that you can reach the network.'

# Three fields on three lines, so the shell can read them without a JSON parser
# of its own. A missing field is a hard error rather than an empty string that
# would fail confusingly later.
resolved=$(printf '%s' "$metadata" | node -e '
  let raw = "";
  process.stdin.on("data", (c) => (raw += c));
  process.stdin.on("end", () => {
    let doc;
    try {
      doc = JSON.parse(raw);
    } catch {
      console.error("the registry did not return JSON");
      process.exit(1);
    }
    const version = doc.version;
    const tarball = doc.dist && doc.dist.tarball;
    const integrity = (doc.dist && (doc.dist.integrity || doc.dist.shasum)) || "";
    if (!version || !tarball) {
      console.error("the registry document has no version or tarball");
      process.exit(1);
    }
    process.stdout.write([version, tarball, integrity].join("\n"));
  });
') || die "could not read the registry response for $PACKAGE@$VERSION"

RESOLVED_VERSION=$(printf '%s' "$resolved" | sed -n '1p')
TARBALL_URL=$(printf '%s' "$resolved" | sed -n '2p')
INTEGRITY=$(printf '%s' "$resolved" | sed -n '3p')

detail "resolved to $RESOLVED_VERSION"

TARGET="$ROARK_HOME/versions/$RESOLVED_VERSION"

TMP=$(mktemp -d "${TMPDIR:-/tmp}/roark-install.XXXXXX") ||
  die 'could not create a temporary directory'
cleanup() { rm -rf "$TMP"; }
trap cleanup EXIT INT TERM HUP

step "Downloading $RESOLVED_VERSION"
download "$TARBALL_URL" "$TMP/package.tgz" ||
  die "could not download $TARBALL_URL"

# --------------------------------------------------------------- verify ----

# npm publishes `integrity` as `<algo>-<base64 digest>` (sha512 in practice) and
# an older `shasum` (sha1). Verify whichever came back. This catches a corrupted
# download and a tampered mirror; it is not a substitute for the registry's own
# signatures, which npm checks when it installs the dependencies below.
if [ -n "$INTEGRITY" ]; then
  step 'Verifying the download'
  # shellcheck disable=SC2016  # the single quotes are the point: this is JavaScript, not shell
  INTEGRITY="$INTEGRITY" TARBALL="$TMP/package.tgz" node -e '
    const crypto = require("node:crypto");
    const fs = require("node:fs");
    const integrity = process.env.INTEGRITY;
    const file = fs.readFileSync(process.env.TARBALL);
    const dashed = integrity.indexOf("-");
    // A bare hex digest is the legacy `shasum` field, which is always sha1.
    const [algorithm, expected] =
      dashed === -1 ? ["sha1", integrity] : [integrity.slice(0, dashed), integrity.slice(dashed + 1)];
    const encoding = dashed === -1 ? "hex" : "base64";
    let actual;
    try {
      actual = crypto.createHash(algorithm).update(file).digest(encoding);
    } catch {
      console.error(`unsupported integrity algorithm: ${algorithm}`);
      process.exit(1);
    }
    if (actual !== expected) {
      console.error(`${algorithm} mismatch\n  expected ${expected}\n  actual   ${actual}`);
      process.exit(1);
    }
  ' || die \
    'the downloaded package does not match the checksum the registry published' \
    'Nothing was installed. This is usually a truncated download - try again.' \
    'If it keeps happening, do not use the file; report it to support@roark.ai.'
  detail "${INTEGRITY%%-*} matches"
fi

# -------------------------------------------------------------- install ----

step 'Unpacking'
mkdir -p "$TMP/stage"
# npm tarballs put everything under `package/`; strip that so the version
# directory holds the package itself rather than a directory named after it.
tar -xzf "$TMP/package.tgz" -C "$TMP/stage" --strip-components=1 ||
  die 'could not unpack the downloaded package'

[ -f "$TMP/stage/bin.js" ] ||
  die 'the downloaded package has no bin.js' 'It is not a Roark CLI tarball.'

step 'Installing dependencies'
detail 'npm, writing only inside the install directory'
# --omit=dev: the tarball declares none, but a future one might.
# --ignore-scripts: nothing in this tree needs to run code at install time, and
#   a curl-to-shell installer is the wrong place to start.
# --no-package-lock: there is no lockfile in the tarball, and letting npm write
#   one into a directory we are about to freeze serves no purpose.
#
# stdin is redirected for this command alone, and for the same reason it is not
# redirected for the script as a whole: under `curl | sh` the shell is reading
# this script *from* stdin, so closing it globally truncates the script. Closing
# it per-command still keeps npm from ever reading script text as a prompt
# answer.
(
  cd "$TMP/stage" &&
    npm_config_update_notifier=false npm install \
      --omit=dev --ignore-scripts --no-audit --no-fund --no-package-lock --no-progress --loglevel=error \
      </dev/null
) || die \
  'could not install the CLI dependencies' \
  'The npm output above says why. A dependency published in the last day can' \
  'be rejected by a registry mirror; if so, retry shortly.'

step "Installing to $TARGET"
mkdir -p "$ROARK_HOME/versions"
# Replace rather than merge: a version directory left over from an interrupted
# run should not contribute stale files to this one.
rm -rf "$TARGET"
mv "$TMP/stage" "$TARGET"

# `current` is what the shim resolves through, so switching versions is a
# symlink swap and never leaves the shim pointing at a half-written directory.
ln -sfn "$TARGET" "$ROARK_HOME/current"

mkdir -p "$ROARK_HOME/bin"
# A shim rather than a symlink straight to bin.js, so that what sits on your
# PATH is one stable file: upgrades move `current` and leave it untouched.
# `node` is resolved from PATH at run time rather than baked in here, so a Node
# upgrade that relocates the binary does not break an existing install.
cat > "$ROARK_HOME/bin/roark" <<EOF
#!/bin/sh
# Generated by the Roark CLI installer. Re-run the installer to update.
exec node "$ROARK_HOME/current/bin.js" "\$@"
EOF
chmod 755 "$ROARK_HOME/bin/roark"

# Man pages ship inside the package as bare `*.1` files. `man` wants them under
# a `man1` directory, so point one at the current version rather than copying
# every page on every upgrade.
mkdir -p "$ROARK_HOME/share/man"
if [ -d "$TARGET/man" ]; then
  ln -sfn "$ROARK_HOME/current/man" "$ROARK_HOME/share/man/man1"
fi

mkdir -p "$BIN_DIR"
ln -sfn "$ROARK_HOME/bin/roark" "$BIN_DIR/roark"

# Old versions are dead weight once `current` has moved. Keep the one just
# installed and drop the rest; an install is cheap to repeat.
for dir in "$ROARK_HOME"/versions/*; do
  [ -d "$dir" ] || continue
  [ "$dir" = "$TARGET" ] || rm -rf "$dir"
done

# --------------------------------------------------------------- verify ----

# The install is only real if the shim runs and reports the version we just
# unpacked. Run it by path: $BIN_DIR may not be on PATH yet.
step 'Verifying the install'
reported=$("$ROARK_HOME/bin/roark" --version 2>/dev/null </dev/null) || die \
  'the installed CLI did not start' \
  "Try running $ROARK_HOME/bin/roark --version to see the error."
[ "$reported" = "$RESOLVED_VERSION" ] || die \
  "the installed CLI reports $reported, but $RESOLVED_VERSION was installed"
detail "roark $reported"

# ----------------------------------------------------------- next steps ----

say ''
say "${GREEN}Installed${RESET} ${BOLD}roark $RESOLVED_VERSION${RESET} to $ROARK_HOME"
say ''

# Check PATH by resolution rather than by string matching, so a $BIN_DIR that is
# on PATH under a different spelling (a symlinked home, a trailing slash) does
# not produce a spurious warning.
on_path=0
if resolved_bin=$(command -v roark 2>/dev/null); then
  [ "$resolved_bin" = "$BIN_DIR/roark" ] && on_path=1
fi

if [ "$on_path" -eq 1 ]; then
  say "Next:"
  say "  roark auth login       ${DIM}# store your API key${RESET}"
  say "  roark call list --limit 5"
  say ''
  say "For \`man roark\`, add the man pages to MANPATH:"
  say "  export MANPATH=\"$ROARK_HOME/share/man:\$MANPATH\""
else
  say "${BOLD}$BIN_DIR is not on your PATH.${RESET} Add it:"
  say ''
  # These paths are printed for the reader to copy into their own shell, where
  # the tilde does expand; expanding it here would only make the line longer.
  # shellcheck disable=SC2088
  case "${SHELL##*/}" in
    zsh) rc='~/.zshrc' ;;
    bash) rc='~/.bashrc' ;;
    fish) rc='~/.config/fish/config.fish' ;;
    *) rc='your shell profile' ;;
  esac
  if [ "${SHELL##*/}" = 'fish' ]; then
    say "  fish_add_path $BIN_DIR      ${DIM}# then restart your shell${RESET}"
  else
    say "  echo 'export PATH=\"$BIN_DIR:\$PATH\"' >> $rc"
    say "  source $rc"
  fi
  say ''
  say "Or run it by path: $BIN_DIR/roark --help"
fi

say ''
say "Docs: https://docs.roark.ai/documentation/sdks/cli"
