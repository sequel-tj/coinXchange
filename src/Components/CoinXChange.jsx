import React from 'react';
import { Input, Select, Space, Mentions } from 'antd';
import { useEffect, useRef, useState } from 'react';


function CoinXChange() {
    const apiUrl = 'https://api.coingecko.com/api/v3/exchange_rates';
    const firstDefaultValue = 'Bitcoin';
    const secondDefaultValue = 'Ether';
    const firstDefaultValueUnit = 'BTC';
    const secondDefaultValueUnit = 'ETH';
    const [cryptoList, setCryptoList] = useState([]);
    const [inputValue, setInputValue] = useState(0);
    const [selectFirst, setSelectFirst] = useState(firstDefaultValue);
    const [selectSecond, setSelectSecond] = useState(secondDefaultValue);
    const [selectFirstUnit, setSelectFirstUnit] = useState(firstDefaultValueUnit);
    const [selectSecondUnit, setSelectSecondUnit] = useState(secondDefaultValueUnit);
    const [outputValue, setOutputValue] = useState(0);
    
    useEffect(() => {
        fetchData();
    }, []);
    
    async function fetchData() {
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        
        const data = Object.entries(jsonData.rates).map(element => {
            return {
                name: element[1].name,
                unit: element[1].unit,
                value: element[1].name, // in select tag value is used to show options
                rate: element[1].value,
                type: element[1].type,
            }
        });

        setCryptoList(data);
        // console.log(cryptoList);
    }

    useEffect(() => {
        if (cryptoList.length === 0) return;

        const firstSelectData = cryptoList.find((item) => {
            return item.value === selectFirst;
        });
        
        const secondSelectData = cryptoList.find((item) => {
            return item.value === selectSecond;
        });

        let rate = firstSelectData.rate*secondSelectData.rate;
        setOutputValue(rate);
        setSelectFirstUnit(firstSelectData.unit);
        setSelectSecondUnit(secondSelectData.unit);
        // setOutputValue(rate*inputValue);
        // console.log(firstSelectRate, secondSelectRate);
        
    }, [inputValue, selectFirst, selectSecond]);
        

    // return (
    //     <section id='form-container'>
    //     <div className="form-container">
    //             <h1>coinXchange</h1>
    //         <form className='xchange-form'>
    //             <Input className='input-value' placeholder='Enter number of coins' onChange={(event) => {setInputValue(event.target.value)}}/>
    //             <div className='coin-select-container'>
    //                 {/* allow clear property */}
    //                     <Select className='coin-select' defaultValue={firstDefaultValue} style={{ width: 120, }} options={cryptoList} onChange={(value) => {setSelectFirst(value)}} />
    //                     <Select className='coin-select' defaultValue={secondDefaultValue} style={{ width: 120, }} options={cryptoList} onChange={(value) => {setSelectSecond(value)}} />
    //             </div>
    //             <Input className='output-value' value={`${inputValue} ${selectFirst} = ${outputValue.toFixed(6)} ${selectSecond}`} />
    //         </form>
    //     </div>
    //     </section>
    // );


    return (
        <section id='form-container'>
        <div className="form-container">
                <h1>coinXchange</h1>
            <form className='xchange-form'>
                <div className='container'>
                    <Input className='input-value' placeholder='Enter number of coins' onChange={(event) => {setInputValue(event.target.value)}}/>
                    <Select className='coin-select' defaultValue={firstDefaultValue} style={{ width: 120, }} options={cryptoList} onChange={(value) => {setSelectFirst(value)}} />
                </div>
                <div className='container'>
                    <Select className='coin-select' defaultValue={secondDefaultValue} style={{ width: 120, }} options={cryptoList} onChange={(value) => {setSelectSecond(value)}} />
                    <Input className='output-value' readOnly value={`${inputValue} ${selectFirstUnit} = ${outputValue.toFixed(6)} ${selectSecondUnit}`} />
                </div>
            </form>
        </div>
        </section>
    );
}

export default CoinXChange;