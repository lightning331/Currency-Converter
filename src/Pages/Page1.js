import React, {useEffect, useContext, useState} from 'react';
import {Context} from '../Store/Store'
import axios from 'axios';
import * as types from '../Common/ActionTypes';
import './styled.css';
import Select from "react-select";

const API_CURRENCY_SYMBOLS = "https://gist.githubusercontent.com/Fluidbyte/2973986/raw/8bb35718d0c90fdacb388961c98b8d56abc392c9/Common-Currency.json"
const API_CURRENCY_RATES = "https://api.exchangeratesapi.io/latest?"

export const Page1 = () => {
    const [state, dispatch] = useContext(Context);
    const [selectedOption1, setSelectedOption1] = useState(null)
    const [selectedOption2, setSelectedOption2] = useState(null)
    const [currencyList, setCurrencyList] = useState([])
    const [amount1, setAmount1] = useState(0)
    const [amount2, setAmount2] = useState(0)
    const [loading, setLoading] = useState(true)

    const customStyles = {
        control: (style) => ({
          ...style,
          height: '62px',
          minHeight: '62px',
          paddingLeft: '10px',
        }),
    };

    useEffect(() => {
        setLoading(true)
        //save the currency symbol list into state.symbols
        axios.get(API_CURRENCY_SYMBOLS) 
        .then(response => {
            const res1 = response.data;
            dispatch({type: types.CURRENCY_SYMBOL_SUCCESS, payload: res1});
        })
        .catch(error => {
            dispatch({type: types.CURRENCY_SYMBOL_ERROR, payload: error});
        });        

    }, [dispatch])

    useEffect(() => {
        //save the currency rate list based on "USD" into state.rates
        axios.get(API_CURRENCY_RATES + 'base=' + state.base)
        .then(response => {
            const res2 = response.data;
            dispatch({type: types.CURRENCY_RATES_SUCCESS, payload: res2});

            const list = Object.keys(state.symbols).map(key => (
                {value: key, label: state.symbols[key].name + ' (' + key + ')', symbol: state.symbols[key].symbol}
            ))
            
            const matched = list.filter(e => {
                return res2.rates.hasOwnProperty(e.value)
            })

            //set the default values of both amount1 and amoun2
            setAmount1(0)
            setAmount2(0)
            setCurrencyList(matched)
            setLoading(false)
            
        })
        .catch(error => {
            dispatch({type: types.CURRENCY_RATES_ERROR, payload: error});
        });        
    }, [dispatch, state.base, state.symbols])

    const currencyForm1 = () => {
        const rate1vs2 = state.rates.rates[selectedOption2.value]
        return (
            <div className="card">
                <div className="form">
                    <p>Currency</p>
                    <Select
                        styles={customStyles}
                        defaultValue={selectedOption1}
                        onChange={(e) => { 
                            dispatch({type: types.CHANGE_BASE, payload: e.value});
                            setSelectedOption1(e)}
                        }
                        options={currencyList}
                    />             
                    <p style={{marginTop: 32}}>Enter amount</p>    
                    <div className="input-amount">
                        <input type="number" value={amount1} 
                        onChange={(e) => {
                                setAmount1(e.target.value)
                                setAmount2((e.target.value * rate1vs2).toFixed(4))
                            }
                        } />
                        <p>{selectedOption1.symbol}</p>
                    </div>
                </div>
                <p className="result1">{`1 ${selectedOption1.symbol} = ${rate1vs2} ${selectedOption2.symbol}`}</p>
            </div>
        )
    }
    
    const currencyForm2 = () => {
        const rate2vs1 = (1/state.rates.rates[selectedOption2.value])
        return (
            <div className="card">
                <div className="form">
                    <p>Currency</p>
                    <Select
                        styles={customStyles}
                        defaultValue={selectedOption2}
                        onChange={(e) => { 
                            const rate = state.rates.rates[e.value]
                            setAmount2((amount1 * rate).toFixed(4))
                            setSelectedOption2(e)}
                        }
                        options={currencyList}
                    />       
                    <p style={{marginTop: 32}}>Enter amount</p>    
                    <div className="input-amount">
                        <input type="number" value={amount2} 
                        onChange={(e) => {
                                setAmount2(e.target.value)
                                setAmount1((e.target.value * Number(rate2vs1)).toFixed(4))
                            }
                        } />
                        <p>{selectedOption2.symbol}</p>
                    </div>
                </div>
                <p className="result1">{`1 ${selectedOption2.symbol} = ${rate2vs1} ${selectedOption1.symbol}`}</p>
            </div>
        )
    }
    if (!loading) {
        //set default currency
        const option1 = currencyList.find(e => {return e.value === state.base})
        const option2 = currencyList.find(e => {return e.value === "EUR"})
        if (!selectedOption1) {
            setSelectedOption1(option1)
        }
        if (!selectedOption2) {
            setSelectedOption2(option2)
        }
    }

    if (selectedOption1 && selectedOption2) {
        return (
            <div className="body">
                <p className="title">Currency converter</p>
                <p className="description">Please enter the amount you want to convert in any field</p>
                <div className="main">
                    {currencyForm1()}
                    {currencyForm2()}
                </div>
            </div>        
        )
    } else {
        //if needed, we will put loading indicator here
        return <p>Loading...</p>
    }
}
