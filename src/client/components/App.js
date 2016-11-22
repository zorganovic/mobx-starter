import React, { PropTypes } from 'react'
import { Match, Miss } from 'react-router'
import { Provider } from 'mobx-react'
import Home from './Home'
import About from './About'
import Login from './Account/Login'
import Logout from './Account/Logout'
import Register from './Account/Register'
import NotFound from './NotFound'
import Menu from './Common/Menu'

class App extends React.Component {
    render() {
        const { stores } = this.props

        // Wrapping with provider gives children access to stores
        return (<Provider {...stores}>
            <div>
                <Menu/>

                <Match exactly pattern="/" component={Home}/>
                <Match exactly pattern="/page/about" component={About}/>

                {/* User management */}
                <Match exactly pattern="/page/login" component={Login}/>
                <Match exactly pattern="/page/logout" component={Logout}/>
                <Match exactly pattern="/page/register" component={Register}/>

                <Miss component={NotFound}/>
            </div>
        </Provider>)
    }
}

export default App
