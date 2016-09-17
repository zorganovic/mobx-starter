import React from 'react'
import { observer } from 'mobx-react'

@observer(['state', 'actions'])
class Todo extends React.Component {
    render() {
        const { todos } = this.props.actions
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
