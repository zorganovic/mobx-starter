import React from 'react'
import { connect } from 'mobx-connect'

@connect
class Movie extends React.Component {

    componentDidMount() {
    }

    render() {
        const { todos } = this.context.store
        const {item} = this.props

        return <article className="todo">
            <div>{item.text}</div>
            <div>
                <button onClick={(e) => todos.delete(item._id)}>[delete]</button>
            </div>
        </article>
    }
}

export default Movie
