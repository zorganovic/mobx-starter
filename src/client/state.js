const { observable, asFlat, toJS } = require('mobx')

// Default state structure
let defaultState = observable({
    app: {
        title: 'Mobx-starter',
        statusCode: 200
    },
    account: {
        username: null
    },
    todos: {
        loading: false,
        items: asFlat([])
    }
})

// Export an instance of our state
module.exports = global.isClient ? defaultState : toJS(defaultState)
