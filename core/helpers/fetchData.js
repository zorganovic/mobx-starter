import { map } from 'lodash';

/**
 * Execute fetchData methods for each component
 * @param renderProps
 * @param context - contains our state and actions
 * @returns {Promise} - returns a promise
 */
export default async(components, params, stores) => {
    const accumulate = map(components, 'fetchData').filter(x => x)
    return accumulate.map(method => method(stores, params))
}
