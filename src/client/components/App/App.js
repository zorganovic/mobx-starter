import React from 'react'
import { connect } from 'mobx-connect'
import { IndexLink, Link } from 'react-router'
import Menu from './Menu'

@connect
class App extends React.Component {

    render() {
        return <div>
            <Menu>
                <IndexLink to="/">Browse</IndexLink>
                <Link to="/about">About</Link>
            </Menu>

            {this.props.children}
        </div>
    }
}

export default App
