import React from 'react'
import { observer } from 'mobx-react'
import { IndexLink } from 'react-router'

@observer(['state','actions'])
class NotFound extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { router } = this.props

        return <main className="">
            <h3>Page not found. Are you lost ?</h3>

            <a onClick={router.goBack}>Go back</a>
            <IndexLink to="/">Main menu</IndexLink>
        </main>
    }
}

export default NotFound;
