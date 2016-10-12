import React from 'react'
import { observer } from 'mobx-react'
import AddTodo from './Home/AddTodo'
import Todo from './Home/Todo'

@observer(['todos'])
class Home extends React.Component {

    /*componentWillReact() {
        console.warn(this)
    }*/

    /*componentWillMount() {
        const { todos } = this.props
        // Server-side call
        if (this.updater.transaction && this.updater.transaction.renderToStaticMarkup) {
            Home.fetchData({ todos }).then(() => {
                this.forceUpdate()
                console.debug('componentWillMount')
            })
        }
    }*/

    static fetchData({ todos }) {
        console.debug('static.fetchData')
        return todos.browse()
    }

    render() {
        console.debug('Home.render')
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
