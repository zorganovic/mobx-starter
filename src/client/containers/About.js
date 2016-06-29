import React from 'react'
import { connect } from 'mobx-connect'

@connect()
class About extends React.Component {
    render() {
        return <main>
            <p>Something about you</p>
        </main>
    }
}

export default About
