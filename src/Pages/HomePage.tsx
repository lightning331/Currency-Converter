import React, {useEffect, useContext, useState} from 'react';
import {Context} from '../Store/Store'
import axios from 'axios';
import * as types from '../Common/ActionTypes';
import './styled.css';
import Select from "react-select";
import FormCard from './FormCard'

const GET_CURRENCY_SYMBOLS = "https://gist.githubusercontent.com/Fluidbyte/2973986/raw/8bb35718d0c90fdacb388961c98b8d56abc392c9/Common-Currency.json"
const GET_CURRENCY_RATES = "https://api.exchangeratesapi.io/latest?"

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

export const HomePage = () => {
    const [state, dispatch] = useContext(Context);
    const [selectedOption1, setSelectedOption1] = useState(null)
    const [selectedOption2, setSelectedOption2] = useState(null)
    const [currencyList, setCurrencyList] = useState([])
    const [amount1, setAmount1] = useState(0)
    const [amount2, setAmount2] = useState(0)
    const [based, setBased] = useState("USD")
    const [loading, setLoading] = useState(true)

    const customStyles = {
        control: (base) => ({
          ...base,
          height: '62px',
          minHeight: '62px',
          paddingLeft: '10px',
        }),
    };

    useEffect(() => {
        setLoading(true)
        console.log("useEffect1")
        axios.get(GET_CURRENCY_SYMBOLS) //save the currency symbol list into state.symbols
        .then(response => {
            const res1 = response.data;
            dispatch({type: types.CURRENCY_SYMBOL_SUCCESS, payload: res1});
        })
        .catch(error => {
            dispatch({type: types.CURRENCY_SYMBOL_ERROR, payload: error});
        });        

    }, [dispatch])

    useEffect(() => {
        // setLoading(true)
        console.log("useEffect2")

        //save the currency rate list based on "USD" into state.rates
        axios.get(GET_CURRENCY_RATES + 'base=' + based)
        .then(response => {
            const res2 = response.data;
            dispatch({type: types.CURRENCY_RATES_SUCCESS, payload: res2});
            const list = Object.keys(state.symbols).map(key => (
                {value: key, label: state.symbols[key].name + ' (' + key + ')', symbol: state.symbols[key].symbol}
            ))
            
            const matched = list.filter(e => {
                return res2.rates.hasOwnProperty(e.value)
            })
            setAmount1(0)
            setAmount2(0)
            setCurrencyList(matched)
            setLoading(false)
            
        })
        .catch(error => {
            dispatch({type: types.CURRENCY_RATES_ERROR, payload: error});
        });        
    }, [based, dispatch, state.symbols])

    // if (!state.symbol_error && state.symbols && !state.rate_error && state.rates) {
    // }

    // const onChangeCurrency1 = (value: Number) => {
    //     const rate1vs2 = state.rates.rates[selectedOption2.value]
    //     setAmount1(value)
    //     setAmount2((Number(value) * rate1vs2).toFixed(4))
    // };

    // const onChangeCurrency2 = (value: Number) => {
    //     const rate2vs1 = 1/state.rates.rates[selectedOption2.value]
    //     setAmount2(value)
    //     setAmount1((Number(value) * rate2vs1).toFixed(4))
    //   };
    
    if (!loading) {
        //set default currency
        const option1 = currencyList.find(e => {return e.value === based})
        const option2 = currencyList.find(e => {return e.value === "EUR"})
        if (!selectedOption1) {
            setSelectedOption1(option1)
        }
        if (!selectedOption2) {
            setSelectedOption2(option2)
        }
    }

    if (!loading && selectedOption1 && selectedOption2) {
        const rate1vs2 = state.rates.rates[selectedOption2.value]
        const rate2vs1 = (1/rate1vs2)
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
                    <div className="main">
                        <div>
                            {/* <FormCard 
                                option={selectedOption1} 
                                list={currencyList} 
                                amount={amount1} 
                                onChangeValue={onChangeCurrency1}
                            /> */}

                            <div className="form">
                                <p>Currency</p>
                                <Select
                                    styles={customStyles}
                                    defaultValue={selectedOption1}
                                    //onChange={setSelectedOption1}
                                    onChange={(e) => { 
                                        setBased(e.value)
                                        setSelectedOption1(e)}
                                    }
                                    options={currencyList}
                                />             
                                <p style={{marginTop: 32}}>Enter amount</p>    
                                <div className="input-amount">
                                    <input type="number" value={amount1} 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setAmount1(e.target.value)
                                            setAmount2((e.target.value * rate1vs2).toFixed(4))
                                        }
                                    } />
                                    <p>{selectedOption1.symbol}</p>
                                </div>
                            </div>
                            <p className="result1">{`1 ${selectedOption1.symbol} = ${rate1vs2} ${selectedOption2.symbol}`}</p>
                        </div>
                        
                        <div className="secondform">
                            {/* <FormCard 
                                option={selectedOption2} 
                                list={currencyList} 
                                amount={amount2} 
                                onChangeValue={onChangeCurrency2}
                            /> */}

                            <div className="form">
                                <p>Currency</p>
                                <Select
                                    styles={customStyles}
                                    defaultValue={selectedOption2}
                                    // onChange={setSelectedOption2}
                                    onChange={(e) => { 
                                        const rate = 1 / state.rates.rates[e.value]
                                        setAmount1((amount2 * rate).toFixed(4))
                                        setSelectedOption2(e)}
                                    }
                                    options={currencyList}
                                />       
                                <p style={{marginTop: 32}}>Enter amount</p>    
                                <div className="input-amount">
                                    <input type="number" value={amount2} 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setAmount2(e.target.value)
                                            setAmount1((e.target.value * Number(rate2vs1)).toFixed(4))
                                        }
                                    } />
                                    <p>{selectedOption2.symbol}</p>
                                </div>
                            </div>
                            <p className="result1">{`1 ${selectedOption2.symbol} = ${rate2vs1} ${selectedOption1.symbol}`}</p>
                        </div>
                    </div>
                </div>        
            </div>       
        )
    } else {
        return <p>Loading...</p>
    }
}
