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
import SelectDays from "../components/Coin/SelectDays";
import {settingChartData} from "../functions/settingChartData";

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
        setIsLoading(true);
        const data = await getCoinData(id);
        if (data) {
            coinObject(setCoinData, data); //For Coin Obj being passed in the List
            const prices = await getCoinPrices(id, days);
            if (prices) {
                settingChartData(setChartData, prices, data);
                setIsLoading(false);
            }
        }
    }

    const handleDaysChange = async (event) => {
        setIsLoading(true);
        setDays(event.target.value);
        const prices = await getCoinPrices(id, event.target.value);
        if (prices.length > 0) {
            settingChartData(setChartData, prices)
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Header/>
            {isLoading ? <Loader/> :
                <>
                    <div className="grey-wrapper" style={{padding:"0rem 1rem"}}>
                        <List coin={coinData}/>
                    </div>
                    <div className="grey-wrapper">
                        <SelectDays days={days} handleDaysChange={handleDaysChange}/>
                        <LineChart chartData={chartData}/>
                    </div>
                    <CoinInfo heading={coinData.name} desc={coinData.desc}/>
                </>
            }
        </div>
    )
}

export default Coin