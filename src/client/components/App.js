import React from 'react'
import { Match, Miss } from 'react-router'
import { Provider, observer } from 'mobx-react'
import Home from './Home'
import About from './About'
import Login from './Account/Login'
import Logout from './Account/Logout'
import Register from './Account/Register'
import NotFound from './NotFound'
import Menu from './Common/Menu'

class App extends React.Component {
    render() {
        return (
        <Provider {...this.props.stores}>
            <div>
                <Match pattern="*" component={Menu}/>

                <Match exactly pattern="/" component={Home}/>
                <Match exactly pattern="/about" component={About}/>

                {/* User management */}
                <Match exactly pattern="/login" component={Login}/>
                <Match exactly pattern="/logout" component={Logout}/>
                <Match exactly pattern="/register" component={Register}/>

                <Miss component={NotFound}/>
            </div>
        </Provider>
        )
    }
}

export default App
