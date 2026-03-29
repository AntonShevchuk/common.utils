/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { Settings } from '../src/settings'

describe('Settings', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('loads defaults when no stored settings', () => {
    const settings = new Settings('test', { theme: 'light', lang: 'en' })
    expect(settings.get('theme')).toBe('light')
    expect(settings.get('lang')).toBe('en')
  })

  it('does not share reference with defaults object', () => {
    const defaults = { theme: 'light' }
    const settings = new Settings('test', defaults)
    settings.set(['theme'], 'dark')
    expect(defaults.theme).toBe('light')
  })

  it('merges stored settings over defaults', () => {
    localStorage.setItem('test', JSON.stringify({ theme: 'dark' }))
    const settings = new Settings('test', { theme: 'light', lang: 'en' })
    expect(settings.get('theme')).toBe('dark')
    expect(settings.get('lang')).toBe('en')
  })

  it('merges nested stored settings over defaults', () => {
    localStorage.setItem('test', JSON.stringify({ options: { a: 10 } }))
    const settings = new Settings('test', { options: { a: 1, b: 2 } })
    expect(settings.get('options', 'a')).toBe(10)
    expect(settings.get('options', 'b')).toBe(2)
  })

  it('saves to localStorage', () => {
    const settings = new Settings('test', { count: 0 })
    settings.set(['count'], 42)
    settings.save()

    const stored = JSON.parse(localStorage.getItem('test')!)
    expect(stored.count).toBe(42)
  })

  it('round-trips through save and load', () => {
    const settings1 = new Settings('test', { value: 'original' })
    settings1.set(['value'], 'modified')
    settings1.save()

    const settings2 = new Settings('test', { value: 'original' })
    expect(settings2.get('value')).toBe('modified')
  })

  it('uses empty object as default when no defaults provided', () => {
    const settings = new Settings('test')
    expect(settings.get()).toEqual({})
  })

  it('handles corrupted localStorage gracefully', () => {
    localStorage.setItem('test', 'not-json')
    expect(() => new Settings('test', { a: 1 })).toThrow()
  })
})
