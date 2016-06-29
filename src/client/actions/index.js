import todos from './todos'

// All our actions are listed here
const actions = {
    todos
}

function request(state) {
    return function(url, body) {
        console.info(`Fetching: ${url}`)

        const options = { credentials: 'same-origin' }
        if (body) {
            options.method = 'POST'
            options.body = JSON.stringify(body)
            options.headers = {
                'Content-Type': 'application/json'
            }
        }
        return fetch(`http://${state.app.hostname}/${url}`, options)
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
        classes[namespace].request = request(state)
    }

    return classes
}
