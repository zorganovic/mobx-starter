import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'
import Menu from '../components/common/Menu'
import Home from './Home'
import About from './About'
import NotFound from './NotFound'
import Login from './Login'
import Logout from './Logout'
import Register from './Register'

class Index extends React.Component {
  render() {
    const { stores } = this.props

    // Wrapping with provider gives children access to stores
    return (
      <Provider {...stores}>
        <div>
          <Menu/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/page/about" component={About}/>

            {/* User management */}
            <Route exact path="/page/login" component={Login}/>
            <Route exact path="/page/logout" component={Logout}/>
            <Route exact path="/page/register" component={Register}/>

            <Route component={NotFound}/>
          </Switch>
        </div>
      </Provider>
    )
  }
}

Index.propTypes = {
  stores: PropTypes.object.isRequired
}

export default Index
