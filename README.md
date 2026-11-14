# Alabaster plugins

Plugins for [Alabaster](https://github.com/Hannott/Alabaster), the web
interface for Klipper printers.

## Installing from this repository

1. In Alabaster, open **Settings → Plugins**.
2. Under **Repositories**, enter `Hannott/Alabaster-plugins` and select **Add**.
3. Select **Install** next to a plugin, then **Allow**.

A plugin runs as part of Alabaster and can send any command to the printer.
Allow only plugins you trust.

## Plugins

| Plugin                       | Adds                       | What it is                                                              |
| ---------------------------- | -------------------------- | ----------------------------------------------------------------------- |
| [Plugin showcase](showcase/) | A dashboard module, a page | Every component and helper a plugin can use. Copy it to start your own. |

## Writing a plugin

`showcase/` is a complete plugin project: source, build setup and the typed
description of what Alabaster provides (`host.d.ts`). Its
[README](showcase/README.md) explains the parts.

## How this repository is laid out

Each plugin is its own folder with its own build. The built files are
committed, in `<plugin>/dist/<plugin id>/`, because Alabaster installs them
straight from the repository. `alabaster-plugins.json` at the root lists those
folders:

```json
{ "plugins": [{ "path": "showcase/dist/showcase" }] }
```

After changing a plugin, raise `version` in its `plugin.json`, run
`npm run build` in its folder, and commit the result. Alabaster offers
**Update** to everyone who has the older version.
