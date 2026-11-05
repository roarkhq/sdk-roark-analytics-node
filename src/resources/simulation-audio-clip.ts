// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class SimulationAudioClip extends APIResource {
  /**
   * Returns the audio a CUSTOMER_AUDIO step can play: hold music, hold tones and
   * ringback. Name one as the step's `audioClip`. A fixed catalogue, so it is not
   * paginated.
   *
   * @example
   * ```ts
   * const simulationAudioClips =
   *   await client.simulationAudioClip.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<SimulationAudioClipListResponse> {
    return this._client.get('/v1/simulation/audio-clip', options);
  }
}

export interface SimulationAudioClipListResponse {
  data: Array<SimulationAudioClipListResponse.Data>;
}

export namespace SimulationAudioClipListResponse {
  export interface Data {
    /**
     * The kind of audio this is
     */
    category: 'HOLD_MUSIC' | 'HOLD_TONE' | 'RINGBACK';

    /**
     * What a CUSTOMER_AUDIO step names as its `audioClip`
     */
    clip:
      | 'HOLD_MUSIC_CLASSICAL_PIANO'
      | 'HOLD_MUSIC_CLASSICAL_ORCHESTRA'
      | 'HOLD_MUSIC_STRING_QUARTET'
      | 'HOLD_MUSIC_AMBIENT'
      | 'HOLD_MUSIC_SMOOTH_JAZZ'
      | 'HOLD_MUSIC_SOFT_SYNTH'
      | 'HOLD_BEEP'
      | 'RINGBACK_US'
      | 'RINGBACK_UK';

    /**
     * What it sounds like
     */
    description: string;

    /**
     * What the clip is called
     */
    name: string;
  }
}

export declare namespace SimulationAudioClip {
  export { type SimulationAudioClipListResponse as SimulationAudioClipListResponse };
}
