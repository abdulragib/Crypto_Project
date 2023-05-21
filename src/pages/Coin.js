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
import {convertDate} from "../functions/convertData";

const Coin = () => {
    const {id} = useParams();
    const [coinData, setCoinData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [days, setDays] = useState(60);
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
                    labels: prices.map((price)=> convertDate(price[0])),
                    datasets: [{
                        label:"First Data Set",
                        data: prices.map((price)=> (price[1])),
                        backgroundColor: "rgba(58, 128, 233, 0.1)",
                        borderColor: "#3a80e9",
                        tension:0.25,
                        fill:true,
                        borderWidth:2,
                        pointRadius:0,
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