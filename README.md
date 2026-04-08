# Common Utils

Shared utility classes for WME (Waze Map Editor) userscripts.

## Require Script
```javascript
// @require https://greasyfork.org/scripts/389765-common-utils/code/CommonUtils.js?version=XXX
```
> See last available version on the GreasyFork homepage

## Development

```bash
npm install
npm run build       # one-off build → dist/Utils.user.js
npm run watch       # rebuild on changes
```

Source is written in TypeScript under `src/`, built with Rollup into `dist/Utils.user.js`.

```
src/
├── meta.ts          # userscript header
├── container.ts     # Container class
├── simple-cache.ts  # SimpleCache extends Container
├── settings.ts      # Settings extends Container
├── tools.ts         # Tools static class
└── index.ts         # exposes all classes to global scope
```

## API

### Container

A nested key-value store with path-based access:

```javascript
let container = new Container()

// set nested values
container.set(['options', 'theme'], 'dark')
container.set(['options', 'lang'], 'uk')

// get nested values
container.get('options', 'theme')  // 'dark'
container.get('options')           // { theme: 'dark', lang: 'uk' }
container.get()                    // entire container

// check existence
container.has('options', 'theme')  // true
container.has('options', 'color')  // false
```

### SimpleCache

Simplified Container with flat key-value interface:

```javascript
let cache = new SimpleCache()

cache.set('key', result)
cache.has('key')          // true
cache.get('key')          // result
```

### Settings

Container backed by `localStorage`. Loads on construction, merges stored values over defaults:

```javascript
// load settings (merges localStorage data over defaults)
let settings = new Settings('my-script', {
  enabled: true,
  radius: 200
})

// read
settings.get('enabled')    // true
settings.get('radius')     // 200

// update
settings.set(['radius'], 500)

// save to localStorage (call before page unload)
settings.save()
```

With jQuery:
```javascript
$(window).on('beforeunload', () => settings.save())
```

### Tools

Static utility methods:

```javascript
// deep merge objects (preserves nested structure)
let result = Tools.mergeDeep({}, defaults, overrides)

// check if value is a plain object
Tools.isObject({})     // true
Tools.isObject([])     // false
Tools.isObject(null)   // false
```

## Links

Author homepage: https://anton.shevchuk.name/  
Author pet projects: https://hohli.com/  
Support author: https://donate.hohli.com/  

Script homepage: https://github.com/AntonShevchuk/common.utils  
GreasyFork: https://greasyfork.org/uk/scripts/571719-common-utils  

