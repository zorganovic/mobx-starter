import React from 'react'
import { observer } from 'mobx-react'

@observer(['state', 'actions'])
class About extends React.Component {
    render() {
        return <main>
            <h1>mobx-starter</h1>
            <section className="account">
                <p>
                    <img src="https://avatars0.githubusercontent.com/u/805022?v=3&s=160"/>
                </p>
                <p>
                    Created for the javascript community. May your reign never end!
                </p>
                <p>
                    <a href="https://github.com/nightwolfz/mobx-starter" target="_blank">
                        https://github.com/nightwolfz/mobx-starter
                    </a>
                </p>
            </section>
        </main>
    }
}

export default About
