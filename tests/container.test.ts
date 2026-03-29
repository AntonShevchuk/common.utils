import { describe, it, expect, beforeEach } from 'vitest'
import { Container } from '../src/container'

describe('Container', () => {
  let container: Container

  beforeEach(() => {
    container = new Container()
  })

  describe('set', () => {
    it('sets a single-level value', () => {
      container.set(['name'], 'test')
      expect(container.container.name).toBe('test')
    })

    it('sets a nested value', () => {
      container.set(['options', 'theme'], 'dark')
      expect(container.container.options.theme).toBe('dark')
    })

    it('sets a deeply nested value', () => {
      container.set(['a', 'b', 'c'], 42)
      expect(container.container.a.b.c).toBe(42)
    })

    it('creates intermediate objects', () => {
      container.set(['a', 'b', 'c'], 'val')
      expect(typeof container.container.a).toBe('object')
      expect(typeof container.container.a.b).toBe('object')
    })

    it('does not mutate the keys array', () => {
      const keys = ['options', 'lang']
      container.set(keys, 'uk')
      expect(keys).toEqual(['options', 'lang'])
    })

    it('overwrites existing values', () => {
      container.set(['key'], 'first')
      container.set(['key'], 'second')
      expect(container.get('key')).toBe('second')
    })

    it('overwrites nested values without affecting siblings', () => {
      container.set(['options', 'a'], 1)
      container.set(['options', 'b'], 2)
      container.set(['options', 'a'], 10)
      expect(container.get('options', 'a')).toBe(10)
      expect(container.get('options', 'b')).toBe(2)
    })
  })

  describe('get', () => {
    it('returns the entire container when called with no args', () => {
      container.set(['x'], 1)
      expect(container.get()).toEqual({ x: 1 })
    })

    it('returns a single-level value', () => {
      container.set(['name'], 'test')
      expect(container.get('name')).toBe('test')
    })

    it('returns a nested value', () => {
      container.set(['options', 'theme'], 'dark')
      expect(container.get('options', 'theme')).toBe('dark')
    })

    it('returns a subtree as an object', () => {
      container.set(['options', 'a'], 1)
      container.set(['options', 'b'], 2)
      expect(container.get('options')).toEqual({ a: 1, b: 2 })
    })

    it('returns null for missing keys', () => {
      expect(container.get('nonexistent')).toBeNull()
    })

    it('returns null for missing nested keys', () => {
      container.set(['a', 'b'], 1)
      expect(container.get('a', 'x')).toBeNull()
    })

    it('returns null for deep path through non-object', () => {
      container.set(['a'], 'string')
      expect(container.get('a', 'b')).toBeNull()
    })

    it('handles falsy values correctly', () => {
      container.set(['zero'], 0)
      container.set(['empty'], '')
      container.set(['no'], false)
      container.set(['nil'], null)
      expect(container.get('zero')).toBe(0)
      expect(container.get('empty')).toBe('')
      expect(container.get('no')).toBe(false)
      expect(container.get('nil')).toBeNull()
    })
  })

  describe('has', () => {
    it('returns true for existing keys', () => {
      container.set(['name'], 'test')
      expect(container.has('name')).toBe(true)
    })

    it('returns true for nested keys', () => {
      container.set(['a', 'b', 'c'], 1)
      expect(container.has('a', 'b', 'c')).toBe(true)
      expect(container.has('a', 'b')).toBe(true)
      expect(container.has('a')).toBe(true)
    })

    it('returns false for missing keys', () => {
      expect(container.has('missing')).toBe(false)
    })

    it('returns false for missing nested keys', () => {
      container.set(['a', 'b'], 1)
      expect(container.has('a', 'x')).toBe(false)
    })

    it('returns true for falsy values', () => {
      container.set(['zero'], 0)
      container.set(['empty'], '')
      container.set(['no'], false)
      expect(container.has('zero')).toBe(true)
      expect(container.has('empty')).toBe(true)
      expect(container.has('no')).toBe(true)
    })
  })
})
