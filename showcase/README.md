# Alabaster plugin template

A working Alabaster plugin to copy. It adds one dashboard card and one page,
and between them they use every component and helper a plugin has access to,
so installing it on a printer shows what you can build.

## Try it

```bash
npm install
```

```bash
npm run build
```

Copy `dist/showcase/` to `config/alabaster/plugins/showcase/` on the printer
(the Configuration page uploads folders). It appears under Settings → Plugins.
Allow it, then add **Plugin showcase** from the dashboard's module tray.

## Make it yours

1. Pick an id: lowercase letters, digits and hyphens, each part starting with
   a letter (`chamber-log`). Set it in `plugin.json` and in `src/host.ts`. The
   folder on the printer must have the same name.
2. Replace the showcase components with your own and list them in
   `src/index.ts`.
3. Put every string in `src/messages.ts`.

## What a plugin is

Three files in one folder:

| File          | What it is                                                         |
| ------------- | ------------------------------------------------------------------ |
| `plugin.json` | Name, version and what the plugin adds. Read before anything runs. |
| `index.js`    | The plugin, as one ES module. Built from `src/`.                   |
| `style.css`   | Its styles. Optional.                                              |

`index.js` default-exports the modules and pages the plugin contributes.
`host.d.ts` describes that shape and everything Alabaster provides.

## What you get from Alabaster

Read `host.d.ts` for the full list. In short:

- **Components**: `AppButton`, `AppField`, `AppSelect`, `AppSlider`,
  `AppStatusField`, `AppProgressBar`, `AppOutputRow`, `AppIcon`,
  `ConfirmDialog`, `PromptDialog`, `AvailabilityRegion`, `PageHeading`,
  `SurfaceSection`, `QuickSettingToggle`.
- **Live printer data**: `host.stores` gives Alabaster's own stores. Read them
  in a computed or a template and your card follows the printer.
- **Commands**: `host.sendGcode(script)`.
- **Per-card settings**: `host.useModule` returns the card's stored
  configuration; it is saved and synced with the dashboard.
- **Translations**: `host.useText` reads your `messages`.
- **Styling**: Alabaster's colour tokens (`var(--text-muted)`,
  `var(--surface-raised)`, …) and layout classes (`page-card`, `page-column`,
  `settings-row`, `check-row`).

## Settings on a card

A card gets a settings gear, a full settings view and pins to choose which
settings show on the card, from one component. `src/ShowcaseSettings.vue` is
that component: it renders one row per setting and Alabaster renders it in
both places. `src/ShowcasePaneSettings.vue` adds sections that only the full
view shows.

## Rules that keep a plugin working

- **Build to one file.** The build here does this. Dynamic `import()` and a
  second chunk will not load.
- **Do not bundle Vue.** `import { ref } from 'vue'` is fine: the build
  resolves it to Alabaster's copy, which is what makes the stores reactive in
  your components.
- **Use tokens, not colours.** A literal colour breaks in the other theme.
- **Prefix your CSS classes** with the plugin id. The stylesheet is global.
- **Never use `window.confirm`, `alert` or `prompt`.** Use `ConfirmDialog` and
  `PromptDialog`.
- **Send commands only on a user's action**, and never resend one after a
  reconnect.

## Publishing

A plugin repository holds the built folder, committed, and an
`alabaster-plugins.json` at its root listing where each plugin's folder is:

```json
{ "plugins": [{ "path": "dist/showcase" }] }
```

Someone adds the repository's address under Settings → Plugins and installs
from the list. Remove `dist/` from `.gitignore` in your own repository so the
built files are committed.

## Versions

`apiVersion` in `plugin.json` is the plugin contract this plugin was built for
(currently 1). Alabaster refuses a plugin built for a different one and says
so in the list. `minAlabaster` optionally names the oldest release the plugin
works with.
