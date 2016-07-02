import _ from 'lodash'
import React from 'react'
import { connect } from 'mobx-connect'

@connect
class Edit extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            username: '',
            description: '',
            loading: false
        }
    }

    handleEdit(key) {
        return {
            value: this.state[key],
            onChange: e => this.setState({ [key]: e.target.value })
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        this.handleSave()
    }

    handleSave() {
        const {username, description, picture} = this.state
        const {store} = this.context

        if (picture) {
            this.setState({ loading: true })
        }

        store.user.update({username, description, picture})
             .then(() => {
                 // The human eye needs a delay
                 setTimeout(() => {
                     this.setState({ loading: false })
                 }, 300)
             })
             .catch(error => this.setState({ error, loading: false }))
    }

    componentDidMount() {
        const {store, state} = this.context
        const requestData = {
            username: state.user.username
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

        return <section>

            <form onSubmit={e => this.handleSubmit(e)}>

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
        </section>
    }
}

export default Edit
