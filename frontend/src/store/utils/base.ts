export default function (handlers: any, defaultState = {}) {
    return abstractReducer.bind(null, handlers, defaultState);
}

function abstractReducer(handlers: any, defaultState: any, state: any, action: any) {
    return handlers[action.type] ? handlers[action.type](state, action) : (state || defaultState);
}