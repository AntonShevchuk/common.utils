import { Container } from './container'
import { SimpleCache } from './simple-cache'
import { Settings } from './settings'
import { Tools } from './tools'

// Expose as globals (consumed via @require by other scripts)
Object.assign(window, { Container, SimpleCache, Settings, Tools })
