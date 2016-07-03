import React from 'react'
import { connect } from 'mobx-connect'
import Loading from '../Common/Loading'
import Error from '../Common/Error'

@connect
class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: 'test',
            password: 'test',
            loading: false,
            error: null
        }
    }

    handleChange(key) {
        return {
            value: this.state[key],
            onChange: e => this.setState({ [key]: e.target.value })
        }
    }

    handleLogin(e) {
        e.preventDefault()
        const { account } = this.context.store
        const { router } = this.context

        account.login({
                username: this.state.username,
                password: this.state.password
            })
            .then(() => {
                this.setState({
                    error: null,
                    loading: true
                })
                setTimeout(() => router.push('/'), 500)
            })
            .catch(error => {
                this.setState({
                    error: error,
                    loading: false
                })
            })
    }

    render() {
        const { state } = this

        if (state.loading) {
            return <Loading/>
        }

        return <main>
            <h1>SIGN-IN</h1>
            <form className="account" onSubmit={e => this.handleLogin(e)}>
                <label>
                    Username
                    <input type="text" {...this.handleChange("username")} required="required"/>
                </label>

                <label>
                    Password
                    <input type="password" {...this.handleChange("password")} required="required"/>
                </label>

                {state.error && <Error text={state.error}/>}

                <button onClick={e => this.handleLogin(e)}>Login</button>
            </form>
        </main>
    }
}

export default Login
