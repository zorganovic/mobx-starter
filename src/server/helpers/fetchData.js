import _ from 'lodash';

/**
 * Execute fetchData methods for each component
 * @param renderProps
 * @param state - contains our state
 * @param store - contains our actions
 * @returns {Promise} - returns a promise
 */
export default (renderProps, state, store) => {
    const params = renderProps.params
    const fetchDataMethods = _.chain(renderProps.components)
                              .map('fetchData')
                              .compact()
                              .map(method => method({ state, store, params }))
                              .value();

    return Promise.all(fetchDataMethods);
};
