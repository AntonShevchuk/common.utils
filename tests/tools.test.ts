import { describe, it, expect } from 'vitest'
import { Tools } from '../src/tools'

describe('Tools.isObject', () => {
  it('returns true for plain objects', () => {
    expect(Tools.isObject({})).toBe(true)
    expect(Tools.isObject({ a: 1 })).toBe(true)
  })

  it('returns false for arrays', () => {
    expect(Tools.isObject([])).toBe(false)
    expect(Tools.isObject([1, 2])).toBe(false)
  })

  it('returns false for null', () => {
    expect(Tools.isObject(null)).toBeFalsy()
  })

  it('returns false for primitives', () => {
    expect(Tools.isObject(42)).toBeFalsy()
    expect(Tools.isObject('string')).toBeFalsy()
    expect(Tools.isObject(true)).toBeFalsy()
    expect(Tools.isObject(undefined)).toBeFalsy()
  })
})

describe('Tools.mergeDeep', () => {
  it('returns target when no sources', () => {
    const target = { a: 1 }
    expect(Tools.mergeDeep(target)).toBe(target)
  })

  it('merges flat objects', () => {
    const result = Tools.mergeDeep({}, { a: 1 }, { b: 2 })
    expect(result).toEqual({ a: 1, b: 2 })
  })

  it('merges nested objects', () => {
    const result = Tools.mergeDeep(
      { options: { a: 1 } },
      { options: { b: 2 } }
    )
    expect(result).toEqual({ options: { a: 1, b: 2 } })
  })

  it('later sources override earlier ones', () => {
    const result = Tools.mergeDeep({}, { a: 1 }, { a: 2 })
    expect(result.a).toBe(2)
  })

  it('deep overrides nested values', () => {
    const result = Tools.mergeDeep(
      { options: { theme: 'light', lang: 'en' } },
      { options: { theme: 'dark' } }
    )
    expect(result.options.theme).toBe('dark')
    expect(result.options.lang).toBe('en')
  })

  it('does not mutate source objects', () => {
    const defaults = { options: { a: 1, b: 2 } }
    const overrides = { options: { b: 3 } }
    Tools.mergeDeep({}, defaults, overrides)
    expect(defaults.options.b).toBe(2)
    expect(overrides.options.b).toBe(3)
  })

  it('preserves falsy target values when source key is an object', () => {
    const result = Tools.mergeDeep({ count: 0 }, { count: { nested: true } })
    expect(result.count).toEqual({ nested: true })
  })

  it('does not overwrite falsy values with empty objects', () => {
    const result = Tools.mergeDeep({}, { enabled: false, count: 0, name: '' })
    expect(result.enabled).toBe(false)
    expect(result.count).toBe(0)
    expect(result.name).toBe('')
  })

  it('replaces arrays instead of merging them', () => {
    const result = Tools.mergeDeep({ arr: [1, 2] }, { arr: [3, 4] })
    expect(result.arr).toEqual([3, 4])
  })

  it('handles three-level deep merge', () => {
    const result = Tools.mergeDeep(
      { a: { b: { c: 1, d: 2 } } },
      { a: { b: { c: 10, e: 3 } } }
    )
    expect(result).toEqual({ a: { b: { c: 10, d: 2, e: 3 } } })
  })

  it('skips inherited properties', () => {
    const parent = { inherited: true }
    const source = Object.create(parent)
    source.own = 'value'
    const result = Tools.mergeDeep({}, source)
    expect(result.own).toBe('value')
    expect(result.inherited).toBeUndefined()
  })
})
