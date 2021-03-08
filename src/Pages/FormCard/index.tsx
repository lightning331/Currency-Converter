import React, { useState, createRef, useEffect } from 'react'
import Select from "react-select";
import './styled.css';

interface Currency {
    value: string
    label: string
    symbol: boolean
  }
  
interface Props {
    option: Currency
    list: Currency[]
    amount: Number
    onChangeValue: (value: Number) => void;
}
  
const FormCard: React.FC<Props> = ({ option, list, amount, onChangeValue }) => {
    const customStyles = {
        control: (base) => ({
          ...base,
          height: '62px',
          minHeight: '62px',
          paddingLeft: '10px',
        }),
    };

    return (
        <div className="form">
            <p>Currency</p>
            <Select
                styles={customStyles}
                defaultValue={option}
                onChange={option}
                options={list}
            />             
            <p style={{marginTop: 32}}>Enter amount</p>    
            <div className="input-amount">
                <input type="number" value={amount} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            onChangeValue(e.target.value)
                            // setAmount1(e.target.value)
                            // setAmount2((e.target.value * rate1vs2).toFixed(4))
                        }
                    } 
                />
                <p>{option.symbol}</p>
            </div>
        </div>
    )
}

export default FormCard