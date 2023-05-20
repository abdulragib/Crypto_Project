import {useParams} from 'react-router-dom'
import {useEffect, useState} from "react";
import axios from "axios";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import {coinObject} from "../functions/coinObject";
import List from "../components/Dashboard/List";
import CoinInfo from "../components/Coin/CoinInfo";

const Coin = () => {
    const {id} = useParams();
    const [coinData, setCoinData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [days, setDays] = useState(30);
    useEffect(() => {
        if (id) {
            axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
                .then((res) => {
                    console.log("Response->", res);
                    coinObject(setCoinData, res.data);
                    setIsLoading(false)
                })
                .catch((err) => {
                    console.log("Error>>", err);
                    setIsLoading(false)
                })

            axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`)
                .then((res) => {
                        console.log("prices->", res.data.prices);
                }).catch((err) => {
                console.log("Error>>", err);
                setIsLoading(false)
            })
        }
    }, [id]);
    return (
        <div>
            <Header/>
            {isLoading ? <Loader/> :
                <>
                    <div className="grey-wrapper">
                        <List coin={coinData}/>
                    </div>
                    <CoinInfo heading={coinData.name} desc={coinData.desc}/>
                </>
            }
        </div>
    )
}

export default Coin