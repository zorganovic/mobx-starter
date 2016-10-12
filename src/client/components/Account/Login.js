import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Loading from '../Common/Loading'
import Error from '../Common/Error'

@observer(['account'])
class Login extends React.Component {

    @observable form = {
        username: 'test',
        password: 'test',
        loading: false,
        error: null
    }

    handleChange = (key) => ({
        value: this.form[key],
        onChange: e => this.form[key] = e.target.value
    })

    handleLogin = (e) => {
        e.preventDefault()
        const { account } = this.props

        account.login(this.form)
            .then(() => {
                this.form.error = null
                this.form.loading = true
                setTimeout(() => window.location.href = '/', 500)
            })
            .catch(error => {
                this.form.error = error
                this.form.loading = false
            })
    }

    render() {
        const { form } = this

        if (form.loading) {
            return <Loading/>
        }

        return <main>
            <h1>sign-in</h1>
            <form className="account" onSubmit={e => this.handleLogin(e)}>
                <label>
                    Username
                    <input type="text" {...this.handleChange("username")} required="required"/>
                </label>

                <label>
                    Password
                    <input type="password" {...this.handleChange("password")} required="required"/>
                </label>

                {form.error && <Error text={form.error}/>}

                <button onClick={e => this.handleLogin(e)}>Login</button>
            </form>
        </main>
    }
}

export default Login
