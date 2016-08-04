import React from 'react'
import { connect } from 'mobx-connect'

@connect
class Todo extends React.Component {

    componentDidMount() {
    }

    render() {
        const { todos } = this.context.store
        const { item } = this.props

        return <li className="todo">
            <div className="view">
                <label>{item.text}</label>
                <button className="destroy" onClick={(e) => todos.remove(item)}/>
            </div>
        </li>
    }
}

export default Todo
