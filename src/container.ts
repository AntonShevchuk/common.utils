/**
 * Object with a wrapper with getters and setters
 */
export class Container {
  container: Record<string, any>

  constructor() {
    this.container = {};
  }

  set(...args: any[]): void {
    let keys: string[]
    let value: any

    if (Array.isArray(args[0])) {
      // Old style: set(['options', 'theme'], 'dark')
      keys = args[0]
      value = args[1]
    } else {
      // New style: set('options', 'theme', 'dark')
      value = args.pop()
      keys = args
    }

    let target = this.container
    for (let i = 0; i < keys.length - 1; i++) {
      if (typeof target[keys[i]] === 'undefined') target[keys[i]] = {}
      target = target[keys[i]]
    }
    target[keys[keys.length - 1]] = value
  }

  get(...keys: string[]): any {
    if (keys.length === 0) return this.container
    let target = this.container
    for (let i = 0; i < keys.length; i++) {
      if (typeof target[keys[i]] === 'undefined') return null
      target = target[keys[i]]
    }
    return target
  }

  has(...keys: string[]): boolean {
    let target = this.container
    for (let i = 0; i < keys.length; i++) {
      if (typeof target[keys[i]] === 'undefined') return false
      target = target[keys[i]]
    }
    return true
  }
}
