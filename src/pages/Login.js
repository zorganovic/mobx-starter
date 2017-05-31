import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'
import Loading from '../components/common/Loading'
import Error from '../components/common/Error'

@inject('account') @observer
class Login extends React.Component {

  // When route is loaded (isomorphic)
  static onEnter({ common }) {
    common.title = 'Login'
  }

  static contextTypes = {
    router: PropTypes.any
  }

  @observable username = ''
  @observable password = ''
  @observable loading = false
  @observable error = null

  handleChange = (key) => (e) => {
    this[key] = e.target.value
  }

  handleLogin = (e) => {
    e.preventDefault()
    const { account } = this.props
    const { router } = this.context
    const { username, password } = this

    account.login({ username, password })
      .then(() => {
        this.error = null
        this.loading = true
        setTimeout(() => router.history.push('/'), 500)
      })
      .catch(error => {
        this.error = error
        this.loading = false
        this.password = ''
      })
  }

  render() {
    if (this.loading) {
      return <Loading/>
    }

    return <main>
      <h1>sign-in</h1>
      <form className="account" onSubmit={(e) => this.handleLogin(e)}>
        <label>
          Usernames
          <input type="text"
                 value={this.username}
                 onChange={this.handleChange('username')}
                 required="required"/>
        </label>

        <label>
          Password
          <input type="password"
                 value={this.password}
                 onChange={this.handleChange('password')}
                 required="required"/>
        </label>

        {this.error && <Error text={this.error}/>}

        <button onClick={(e) => this.handleLogin(e)}>Login</button>
      </form>
    </main>
  }
}

export default Login
