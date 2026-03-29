/**
 * Object with a wrapper with getters and setters
 */
export class Container {
  container: Record<string, any>

  constructor() {
    this.container = {};
  }

  set(keys: string[], value: any): void {
    this._set(this.container, keys, 0, value);
  }

  _set(elements: any, keys: string[], index: number, value: any): void {
    let key = keys[index];
    if (typeof elements[key] === 'undefined') {
      elements[key] = {};
    }
    if (index === keys.length - 1) {
      elements[key] = value;
    } else {
      this._set(elements[key], keys, index + 1, value);
    }
  }

  get(...keys: string[]): any {
    if (keys.length === 0) {
      return this.container
    }
    if (this.has(...keys)) {
      return this._get(this.container, keys, 0);
    } else {
      return null;
    }
  }

  _get(elements: any, keys: string[], index: number): any {
    let key = keys[index];
    if (typeof elements[key] === 'undefined') {
      return null;
    }
    if (index === keys.length - 1) {
      return elements[key];
    } else {
      return this._get(elements[key], keys, index + 1);
    }
  }

  has(...keys: string[]): boolean {
    return this._has(this.container, keys, 0);
  }

  _has(elements: any, keys: string[], index: number): boolean {
    let key = keys[index];
    if (typeof elements[key] === 'undefined') {
      return false;
    }
    if (index === keys.length - 1) {
      return true;
    } else {
      return this._has(elements[key], keys, index + 1);
    }
  }
}
