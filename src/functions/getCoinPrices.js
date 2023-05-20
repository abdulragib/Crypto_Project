import React from 'react';
import axios from "axios";

const getCoinPrices = (id,days) => {
    const prices=axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`)
        .then((res) => {
            console.log("prices->", res.data.prices);
            return res.data.prices;
        }).catch((err) => {
        console.log("Error>>", err);
    })
    return prices;
};

export default getCoinPrices;
