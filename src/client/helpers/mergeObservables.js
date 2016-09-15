import { isObservableArray, isObservableMap, isObservableObject } from 'mobx'

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
    // For debugging purposes
    window.__STATE = obj

    return obj
}

export default mergeObservables
