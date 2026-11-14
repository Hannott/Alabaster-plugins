<script setup lang="ts">
import { computed } from 'vue'

import { host, moduleKey, pluginId } from './host'
import { defaultQuickKeys, readSettings } from './settings'

/**
 * The card's settings rows, written once and rendered twice by Alabaster:
 *
 * - `mode="quick"`: under the card's gear, showing only the rows the reader
 *   has pinned (`defaultQuickKeys` until they change it).
 * - `mode="pane"`: in the settings view with the card docked beside it,
 *   showing every row with a pin to promote or demote it.
 *
 * One `settings-row` per setting, shown when `quick.visible(key)` says so, and
 * a `QuickSettingToggle` in pane mode only. That is the whole pattern.
 */
const props = defineProps<{ mode: 'pane' | 'quick' }>()

const { QuickSettingToggle } = host.components
const { t } = host.useText(pluginId)
const { config, updateConfig } = host.useModule(pluginId, moduleKey)
const quick = host.useQuickSettings(config, updateConfig, defaultQuickKeys, () => props.mode)

const settings = computed(() => readSettings(config.value))
</script>

<template>
  <div v-if="quick.visible('showProgress')" class="settings-row">
    <label class="check-row">
      <input
        type="checkbox"
        :checked="settings.showProgress"
        @change="updateConfig({ showProgress: !settings.showProgress })"
      />
      <span>{{ t('showProgress') }}</span>
    </label>
    <QuickSettingToggle
      v-if="mode === 'pane'"
      :label="t('showProgress')"
      :shown="quick.isQuick('showProgress')"
      @toggle="quick.setQuick('showProgress', $event)"
    />
  </div>

  <div v-if="quick.visible('showControls')" class="settings-row">
    <label class="check-row">
      <input
        type="checkbox"
        :checked="settings.showControls"
        @change="updateConfig({ showControls: !settings.showControls })"
      />
      <span>{{ t('showControls') }}</span>
    </label>
    <QuickSettingToggle
      v-if="mode === 'pane'"
      :label="t('showControls')"
      :shown="quick.isQuick('showControls')"
      @toggle="quick.setQuick('showControls', $event)"
    />
  </div>
</template>
