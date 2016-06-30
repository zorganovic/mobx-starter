import React from 'react'
import { connect } from 'mobx-connect'
import size from 'lodash/fp'
import AddTodo from '../components/Home/AddTodo'
import Todo from '../components/Home/Todo'

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
        const { state } = this.context

        return <main>
            <h1>todos</h1>
            <div className="todoapp">
                <AddTodo/>
                <section className="main">
                    <ul className="todo-list">
                        {state.todos.items.map(item => <Todo key={item.text.hashCode()} item={item}/>)}
                    </ul>
                </section>
                <section className="footer"/>
            </div>
        </main>
    }
}

export default Home
