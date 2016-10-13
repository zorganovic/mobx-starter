import React from 'react'
import { Provider } from 'mobx-react'

class App extends React.Component {
    render() {
        const { stores, children } = this.props

        // Wrapping with provider gives children access to stores
        return (
            <Provider {...stores}>
                {children}
            </Provider>
        )
    }
}

// Hot-reloading
/*if (module.hot) {
    module.hot.accept()
}*/

export default App
