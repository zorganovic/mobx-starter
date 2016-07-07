import React from 'react'
import { observable } from 'mobx'
import { connect } from 'mobx-connect'

/**
 * This route is not implemented yet
 */
@connect
class Edit extends React.Component {

    @observable form = {
        username: '',
        description: '',
        error: null,
        loading: false
    }

    handleChange = (key) => ({
        value: this.form[key],
        onChange: e => this.form[key] = e.target.value
    })

    handleSubmit(e) {
        e.preventDefault()
        this.handleSave()
    }

    handleSave() {
        const { username, description, picture } = this.form
        const { store } = this.context

        if (picture) {
            this.setState({ loading: true })
        }

        store.user.update({ username, description, picture })
             .then(() => {
                 // The human eye needs a delay
                 setTimeout(() => {
                     this.form.loading = false
                 }, 300)
             })
             .catch(error => {
                 this.form.error = error
                 this.form.loading = false
             })
    }

    componentDidMount() {
        const { store } = this.context
        const { form } = this
        const requestData = {
            username: form.username
        }

        store.user.get(requestData)
             .then(result => {
                 this.setState({
                     username: result.username,
                     description: result.description
                 })
             })
    }

    render() {
        const { error, loading } = this.state
        const { store } = this.context

        return <main>
            <h1>edit account</h1>
            <form className="account" onSubmit={e => this.handleSubmit(e)}>
                <label>
                    Change Username
                    <input type="text" {...this.handleEdit("username")}/>
                </label>

                <label>
                    Description
                    <input type="text" {...this.handleEdit("description")}/>
                </label>

                {error && <div className="row">{error}</div>}

                <button>{loading ? 'Saving...' : 'Save Profile'}</button>
            </form>
        </main>
    }
}

export default Edit
