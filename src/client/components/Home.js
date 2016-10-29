import React from 'react'
import { observer } from 'mobx-react'
import AddTodo from './Home/AddTodo'
import Todo from './Home/Todo'

@observer(['todos'])
class Home extends React.Component {

    static onEnter({ todos }) {
        return todos.browse()
    }

    render() {
        const { todos } = this.props
        return <main>
            <h1>
                todos
            </h1>
            <div className="home">
                <AddTodo/>
                <section className="main">
                    <ul className="todo-list">
                        {todos.items.map((item, index) => {
                            return <Todo key={index} item={item}/>
                        })}
                    </ul>
                </section>
            </div>
        </main>
    }
}

export default Home
