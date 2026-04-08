// ==UserScript==
// @name         Common.Utils
// @description  Classes for your scripts
// @author       Anton Shevchuk
// @license      MIT License
// @version      0.2.0
// @match        *://*/*
// @grant        none
// @namespace    https://greasyfork.org/users/227648
// ==/UserScript==

(function () {
    'use strict';

    /**
     * Object with a wrapper with getters and setters
     */
    class Container {
        constructor() {
            this.container = {};
        }
        set(...args) {
            let keys;
            let value;
            if (Array.isArray(args[0])) {
                // Old style: set(['options', 'theme'], 'dark')
                keys = args[0];
                value = args[1];
            }
            else {
                // New style: set('options', 'theme', 'dark')
                value = args.pop();
                keys = args;
            }
            let target = this.container;
            for (let i = 0; i < keys.length - 1; i++) {
                if (typeof target[keys[i]] === 'undefined')
                    target[keys[i]] = {};
                target = target[keys[i]];
            }
            target[keys[keys.length - 1]] = value;
        }
        get(...keys) {
            if (keys.length === 0)
                return this.container;
            let target = this.container;
            for (let i = 0; i < keys.length; i++) {
                if (typeof target[keys[i]] === 'undefined')
                    return null;
                target = target[keys[i]];
            }
            return target;
        }
        has(...keys) {
            let target = this.container;
            for (let i = 0; i < keys.length; i++) {
                if (typeof target[keys[i]] === 'undefined')
                    return false;
                target = target[keys[i]];
            }
            return true;
        }
    }

    /**
     * Simple cache object with getters and setters
     */
    class SimpleCache extends Container {
        set(key, value) {
            super.set([key], value);
        }
    }

    class Tools {
        /**
         * Simple object check
         */
        static isObject(item) {
            return (item && typeof item === 'object' && !Array.isArray(item));
        }
        /**
         * Deep merge objects
         */
        static mergeDeep(target, ...sources) {
            if (!sources.length)
                return target;
            const source = sources.shift();
            if (Tools.isObject(target) && Tools.isObject(source)) {
                for (const key in source) {
                    if (!source.hasOwnProperty(key))
                        continue;
                    if (Tools.isObject(source[key])) {
                        if (!Tools.isObject(target[key]))
                            Object.assign(target, { [key]: {} });
                        Tools.mergeDeep(target[key], source[key]);
                    }
                    else {
                        Object.assign(target, { [key]: source[key] });
                    }
                }
            }
            return Tools.mergeDeep(target, ...sources);
        }
    }

    /**
     * Settings object with localStorage as storage
     */
    class Settings extends Container {
        constructor(uid, def = {}) {
            super();
            this.uid = uid;
            this.default = def;
            this.load();
        }
        load() {
            let settings = localStorage.getItem(this.uid);
            if (settings) {
                let parsed = JSON.parse(settings);
                this.container = Tools.mergeDeep({}, this.default, parsed);
            }
            else {
                this.container = Tools.mergeDeep({}, this.default);
            }
        }
        /**
         * With jQuery:
         *   $(window).on('beforeunload', () => SettingsInstance.save());
         */
        save() {
            localStorage.setItem(this.uid, JSON.stringify(this.container));
        }
    }

    // Expose as globals (consumed via @require by other scripts)
    Object.assign(window, { Container, SimpleCache, Settings, Tools });

})();
