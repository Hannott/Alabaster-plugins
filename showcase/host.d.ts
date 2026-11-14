/**
 * Everything Alabaster hands a plugin, as `globalThis.__ALABASTER_PLUGIN_HOST__`.
 * `src/host.ts` re-exports it typed; import from there.
 *
 * This file describes plugin API version 1. Names are only ever added within a
 * version, so a plugin built against this file keeps working on a newer
 * Alabaster that still reports the same `apiVersion`.
 */
import type { Component, ComputedRef, Ref } from 'vue'

export type IconName = string

export type AvailabilityRequirement = 'local' | 'moonraker' | 'klipper'

/**
 * One of Alabaster's stores. Typed loosely on purpose: the stores are the
 * application's own and change between releases, so what a plugin reads from
 * one is not part of the versioned contract. Check a value's type before
 * relying on it.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HostStore = Record<string, any>

/** One card's own stored configuration, and the state of its two settings layers. */
export interface ModuleContext {
  instanceId: string
  config: ComputedRef<Record<string, unknown>>
  /** Merges `patch` into the card's configuration and saves it with the dashboard. */
  updateConfig: (patch: Record<string, unknown>) => void
  isSettingsOpen: ComputedRef<boolean>
  isSurfaceOpen: ComputedRef<boolean>
}

/** Which settings are promoted to the card's quick layer. */
export interface QuickSettings {
  quickKeys: ComputedRef<string[]>
  isQuick: (key: string) => boolean
  setQuick: (key: string, shown: boolean) => void
  /** Whether the row for `key` renders in the current mode. */
  visible: (key: string) => boolean
}

export interface PluginText {
  /** A string from the plugin's own `messages`. */
  t: (key: string, named?: Record<string, unknown>) => string
  /** A string from Alabaster's own catalogue, by its full key. */
  tHost: (key: string, named?: Record<string, unknown>) => string
  locale: Ref<string>
}

export interface Availability {
  isAvailable: ComputedRef<boolean>
  isRecovering: ComputedRef<boolean>
  isStale: ComputedRef<boolean>
}

export interface PluginHost {
  apiVersion: number
  vue: typeof import('vue')

  components: {
    /** A button. Props: `label`, `variant`, `size`, `icon`, `iconOnly`, `disabled`, `block`. */
    AppButton: Component
    /** A labelled number or text field. `v-model`; props: `label`, `unit`, `min`, `max`, `step`, `size`, `type`. */
    AppField: Component
    /** A labelled dropdown. `v-model` (string); props: `label`, `options: { value, label }[]`. */
    AppSelect: Component
    /** A slider, for a range that is dragged. `v-model` (number); props: `label`, `min`, `max`, `step`, `unit`. */
    AppSlider: Component
    /** A read-only status. Props: `text`, `tone`, `size`. */
    AppStatusField: Component
    /** A progress bar. Props: `value` (0–1), `label`. */
    AppProgressBar: Component
    /** A labelled row with an optional switch and value. `v-model` (boolean); props: `label`, `icon`, `toggle`, `value`, `unit`. */
    AppOutputRow: Component
    /** A glyph from Alabaster's icon set. Props: `name`. */
    AppIcon: Component
    /** Dims its content while the printer is unreachable. Props: `requires`. */
    AvailabilityRegion: Component
    /** A yes/no confirmation. Props: `open`, `title`, `description`, `items`, `confirmLabel`, `tone`; emits `confirm`, `cancel`. */
    ConfirmDialog: Component
    /** Asks for one short value. Props: `open`, `title`, `label`, `confirmLabel`; emits `confirm`, `cancel`. */
    PromptDialog: Component
    /** A page's heading. Props: `title`. */
    PageHeading: Component
    /** One named group of settings in a settings pane. Props: `title`, `hint`, `divided`. */
    SurfaceSection: Component
    /** The pin beside a setting that promotes it to the card. Props: `label`, `shown`; emits `toggle`. */
    QuickSettingToggle: Component
  }

  /** The configuration of the card this component is rendered in. */
  useModule: (pluginId: string, moduleKey: string) => ModuleContext
  useQuickSettings: (
    config: ComputedRef<Record<string, unknown>>,
    updateConfig: (patch: Record<string, unknown>) => void,
    defaultKeys: readonly string[],
    mode?: () => 'pane' | 'quick',
  ) => QuickSettings

  /** Typed reads of a stored value, each falling back when it is missing or the wrong type. */
  configBoolean: (config: Record<string, unknown>, key: string, fallback: boolean) => boolean
  configNumber: (config: Record<string, unknown>, key: string, fallback: number) => number
  configString: (config: Record<string, unknown>, key: string, fallback: string) => string
  configStringList: (
    config: Record<string, unknown>,
    key: string,
    fallback: readonly string[],
  ) => string[]

  useAvailability: (requirement: AvailabilityRequirement) => Availability
  useText: (pluginId: string) => PluginText

  /**
   * Alabaster's own Pinia stores. They are live: read them inside a computed
   * or a template and the plugin follows the printer without subscribing to
   * anything itself.
   */
  stores: {
    usePrinterStore: () => HostStore
    useTelemetryStore: () => HostStore
    usePrinterConfigStore: () => HostStore
    useMacrosStore: () => HostStore
    useToastsStore: () => { push: (message: string) => void }
  }

  /**
   * Sends G-code the way a macro button does: echoed to the console, listed in
   * the command queue while it waits, a failure reported once. Resolves false
   * when it was not sent or failed. Never retried.
   */
  sendGcode: (script: string) => Promise<boolean>
}

/** What a plugin's entry file default-exports. */
export interface PluginModule {
  /** Unique within the plugin. Lowercase letters, digits and hyphens. */
  id: string
  /** A key in `messages`. */
  title: string
  icon?: IconName
  /** What the card needs to be usable. Defaults to `klipper`. */
  requires?: AvailabilityRequirement
  /** A Moonraker component the card is built around; hidden where it is absent. */
  requiresComponent?: string
  /** The card can be added more than once, each with its own configuration. */
  supportsMultiple?: boolean
  /** The card's content. Alabaster supplies the card, its header and its padding. */
  component: Component
  /** The content supplies its own padding. */
  inset?: boolean
  settings?: {
    /** Renders the setting rows. Receives `mode: 'pane' | 'quick'`. */
    fields: Component
    /** The settings shown on the card until the reader changes that. */
    defaultQuickKeys?: readonly string[]
    /** Further sections for the settings pane only. */
    pane?: Component
  }
  /** A few characters shown in the header while the card is collapsed, or null. */
  summary?: (config: Record<string, unknown>) => string | null
}

export interface PluginPage {
  id: string
  title: string
  icon?: IconName
  /** Defaults to `moonraker`. */
  requires?: AvailabilityRequirement
  /** `standard` gets Alabaster's page heading; `workspace` fills the viewport. */
  shell?: 'standard' | 'workspace'
  component: Component
}

export interface Plugin {
  /** Strings by locale (`en`, `nb`). English is the fallback for every other. */
  messages?: Record<string, Record<string, unknown>>
  modules?: PluginModule[]
  pages?: PluginPage[]
}
