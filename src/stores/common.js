import { extendObservable } from 'mobx'

/**
 * @class Common
 */
export default class Common {

  constructor(state = {}) {
    extendObservable(this, {
      title: 'Mobx-starter',
      statusCode: 200,
      hostname: 'localhost'
    }, state)
  }

  setTitle(newTitle) {
    this.title = newTitle
  }
}
