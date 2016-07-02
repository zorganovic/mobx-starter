import React from 'react'
import { connect } from 'mobx-connect'

@connect()
class About extends React.Component {
    render() {
        return <main>
            <p>
                Created for the javascript community. May your reign never end!
            </p>
            <p>
                <a href="https://github.com/nightwolfz/mobx-starter">
                    https://github.com/nightwolfz/mobx-starter
                </a>
            </p>
        </main>
    }
}

export default About
