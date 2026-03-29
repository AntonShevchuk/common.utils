import { Container } from './container'

/**
 * Simple cache object with getters and setters
 */
export class SimpleCache extends Container {
  // @ts-ignore - intentionally changes signature from string[] to string
  set(key: string, value: any): void {
    super.set([key], value);
  }
}
