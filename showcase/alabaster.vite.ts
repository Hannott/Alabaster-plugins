import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import type { Plugin } from 'vite'

/**
 * Builds an Alabaster plugin: one ES module, one stylesheet, and the manifest,
 * in `dist/<plugin id>/` — the folder to copy to
 * `config/alabaster/plugins/<plugin id>/` on the printer.
 *
 * Two things here are not negotiable, and both follow from how Alabaster loads
 * a plugin (from a Blob URL of text it fetched and fingerprinted):
 *
 * - **One file.** A Blob URL has no base to resolve a relative import against,
 *   so nothing may be split into a second chunk.
 * - **`vue` comes from the host.** A plugin that bundled its own copy of Vue
 *   would have its own reactivity system: its components would not see
 *   Alabaster's stores change, and Alabaster's components would not accept its
 *   slots. Every import of `vue` — including the ones a compiled `.vue` file
 *   makes — is rewritten to read from the object Alabaster exposes.
 */
const hostGlobal = '__ALABASTER_PLUGIN_HOST__'
const vueModuleId = '\0alabaster-host-vue'

interface Manifest {
  id: string
  entry?: string
  style?: string
}

export function alabasterPlugin(): Plugin {
  const root = process.cwd()
  const manifestPath = resolve(root, 'plugin.json')
  const manifestSource = readFileSync(manifestPath, 'utf8')
  const manifest = JSON.parse(manifestSource) as Manifest
  const entry = manifest.entry ?? 'index.js'
  const style = (manifest.style ?? 'style.css').replace(/\.css$/, '')
  let vueExports: string[] = []

  return {
    name: 'alabaster-plugin',
    enforce: 'pre',

    config() {
      return {
        define: { 'process.env.NODE_ENV': JSON.stringify('production') },
        build: {
          outDir: `dist/${manifest.id}`,
          emptyOutDir: true,
          lib: {
            entry: resolve(root, 'src/index.ts'),
            formats: ['es'],
            fileName: () => entry,
            cssFileName: style,
          },
          rolldownOptions: {
            output: { codeSplitting: false },
          },
        },
      }
    },

    async buildStart() {
      const vue = (await import('vue')) as Record<string, unknown>
      // Loaded through Node's CommonJS build, which adds names that are not
      // exports of Vue at all (`default`, `module.exports`).
      vueExports = Object.keys(vue).filter(
        (name) => name !== 'default' && /^[A-Za-z_$][\w$]*$/.test(name),
      )
      this.addWatchFile(manifestPath)
    },

    resolveId(source) {
      return source === 'vue' ? vueModuleId : null
    },

    load(id) {
      if (id !== vueModuleId) return null
      const lines = vueExports.map((name) => `export const ${name} = Vue.${name}`)
      return [`const Vue = globalThis.${hostGlobal}.vue`, ...lines].join('\n')
    },

    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'plugin.json',
        source: readFileSync(manifestPath, 'utf8'),
      })
    },
  }
}
