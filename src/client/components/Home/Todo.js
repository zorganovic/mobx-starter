import React from 'react'
import { observer } from 'mobx-react'

@observer(['todos'])
class Todo extends React.Component {
    render() {
        const { todos, item } = this.props

        return <li className="todo">
            <div className="view">
                <label>{item.text}</label>
                <button className="destroy" onClick={(e) => todos.remove(item)}/>
            </div>
        </li>
    }
}

export default Todo
