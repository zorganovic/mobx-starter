import {
    observable, asFlat, isObservableArray,
    isObservableMap, isObservableObject, toJS
} from 'mobx'

// Default state structure
// Everything that defines our application and that could be
// shared between components should be declared here.
const defaultState = observable({

    app: {
        title: 'Mobx-starter',
        statusCode: 200,
        hostname: 'localhost'
    },

    account: {},

    todos: {
        loading: false,
        items: asFlat([])
    }
})

/**
 * Helper function that supports merging maps
 * @param obj
 * @param other
 */
function mergeObservables(obj, other) {
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object') {
            if (isObservableMap(obj[key])) return obj[key].merge(other[key])
            if (isObservableArray(obj[key])) return obj[key].replace(other[key])
            if (isObservableObject(obj[key])) return mergeObservables(obj[key], other[key])
            obj[key] = other[key]
        } else {
            obj[key] = other[key]
        }
    })
}

// Export function that creates our server tate
export function createServerState() {
    return toJS(defaultState)
}

// Export function that creates our client state
export function createClientState() {
    if (process.env.BROWSER) {
        // Update our state
        mergeObservables(defaultState, window.__STATE)

        // For debugging purposes
        window.__STATE = defaultState

        return defaultState
    }
}
