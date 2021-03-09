import React, {useContext} from 'react';
import {Context} from '../Store/Store'
import './styled.css';

export const Page2 = () => {
    const [state] = useContext(Context);
    
    const tableHeader = () => {
        return (
            <div className="list_header">
                <p style={{width: '20%'}}>Currency</p>
                <p style={{width: '30%'}}>Currency Name</p>
                <p>{"Exchange Rate = 1" + state.base}</p>
            </div>
        )
    }

    const tableBody = () => {
        return (
            <div className="list_body">
            {Object.keys(state.rates.rates).map(key => (
                key !== state.base && //avoid same key with base itself
                <div className="list_cell" key={key}>
                    <p style={{width: '20%'}}>{key}</p>
                    <p style={{width: '30%'}}>{state.symbols[key].name}</p>
                    <p>{state.rates.rates[key]}</p>
                </div>
            ))}
            </div>
        )
    }

    if (!state.symbols && !state.rates) {
        return <p>Not found the current currency</p>
    }

    const symbol = state.symbols[state.base]
    return (
        <div className="body">
            <p className="title">{symbol.name + " (" + state.base + ")" 
                + " Exchange Rates"}
            </p>
            <div className = "table_rates">
                {tableHeader()}
                {tableBody()}
            </div>
        </div>
    )
}