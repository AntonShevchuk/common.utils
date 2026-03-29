export class Tools {
  /**
   * Simple object check
   */
  static isObject(item: any): boolean {
    return (item && typeof item === 'object' && !Array.isArray(item));
  }

  /**
   * Deep merge objects
   */
  static mergeDeep(target: any, ...sources: any[]): any {
    if (!sources.length) return target;
    const source = sources.shift();

    if (Tools.isObject(target) && Tools.isObject(source)) {
      for (const key in source) {
        if (!source.hasOwnProperty(key)) continue;
        if (Tools.isObject(source[key])) {
          if (!Tools.isObject(target[key])) Object.assign(target, { [key]: {} });
          Tools.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
    return Tools.mergeDeep(target, ...sources);
  }
}
