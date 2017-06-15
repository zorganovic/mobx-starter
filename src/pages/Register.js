import React from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import Error from '../components/common/Error'

@inject('account') @observer
class Register extends React.Component {

  @observable form = {
    username: 'test',
    password: 'test',
    errorMsg: null
  }

  handleChange = (key) => ({
    value: this.form[key],
    onChange: e => this.form[key] = e.target.value
  })

  handleSubmit = async(e) => {
    e.preventDefault()
    await this.handleRegister()
  }

  handleRegister = async() => {
    const { account } = this.props

    try {
      await account.register(this.form)
      await account.login(this.form)
      setTimeout(() => window.location.href = '/', 500)
    } catch(err) {
      this.form.errorMsg = err.message
    }
  }

  render() {
    return (
      <main>
        <h1>register</h1>
        <form className="account" onSubmit={this.handleSubmit}>
          <label>
            Username
            <input type="text" {...this.handleChange("username")} required="required"/>
          </label>

          <label>
            Password
            <input type="password" {...this.handleChange("password")} required="required"/>
          </label>

          {this.form.errorMsg && <Error text={this.form.errorMsg}/>}

          <button>Register</button>
        </form>
      </main>
    )
  }
}

export default Register
