import React from 'react';
import axios from "axios";

const getCoinPrices = (id,days,priceType) => {
    const prices=axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`)
        .then((res) => {
            console.log("getCoinPrices->", res.data[priceType]);
            return res.data[priceType];
        }).catch((err) => {
        console.log("Error>>", err);
    })
    return prices;
};

export default getCoinPrices;
