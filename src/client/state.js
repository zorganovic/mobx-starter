const { observable, asFlat, toJS } = require('mobx')

// Default state structure
let defaultState = observable({
    app: {
        title: 'Mobx-starter',
        statusCode: 200
    },
    home: {
        menu: {
            index: 0,
            items: {}
        }
    },
    todos: {
        loading: false,
        items: asFlat([])
    },
    forms: {
        addtodo: {
            text: ''
        }
    }
})

// Export an instance of our state
module.exports = global.isClient ? defaultState : toJS(defaultState)
