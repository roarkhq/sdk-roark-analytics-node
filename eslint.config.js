// eslint.config.js

import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import { includeIgnoreFile } from '@eslint/compat'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import prettier from 'eslint-plugin-prettier'

// These rules are taken from the shared
// [@roarkhq/config-eslint](https://github.com/roarkhq/config-eslint) package
import roarkLint from '@roarkhq/config-eslint/rules/node.cjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

export default [
  includeIgnoreFile(gitignorePath),
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: { prettier, roarkLint },
    rules: roarkLint.rules,
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
]
