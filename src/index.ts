import { Container } from './container'
import { Settings } from './settings'
import { Tools } from './tools'

// Expose as globals (consumed via @require by other scripts)
Object.assign(window, { Container, Settings, Tools })
