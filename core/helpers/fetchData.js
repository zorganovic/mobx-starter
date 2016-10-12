import { map } from 'lodash';

/**
 * Execute fetchData methods for each component
 * @param renderProps
 * @param context - contains our state and actions
 * @returns {Promise} - returns a promise
 */
export default function(component, params, stores) {

    console.log(component)

    const accumulate = map(component.props.children, 'fetchData').filter(x => x)
    const fetchDataMethods = accumulate.map(method => method(stores, params))

    return Promise.all(fetchDataMethods);
}
