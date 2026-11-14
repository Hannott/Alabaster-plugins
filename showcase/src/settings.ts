import { host } from './host'

/**
 * The card's stored settings, read in one place so the card, its settings and
 * its collapsed summary cannot disagree about a default. Each read falls back
 * when the stored value is missing or the wrong type, so a hand-edited or
 * older profile never breaks the card.
 */
export const defaultQuickKeys = ['showProgress'] as const

export function readSettings(config: Record<string, unknown>) {
  return {
    showProgress: host.configBoolean(config, 'showProgress', true),
    showControls: host.configBoolean(config, 'showControls', true),
    rememberNote: host.configBoolean(config, 'rememberNote', false),
    tone: host.configString(config, 'tone', 'accent'),
    amount: host.configNumber(config, 'amount', 10),
    note: host.configString(config, 'note', ''),
  }
}
