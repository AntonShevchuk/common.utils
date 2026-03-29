import { Container } from './container'
import { Tools } from './tools'

/**
 * Settings object with localStorage as storage
 */
export class Settings extends Container {
  uid: string
  default: any

  constructor(uid: string, def: any = {}) {
    super();
    this.uid = uid;
    this.default = def;
    this.load();
  }

  load(): void {
    let settings = localStorage.getItem(this.uid);
    if (settings) {
      let parsed = JSON.parse(settings);
      this.container = Tools.mergeDeep({}, this.default, parsed);
    } else {
      this.container = Tools.mergeDeep({}, this.default);
    }
  }

  /**
   * With jQuery:
   *   $(window).on('beforeunload', () => SettingsInstance.save() );
   */
  save(): void {
    localStorage.setItem(this.uid, JSON.stringify(this.container));
  }
}
