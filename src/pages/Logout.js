import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'
import Loading from '../components/common/Loading'

@inject('account') @observer
class Logout extends React.Component {

  // When route is loaded (isomorphic)
  // static onEnter({ common }) {
  //   common.title = 'Logout'
  // }

  static contextTypes = {
    router: PropTypes.any
  }

  @observable loading = false

  handleLogout = async() => {
    const { account } = this.props
    const { router } = this.context

    await account.logout()
    this.loading = true

    setTimeout(() => router.history.push('/'), 500)
  }

  render() {
    if (this.loading) {
      return <Loading/>
    }

    return (
      <main>
        <div className="account">
          <h3>Do you want to log out ?</h3>
          <p>This will disconnect you and you will have to login again next time.</p>

          <button onClick={this.handleLogout}>Logout</button>
        </div>
      </main>
    )
  }
}

export default Logout
