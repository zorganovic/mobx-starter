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
//import fetchData from 'core/helpers/fetchData';
import actions from './actions'
import autorun from './autorun'
import App from './components/App'

// We render our react app into this element
const container = document.getElementById('container')

// Initialize actions and state
const stores = actions(window.__STATE)

// React to changes
autorun(stores)

const renderProps = (<App stores={stores}/>)

// Render HTML on the browser
//fetchData(renderProps, {}, stores).then(() => {
    render(<AppContainer>
        <BrowserRouter>
            {renderProps}
        </BrowserRouter>
    </AppContainer>, container)
//})

// Hot-reloading
if (module.hot) {
    module.hot.accept()
}
