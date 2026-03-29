import { describe, it, expect, beforeEach } from 'vitest'
import { SimpleCache } from '../src/simple-cache'

describe('SimpleCache', () => {
  let cache: SimpleCache

  beforeEach(() => {
    cache = new SimpleCache()
  })

  it('stores and retrieves a value', () => {
    cache.set('key', 'value')
    expect(cache.get('key')).toBe('value')
  })

  it('returns null for missing keys', () => {
    expect(cache.get('missing')).toBeNull()
  })

  it('checks existence with has', () => {
    cache.set('key', 'value')
    expect(cache.has('key')).toBe(true)
    expect(cache.has('missing')).toBe(false)
  })

  it('overwrites existing values', () => {
    cache.set('key', 'first')
    cache.set('key', 'second')
    expect(cache.get('key')).toBe('second')
  })

  it('stores objects', () => {
    const data = { name: 'test', count: 42 }
    cache.set('obj', data)
    expect(cache.get('obj')).toEqual(data)
  })

  it('stores falsy values', () => {
    cache.set('zero', 0)
    cache.set('empty', '')
    cache.set('no', false)
    expect(cache.get('zero')).toBe(0)
    expect(cache.get('empty')).toBe('')
    expect(cache.get('no')).toBe(false)
  })

  it('stores null', () => {
    cache.set('nil', null)
    expect(cache.get('nil')).toBeNull()
  })

  it('returns null for stored undefined (treated as missing)', () => {
    cache.set('undef', undefined)
    expect(cache.get('undef')).toBeNull()
  })
})
