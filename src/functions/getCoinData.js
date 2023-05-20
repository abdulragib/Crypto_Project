import React from 'react';
import axios from "axios";

const getCoinData = (id) => {
    const myData=axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
        .then((res) => {
            console.log("Response->", res);
            return res.data
        })
        .catch((err) => {
            console.log("Error>>", err);
        })
    return myData;
};

export default getCoinData;
