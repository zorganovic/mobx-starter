import todos from './todos'

// All our actions are listed here
const actions = {
    todos
}

function composeGET(state) {
    return function(url) {
        return fetch(`http://${state.app.hostname}/${url}`, {
            credentials: 'same-origin'
        })
        .then(response => response.json())
    }
}

function composePOST(state) {
    return function(url, body) {
        return fetch(`http://${state.app.hostname}/${url}`, {
            method: 'POST',
            body: JSON.stringify(body),
            credentials: 'same-origin'
        })
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
        classes[namespace].get = composeGET(state)
        classes[namespace].post = composePOST(state)
    }

    return classes
}
