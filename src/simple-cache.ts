import { Container } from './container'

/**
 * Simple cache object with getters and setters
 */
export class SimpleCache extends Container {
  set(key: any, value?: any): void {
    super.set([key], value);
  }
}
