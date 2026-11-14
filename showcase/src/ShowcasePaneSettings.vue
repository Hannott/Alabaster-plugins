<script setup lang="ts">
import { computed } from 'vue'

import { host, moduleKey, pluginId } from './host'
import { readSettings } from './settings'

/**
 * Sections that only the settings pane shows, after the card's own. For a
 * setting that is decided once and then left alone: it has no pin, because it
 * is not something anyone reaches for while working.
 *
 * `divided` draws the rule above the section, which every section after the
 * first one wants.
 */
const { AppField, SurfaceSection } = host.components
const { t } = host.useText(pluginId)
const { config, updateConfig } = host.useModule(pluginId, moduleKey)

const settings = computed(() => readSettings(config.value))

const note = computed({
  get: () => settings.value.note,
  set: (value: string) => updateConfig({ note: value }),
})
</script>

<template>
  <SurfaceSection :title="t('behaviour')" divided>
    <div class="settings-row">
      <label class="check-row">
        <input
          type="checkbox"
          :checked="settings.rememberNote"
          @change="updateConfig({ rememberNote: !settings.rememberNote })"
        />
        <span>{{ t('remember') }}</span>
      </label>
    </div>
    <div v-if="settings.rememberNote" class="settings-row">
      <AppField v-model="note" :label="t('note')" type="text" size="sm" />
    </div>
  </SurfaceSection>
</template>
