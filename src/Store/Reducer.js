import * as types from '../Common/ActionTypes';

const Reducer = (state, action) => {
    switch (action.type) {
        case types.CURRENCY_SYMBOL_SUCCESS:
            return {
                ...state,
                symbols: action.payload
            };
        case types.CURRENCY_SYMBOL_ERROR:
            return {
                ...state,
                symbol_error: action.payload
            };
        case types.CHANGE_BASE:
            return {
                ...state,
                base: action.payload
            };
        case types.CURRENCY_RATES_SUCCESS:
            return {
                ...state,
                rates: action.payload
            };
        case types.CURRENCY_RATES_ERROR:
            return {
                ...state,
                rate_error: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;