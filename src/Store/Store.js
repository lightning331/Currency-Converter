import React, {createContext, useReducer} from "react";
import Reducer from "./Reducer"


const initialState = {
    symbols: null, //all currency list including the symbols
    symbol_error: null, //error when receiving the "symbols"
    base: "USD", //defaulf base value of currency is "USD"
    rates: null,  //currency exchange rate list based on "base"
    rate_error: null, //error when receiving the "rates"
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;