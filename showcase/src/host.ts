import type { PluginHost } from '../host'

/**
 * Alabaster's side of the contract. It is in place before a plugin's entry
 * file runs, so this can be read at module load.
 */
export const host = (globalThis as unknown as { __ALABASTER_PLUGIN_HOST__: PluginHost })
  .__ALABASTER_PLUGIN_HOST__

/** This plugin's id — the same value as `id` in `plugin.json`. */
export const pluginId = 'showcase'

/** The key of the one module this plugin contributes. */
export const moduleKey = 'showcase'
