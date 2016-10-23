// This is the entry point for our client-side logic
import '../assets/css/index.scss'
import 'isomorphic-fetch'
import 'core/polyfills'
import 'core/console'
import 'isomorphic-fetch'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router'
import createStores from './stores'
import autorun from './autorun'
import App from './components/App'

// We render our react app into this element
const container = document.getElementById('container')

// Initialize actions and state
const stores = createStores(window.__STATE)

// React to changes
autorun(stores)

const renderProps = (<App stores={stores}/>)

// Render HTML on the browser
render(<AppContainer>
    <BrowserRouter>
        {renderProps}
    </BrowserRouter>
</AppContainer>, container)

// Hot-reloading
if (module.hot) {
    module.hot.accept()
}
