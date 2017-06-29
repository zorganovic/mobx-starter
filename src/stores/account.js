import request from 'core/request'
import { extendObservable } from 'mobx'
import { size, find } from 'lodash'

/**
 * @class Account
 */
export default class Account {

  constructor(state = {}) {
    extendObservable(this, {
      username: null,
      token: null,
      users: []
    }, state)
  }

  isLoggedIn() {
    return size(this.username)
  }

  find(username) {
    return find(this.users, { username })
  }

  login(params) {
    return request.post('/api/account/login', params).then(account => {
      extendObservable(this, account)
    })
  }

  async logout() {
    await request.get('/api/account/logout')
    this.username = null
    this.token = null
    return Promise.resolve()
  }

  register(params) {
    return request.post('/api/account/register', params).then(account => {
      extendObservable(this, account)
    })
  }
}
