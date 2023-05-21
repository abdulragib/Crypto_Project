import {useParams} from 'react-router-dom'
import {useEffect, useState} from "react";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import {coinObject} from "../functions/coinObject";
import List from "../components/Dashboard/List";
import CoinInfo from "../components/Coin/CoinInfo";
import getCoinData from "../functions/getCoinData";
import getCoinPrices from "../functions/getCoinPrices";
import LineChart from "../components/Coin/LineChart";

const Coin = () => {
    const {id} = useParams();
    const [coinData, setCoinData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [days, setDays] = useState(30);
    const [chartData, setChartData] = useState({});
    useEffect(() => {
        if (id) {
            getData()
        }
    }, [id]);

    async function getData() {
        const data = await getCoinData(id);

        if (data) {
            coinObject(setCoinData, data);
            const prices = await getCoinPrices(id, days);

            if (prices.length > 0) {
                console.log("Got Prices from API");

                setChartData({
                    labels: ["Mon","Tue","Wed","Thur","Fri"],
                    datasets: [{
                        label:"First Data Set",
                        data: [65, 59, 80, 81, 56],
                        backgroundColor: "transparent",
                        borderColor: "#3a80e9",
                    }]
                });

                setIsLoading(false);
            }
        }
    }

    return (
        <div>
            <Header/>
            {isLoading ? <Loader/> :
                <>
                    <div className="grey-wrapper">
                        <List coin={coinData}/>
                    </div>
                    <div className="grey-wrapper">
                        <LineChart chartData={chartData}/>
                    </div>
                    <CoinInfo heading={coinData.name} desc={coinData.desc}/>
                </>
            }
        </div>
    )
}

export default Coin