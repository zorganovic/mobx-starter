import React from 'react'
import { observer } from 'mobx-react'

@observer(['account'])
class Logout extends React.Component {

    handleLogout = () => {
        const { account } = this.props
        account.logout()
    }

    render() {
        return <main>
            <center className="account">
                <h3>Do you want to log out ?</h3>
                <p>This will disconnect you and you will have to login again next time.</p>

                <button onClick={this.handleLogout}>Logout</button>
            </center>
        </main>
    }
}

export default Logout
