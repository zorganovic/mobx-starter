import React from 'react'
import { connect } from 'mobx-connect'

@connect
class AddTodo extends React.Component {

    handleChange() {
        const { state } = this.context

        return {
            value: state.forms.addtodo.text,
            onChange(e) {
                state.forms.addtodo.text = e.target.value
            }
        }
    }

    render() {
        const { store } = this.context
        const { item } = this.props

        return <article className="add-todo">
            <p>Add todo</p>
            <p><input {...this.handleChange('text')}/></p>
            <p><button onClick={store.todos.add}>Add todo</button></p>
        </article>
    }
}

export default AddTodo
