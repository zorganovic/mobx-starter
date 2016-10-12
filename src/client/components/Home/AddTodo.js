import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

@observer(['todos'])
class AddTodo extends React.Component {

    @observable inputText = ''

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.todos.add(this.inputText)
            .then(() => {
                // Clear input text on sucess
                this.inputText = ''
            })
    }

    handleChange = (e) => {
        this.inputText = e.target.value
    }

    render() {
        return <form className="header" onSubmit={this.handleSubmit}>
            <p>
                <input type="text"
                       className="new-todo"
                       placeholder="What needs to be done?"
                       value={this.inputText}
                       onChange={this.handleChange}/>
            </p>
        </form>
    }
}

export default AddTodo
