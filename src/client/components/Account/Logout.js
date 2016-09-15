import React from 'react'
import { observer } from 'mobx-react'
import Loading from '../Common/Loading'

@observer(['state', 'actions', 'history'])
class Logout extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        const { account } = this.props.actions
        const { state, history } = this.props

        account.logout().then(() => {
            this.setState({
                loading: false
            })
            setTimeout(() => history.push('/'), 200)
        })
    }

    render() {
        const { state } = this.props

        if (state.loading) {
            return <Loading/>
        }

        return <main>
            <center className="account">
                <h3>Signing out...</h3>
            </center>
        </main>
    }
}

export default Logout
