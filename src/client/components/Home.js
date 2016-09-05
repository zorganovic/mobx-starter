import React from 'react'
import { observer } from 'mobx-react'
import size from 'lodash/fp'
import AddTodo from './Home/AddTodo'
import Todo from './Home/Todo'

@observer(['state','actions'])
class Home extends React.Component {

    // Server-side state being updated
    static fetchData({ actions, state, params }) {
        return actions.todos.browse()
    }

    componentDidMount() {
        const { store, state } = this.props

        if (!size(state.todos.items)) {
            store.todos.browse().then(items => {
                // Since the client-side state is observable, we have to use .replace() for arrays
                state.todos.items.replace(items)
            })
        }
    }

    render() {
        const { state } = this.props

        return <main>
            <h1>todos</h1>
            <div className="home">
                <AddTodo/>
                <section className="main">
                    <ul className="todo-list">
                        {state.todos.items.map(item => <Todo key={item.text.hashCode()} item={item}/>)}
                    </ul>
                </section>
            </div>
        </main>
    }
}

export default Home
