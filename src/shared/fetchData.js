import map from 'lodash/fp/map';

/**
 * Execute fetchData methods for each component
 * @param renderProps
 * @param context - contains our state and actions
 * @returns {Promise} - returns a promise
 */
export default ({ components, params }, { state, actions }) => {

    const accumulate = map('fetchData')(components).filter(x => x)
    const fetchDataMethods = accumulate.map(method => method({ state, actions, params }))

    return Promise.all(fetchDataMethods);
};
