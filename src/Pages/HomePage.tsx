import React, {useEffect, useContext} from 'react';
import {Context} from '../Store/Store'
import axios from 'axios';
import * as types from '../Common/ActionTypes';
import './HomePage.css';

const GET_CURRENCY_SYMBOLS = "https://gist.githubusercontent.com/Fluidbyte/2973986/raw/8bb35718d0c90fdacb388961c98b8d56abc392c9/Common-Currency.json"
const GET_CURRENCY_RATES = "https://api.exchangeratesapi.io/latest?"

export const HomePage = () => {
    const [state, dispatch] = useContext(Context);
    useEffect(() => {
        //receive the currency symbol list
        axios.get(GET_CURRENCY_SYMBOLS)
        .then(response => {
            const postsData = response.data;
            console.log(postsData)
            dispatch({type: types.CURRENCY_SYMBOL_SUCCESS, payload: postsData});
        })
        .catch(error => {
            dispatch({type: types.CURRENCY_SYMBOL_ERROR, payload: error});
        });        

        //receive the currency rate list based on "USD"
        axios.get(GET_CURRENCY_RATES + 'base=USD')
        .then(response => {
            const postsData = response.data;
            console.log(postsData)
            dispatch({type: types.CURRENCY_RATES_SUCCESS, payload: postsData});
        })
        .catch(error => {
            dispatch({type: types.CURRENCY_RATES_ERROR, payload: error});
        });        

    }, [dispatch])

    // if (!state.symbol_error && state.symbols) {
    //     console.log(state.symbols.USD)
    // }

    if (!state.rate_error && state.rates && state.rates.rates) {
        return (
            <div>
                <div className="header">
                    <div className="tabmenu">
                        {/* <ul> */}
                        <ul>
                            <li className="nav-item pr-4">
                                <a>CURRENCY CONVERTER</a>
                            </li>
                            <li>
                                <a>CURRENT EXCHANGE RATES</a>
                            </li>
                        </ul>
                    </div>
                </div>
                            
                <div className="body">
                    <p className="title">Currency converter</p>
                    <p className="description">Please enter the amount you want to convert in any field</p>
                    <div className="form">
                        <p>Currency</p>
                    </div>
                    {/* <div>
                    {
                        Object.keys(state.rates.rates).map((key, i) => (
                            <p key={i}>
                                <span>Name: {key} </span>
                                <span>Value: {state.rates.rates[key]}</span>
                            </p>
                        ))
                    }
                    </div>     */}
                </div>        
            </div>       
        )
    } else {
        return <p>Loading...</p>
    }
}
