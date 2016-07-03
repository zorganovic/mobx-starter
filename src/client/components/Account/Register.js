import React from 'react'
import { connect } from 'mobx-connect'
import _ from 'lodash'
import Error from '../Common/Error'

@connect
class Register extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: 'test',
            password: 'test',
            errorMsg: null
        }
    }

    handleChange(key) {
        return {
            value: this.state[key],
            onChange: e => this.setState({ [key]: e.target.value })
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        this.handleRegister()
    }

    handleRegister() {
        const { account } = this.context.store
        const { router } = this.context
        const { username, password } = this.state

        account.register({ username, password })
            .then(() => {
                account.login({ username, password }).then(() => {
                    router.push('/')
                })
            })
            .catch(() => {
                this.setState({ errorMsg: 'Error registering' })
            })
    }

    render() {
        const { state } = this

        return <main>
            <h1>register</h1>
            <form className="account" onSubmit={e => this.handleSubmit(e)}>
                <label>
                    Username
                    <input type="text" {...this.handleChange("username")} required="required"/>
                </label>

                <label>
                    Password
                    <input type="password" {...this.handleChange("password")} required="required"/>
                </label>

                {state.errorMsg && <Error text={state.errorMsg}/>}

                <button>Register</button>
            </form>
        </main>
    }
}

export default Register
