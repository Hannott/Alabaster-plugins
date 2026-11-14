<script setup lang="ts">
import { computed, ref } from 'vue'

import { host, moduleKey, pluginId } from './host'
import { readSettings } from './settings'

/**
 * The card's content. Alabaster draws the card around it (header, icon,
 * collapse, the settings gear and the padding), so this is only what goes
 * inside.
 *
 * Everything read from a store here is live. `printer.progress` and
 * `telemetry.readings` change as the printer reports, and because they are
 * read inside computeds the card follows them: a plugin never subscribes to
 * Moonraker itself, and never needs a reload to catch up.
 */
const {
  AppButton,
  AppField,
  AppOutputRow,
  AppProgressBar,
  AppSelect,
  AppSlider,
  AppStatusField,
  ConfirmDialog,
} = host.components

const { t } = host.useText(pluginId)
const { config, updateConfig } = host.useModule(pluginId, moduleKey)
const printer = host.stores.usePrinterStore()
const telemetry = host.stores.useTelemetryStore()

const settings = computed(() => readSettings(config.value))

const hotend = computed(() => {
  const temperature = telemetry.readings.extruder?.temperature
  return typeof temperature === 'number'
    ? `${temperature.toFixed(1)} ${t('temperatureUnit')}`
    : t('noReading')
})

/*
 * Two kinds of state. `amount` and `tone` are written to the card's
 * configuration, so they survive a reload and travel with the dashboard.
 * `level` and `highlight` are plain refs: they exist only while the card is
 * mounted, which is right for a value that is not a preference.
 */
const amount = computed({
  get: () => settings.value.amount,
  set: (value: number | null) => {
    if (value !== null) updateConfig({ amount: value })
  },
})

const tone = computed({
  get: () => settings.value.tone,
  set: (value: string) => updateConfig({ tone: value }),
})

const toneOptions = computed(() => [
  { value: 'neutral', label: t('toneNeutral') },
  { value: 'accent', label: t('toneAccent') },
  { value: 'positive', label: t('tonePositive') },
])

const level = ref(40)
const highlight = ref(false)
const asking = ref(false)

/*
 * Commands go through `host.sendGcode`, never straight to Moonraker: it echoes
 * the script to the console, lists it in the command queue while it waits and
 * reports a failure once. `M115` only asks the firmware for its version.
 */
function send(): void {
  void host.sendGcode('M115')
}

function confirmSend(): void {
  asking.value = false
  send()
}
</script>

<template>
  <div class="showcase-grid">
    <AppStatusField :text="`${t('hotend')} ${hotend}`" :tone="tone" />

    <AppProgressBar v-if="settings.showProgress" :value="printer.progress" :label="t('progress')" />

    <template v-if="settings.showControls">
      <div class="showcase-grid showcase-grid--two">
        <AppField
          v-model="amount"
          :label="t('amount')"
          :unit="t('amountUnit')"
          :min="0"
          :max="100"
          :step="1"
          size="sm"
        />
        <AppSelect v-model="tone" :label="t('tone')" :options="toneOptions" />
      </div>

      <!-- A slider is for a range someone drags. For a typed value use AppField. -->
      <AppSlider
        v-model="level"
        :label="t('level')"
        :unit="t('percent')"
        :min="0"
        :max="100"
        size="sm"
      />

      <AppOutputRow v-model="highlight" :label="t('highlight')" icon="plug" toggle size="sm" />

      <div class="showcase-actions">
        <AppButton size="sm" :label="t('send')" :disabled="printer.isPrinting" @click="send" />
        <AppButton
          variant="quiet"
          size="sm"
          :label="t('ask')"
          :disabled="printer.isPrinting"
          @click="asking = true"
        />
      </div>
    </template>

    <!-- Never window.confirm: a dialog is always one of Alabaster's own. -->
    <ConfirmDialog
      :open="asking"
      :title="t('askTitle')"
      :description="t('askDescription')"
      :confirm-label="t('askConfirm')"
      @confirm="confirmSend"
      @cancel="asking = false"
    />
  </div>
</template>
