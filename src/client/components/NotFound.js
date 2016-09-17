import React from 'react'
import { observer } from 'mobx-react'
import { IndexLink } from 'react-router'

@observer(['state', 'actions'])
class NotFound extends React.Component {
    render() {
        const { history } = this.props

        return <main className="">
            <h3>Page not found. Are you lost ?</h3>

            <a onClick={history.goBack}>Go back</a>
            <IndexLink to="/">Main menu</IndexLink>
        </main>
    }
}

export default NotFound;
