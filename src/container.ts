/**
 * Object with wrapper with getters and setters
 */
export class Container {
  container: Record<string, any>

  constructor() {
    this.container = {};
  }

  set(keys: string[], value: any): void {
    this._set(this.container, keys, value);
  }

  _set(elements: any, keys: string[], value: any): void {
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

  get(...keys: string[]): any {
    if (keys.length === 0) {
      return this.container
    }
    if (this.has(...keys)) {
      return this._get(this.container, ...keys);
    } else {
      return null;
    }
  }

  _get(elements: any, ...keys: string[]): any {
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

  has(...keys: string[]): boolean {
    return this._has(this.container, ...keys);
  }

  _has(elements: any, ...keys: string[]): boolean {
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
