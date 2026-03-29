// ==UserScript==
// @name         Common.Utils
// @description  Classes for your scripts
// @author       Anton Shevchuk
// @license      MIT License
// @version      0.0.7
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
        set(keys, value) {
            this._set(this.container, keys, 0, value);
        }
        _set(elements, keys, index, value) {
            let key = keys[index];
            if (typeof elements[key] === 'undefined') {
                elements[key] = {};
            }
            if (index === keys.length - 1) {
                elements[key] = value;
            }
            else {
                this._set(elements[key], keys, index + 1, value);
            }
        }
        get(...keys) {
            if (keys.length === 0) {
                return this.container;
            }
            if (this.has(...keys)) {
                return this._get(this.container, keys, 0);
            }
            else {
                return null;
            }
        }
        _get(elements, keys, index) {
            let key = keys[index];
            if (typeof elements[key] === 'undefined') {
                return null;
            }
            if (index === keys.length - 1) {
                return elements[key];
            }
            else {
                return this._get(elements[key], keys, index + 1);
            }
        }
        has(...keys) {
            return this._has(this.container, keys, 0);
        }
        _has(elements, keys, index) {
            let key = keys[index];
            if (typeof elements[key] === 'undefined') {
                return false;
            }
            if (index === keys.length - 1) {
                return true;
            }
            else {
                return this._has(elements[key], keys, index + 1);
            }
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
                    if (Tools.isObject(source[key])) {
                        if (!target[key])
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
         *   $(window).on('beforeunload', () => SettingsInstance.save() );
         */
        save() {
            localStorage.setItem(this.uid, JSON.stringify(this.container));
        }
    }

    // Expose as globals (consumed via @require by other scripts)
    Object.assign(window, { Container, SimpleCache, Settings, Tools });

})();
