import { host, moduleKey } from './host'
import { messages } from './messages'
import { defaultQuickKeys } from './settings'
import ShowcaseCard from './ShowcaseCard.vue'
import ShowcasePage from './ShowcasePage.vue'
import ShowcasePaneSettings from './ShowcasePaneSettings.vue'
import ShowcaseSettings from './ShowcaseSettings.vue'
import './style.css'

import type { Plugin } from '../host'

const plugin: Plugin = {
  messages,
  modules: [
    {
      id: moduleKey,
      title: 'title',
      icon: 'plug',
      // The card reads printer state, so it needs Klipper to be ready. A card
      // that only reads Moonraker (history, files) asks for 'moonraker'.
      requires: 'klipper',
      component: ShowcaseCard,
      settings: {
        fields: ShowcaseSettings,
        defaultQuickKeys,
        pane: ShowcasePaneSettings,
      },
      // Shown in the header while the card is collapsed. No component of the
      // plugin is mounted then, so it reads the store directly.
      summary: () => {
        const printer = host.stores.usePrinterStore()
        return printer.hasActivePrint ? `${Math.round(printer.progress * 100)}%` : null
      },
    },
  ],
  pages: [
    {
      id: 'showcase',
      title: 'pageTitle',
      icon: 'plug',
      requires: 'moonraker',
      component: ShowcasePage,
    },
  ],
}

export default plugin
