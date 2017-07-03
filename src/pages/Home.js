import React from 'react'
import { observer, inject } from 'mobx-react'
import AddTodo from '../components/home/AddTodo'
import Todo from '../components/home/Todo'

import Button from 'react-bootstrap/lib/Button'

import CalendarModal from '../components/home/CalendarModal'

@inject('todos') @observer
class Home extends React.Component {

  // When route is loaded (isomorphic)
  static onEnter({ todos, common }, params) {
    common.title = 'Home'
    return todos.browse()
  }

  render() {
    const { todos } = this.props
    return (
      <main>
        <h1>todos</h1>
        <div className="home">
          <AddTodo/>
          <section className="main">
            <ul className="todo-list">
              {todos.items.map((item, index) => {
                return <Todo key={index} item={item}/>
              })}
            </ul>
          </section>
          <Button onClick={() => {todos.show_modal = true}} bsStyle="danger">Calendar</Button>
          <CalendarModal show={todos.show_modal}/>
        </div>
      </main>
    )
  }
}

export default Home
