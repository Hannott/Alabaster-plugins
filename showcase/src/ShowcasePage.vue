<script setup lang="ts">
import { computed } from 'vue'

import { host, pluginId } from './host'

/**
 * A page. Alabaster supplies the shell and, for a `standard` page, the
 * heading; this component is what goes under it. `page-column` centres the
 * content at reading width and `page-card` is the card every page is built
 * from.
 */
const { AppStatusField } = host.components
const { t } = host.useText(pluginId)
const telemetry = host.stores.useTelemetryStore()

interface Sensor {
  objectName: string
  name: string
  temperature: number | null
}

const sensors = computed<Sensor[]>(() => telemetry.sensors)

function reading(sensor: Sensor): string {
  return sensor.temperature === null
    ? t('noReading')
    : `${sensor.temperature.toFixed(1)} ${t('temperatureUnit')}`
}
</script>

<template>
  <div class="page-column">
    <section class="page-card">
      <p class="text-eyebrow text-data-blue">{{ t('pageTitle') }}</p>
      <h2 class="mt-2 text-section-title">{{ t('sensors') }}</h2>
      <p class="showcase-note">{{ t('pageIntro') }}</p>

      <p v-if="sensors.length === 0" class="showcase-note">{{ t('noSensors') }}</p>
      <div v-else class="showcase-grid showcase-grid--two">
        <AppStatusField
          v-for="sensor in sensors"
          :key="sensor.objectName"
          :text="`${sensor.name}: ${reading(sensor)}`"
          tone="neutral"
        />
      </div>
    </section>
  </div>
</template>
