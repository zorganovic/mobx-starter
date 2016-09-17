import React from 'react'
import { observer } from 'mobx-react'
import AddTodo from './Home/AddTodo'
import Todo from './Home/Todo'

@observer(['state', 'actions'])
class Home extends React.Component {

    componentWillMount() {
        const { actions } = this.props
        return actions.todos.browse()
    }

    render() {
        const { state } = this.props

        return <main>
            <h1>
                todos
            </h1>
            <div className="home">
                <AddTodo/>
                <section className="main">
                    <ul className="todo-list">
                        {state.todos.items.map((item, index) => {
                            return <Todo key={index} item={item}/>
                        })}
                    </ul>
                </section>
            </div>
        </main>
    }
}

export default Home
