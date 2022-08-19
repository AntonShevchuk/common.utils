# Common Utils
## Require Script
```javascript
// @require https://greasyfork.org/scripts/389765-common-utils/code/CommonUtils.js?version=XXX
```
> See last available version on the GreasyFork homepage 

## Container

## Cache

```javascript
let CacheInstance = new SimpleCache();
let result = null;
if (CacheInstance.has('key')) {
  result = CacheInstance.get('key');
} else {
  result = await $.ajax('url');
  CacheInstance.set('key', result);
}
```

## Settings

### Load settings

```javascript
let SettingsInstance = new Settings('script name', {'default':'settings'});
```

### Save settings

With jQuery:
```javascript
$(window).on('beforeunload', () => SettingsInstance.save() );
```

## Links
Author homepage: http://anton.shevchuk.name/  
Script homepage: https://github.com/AntonShevchuk/common.utils  
GreasyFork: https://greasyfork.org/uk/scripts/389765-common-utils  
