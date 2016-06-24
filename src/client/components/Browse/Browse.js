import React from 'react'
import { connect } from 'mobx-connect'
import AddTodo from './AddTodo'
import Todo from './Todo'

@connect
class Browse extends React.Component {
    render() {
        const { state } = this.context

        return <section>
            {state.todos.items.map(item => <Todo key={item.text.hashCode()} item={item}/>)}
            <AddTodo/>
        </section>
    }
}

export default Browse
