import { size, find } from 'lodash'
import { extendObservable, observable } from 'mobx'

/**
 * @class Account
 */
export default class Account {

  constructor(request, state = {}) {
    this.request = request
    extendObservable(this, {
      username: null,
      token: null,
      users: observable.shallowArray([])
    }, state)
  }

  isLoggedIn() {
    return size(this.username)
  }

  find(username) {
    return find(this.users, { username })
  }

  login(params) {
    const account = this.request('api/account/login', params)
    extendObservable(this, account)
    return account
  }

  async logout() {
    await this.request('api/account/logout')
    this.username = null
    this.token = null
    return Promise.resolve()
  }

  register(params) {
    return this.request('api/account/register', params)
      .then(account => {
        extendObservable(this, account)
      })
  }
}
