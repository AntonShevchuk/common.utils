// ==UserScript==
// @name         Common.Utils
// @description  Classes for your scripts
// @author       Anton Shevchuk
// @license      MIT License
// @version      0.0.1
// @match        *://*/*
// @grant        none
// @namespace    https://greasyfork.org/users/227648
// ==/UserScript==

/**
 * Object with wrapper with getters and setters
 */
class Container {
  constructor() {
    this.container = {};
  }
  /**
   * @param {String[]} keys
   * @param {String}   value
   */
  set(keys, value) {
    this._set(this.container, keys, value);
  }
  _set(elements, keys, value) {
    let key = keys.shift();
    if (typeof elements[key] === 'undefined') {
      elements[key] = {};
    }
    if (keys.length === 0) {
      elements[key] = value;
    } else {
      this._set(elements[key], keys, value);
    }
  }
  /**
   * @param {String[]} keys
   * @return {null|*}
   */
  get(...keys) {
    if (this.has(...keys)) {
      return this._get(this.container, ...keys);
    } else {
      return null;
    }
  }
  _get(elements, ...keys) {
    let key = keys.shift();
    if (typeof elements[key] === 'undefined') {
      return null;
    }
    if (keys.length === 0) {
      return elements[key];
    } else {
      return this._get(elements[key], ...keys);
    }
  }
  /**
   * @param {String[]} keys
   * @return {boolean}
   */
  has(...keys) {
    return this._has(this.container, ...keys);
  }
  _has(elements, ...keys) {
    let key = keys.shift();
    if (typeof elements[key] === 'undefined') {
      return false;
    }
    if (keys.length === 0) {
      return true;
    } else {
      return this._has(elements[key], ...keys);
    }
  }
}

/**
 * Simple cache object with getters and setters
 */
class Cache extends Container {
  /**
   * @param {String} key
   * @param {*} value
   */
  set(key, value) {
    super.set([key], value);
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
      settings = JSON.parse(settings);
      this.container = Object.assign(this.default, settings);
    } else {
      this.container = this.default;
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
