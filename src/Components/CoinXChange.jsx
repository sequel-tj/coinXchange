import React from 'react';
import { Input, Select, Space, Mentions } from 'antd';
import { useEffect, useRef, useState } from 'react';


function CoinXChange() {
    const apiUrl = 'https://api.coingecko.com/api/v3/exchange_rates';
    const [cryptoList, setCryptoList] = useState([]);
    const selectCoins = useRef('');

    const coinOptions = [
        {
            name: 'Bitcoin',
            unit: 'btc',
            value: 'Bitcoin',
        },
    ]

    async function fetchData() {
        const response = await fetch(apiUrl);
        const jsonData = await response.json();

        console.log(jsonData.rates);
    }

    useEffect(() => {
        fetchData();
    }, [])


    return (
        <section id='form-container'>
        <div className="form-container">
                <h1>coinXchange</h1>
            <form className='xchange-form'>
                <Input className='input-value' placeholder="Enter value" />
                <div className='coin-select-container'>
                    {/* allow clear property */}
                    <Select className='coin-select' defaultValue="select" style={{ width: 120, }} options={coinOptions} useref={selectCoins} />
                    <Select className='coin-select' defaultValue="select" style={{ width: 120, }} options={coinOptions} />
                </div>
                <Input className='input-value' readOnly placeholder="conversion value" />
            </form>
        </div>
        </section>
    );
}

export default CoinXChange;