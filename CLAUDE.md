# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Common.Utils is a shared utility library for WME (Waze Map Editor) userscripts. It provides base classes consumed via @require by other scripts: Container (nested key-value store), SimpleCache, Settings (localStorage persistence), and Tools (deep merge).

Source is written in TypeScript under `src/`, built with Rollup into `dist/Utils.user.js`. GreasyFork auto-syncs from the dist output.

## Commands

- **Install:** `npm install`
- **Build:** `npm run build`
- **Watch:** `npm run watch`
- No test or lint steps exist.

## Architecture

```
src/
├── meta.ts          # userscript header
├── tools.ts         # Tools class (isObject, mergeDeep)
├── container.ts     # Container class (nested get/set/has)
├── simple-cache.ts  # SimpleCache extends Container
├── settings.ts      # Settings extends Container (localStorage)
└── index.ts         # assigns all classes to window (global scope)
```

**Important:** Output format is IIFE with `Object.assign(window, ...)` to expose classes globally. Other WME scripts load this via @require and access Container, SimpleCache, Settings, Tools as globals.

## Coding Conventions

- TypeScript with `strict: false`
- No external dependencies
- GitHub Actions auto-builds `dist/` on push to master
