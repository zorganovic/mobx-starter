import map from 'lodash/fp/map';

/**
 * Execute fetchData methods for each component
 * @param renderProps
 * @param context - contains our state and actions
 * @returns {Promise} - returns a promise
 */
export default (component, params, { state, actions }) => {

    //console.log(component.props.children)

    const accumulate = map('fetchData')(component.props.children).filter(x => x)
    const fetchDataMethods = accumulate.map(method => method({ state, actions, params }))

    return Promise.all(fetchDataMethods);
};
