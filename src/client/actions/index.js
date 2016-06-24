import todos from './todos'

// All our actions are listed here
const actions = {
    todos
}

function composeWithFetch(state) {
    return function(url) {
        return fetch(`http://${state.app.hostname}/${url}`)
        .then(response => response.json())
    }
}

export default function(state) {

    const namespaces = Object.keys(actions)
    const classes = {}

    for (var i in namespaces) {
        const namespace = namespaces[i]
        const classObj = actions[namespace](state, classes);
        classes[namespace] = new classObj()
        classes[namespace].fetch = composeWithFetch(state)
    }

    return classes
}
