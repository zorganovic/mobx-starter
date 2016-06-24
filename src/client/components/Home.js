import React from 'react'
import { connect } from 'mobx-connect'
import size from 'lodash/fp'
import Browse from './Browse/Browse'

@connect()
class Home extends React.Component {

    static fetchData({ store, state }) {
        return store.todos.browse().then(data => {
            state.todos.items = data
            console.log('-----', data)
        })
    }

    componentDidMount() {
        const { store, state } = this.context

        if (!size(state.todos.items)) {
            store.todos.browse().then(data => {
                state.todos.items.replace(data)
            })
        }
    }

    render() {
        return <main>
            <Browse/>
        </main>
    }
}

export default Home
