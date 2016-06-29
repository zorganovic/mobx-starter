import React from 'react'
import { connect } from 'mobx-connect'

@connect
class AddTodo extends React.Component {

    handleSubmit(e) {
        e.preventDefault()
        this.context.store.todos.add()
    }

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

        return <form className="add-todo" onSubmit={e => this.handleSubmit(e)}>
            <p>
                <input type="text" placeholder="What needs to be done?" {...this.handleChange('text')}/>
            </p>
            <p>
                {/*
                Make sure to either bind methods or use arrow syntax like below
                otherwise `this` is going to be incorrect.
                */}
                <button onClick={e => this.handleSubmit(e)}>Add todo</button>
            </p>
        </form>
    }
}

export default AddTodo
