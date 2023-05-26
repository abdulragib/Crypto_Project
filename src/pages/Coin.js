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
import TogglePriceType from "../components/Coin/PriceType";
import Footer from "../components/Common/Footer";

const Coin = () => {
    const {id} = useParams();
    const [coinData, setCoinData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [days, setDays] = useState(60);
    const [chartData, setChartData] = useState({});
    const [priceType, setPriceType] = useState('prices');

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
            const prices = await getCoinPrices(id, days, priceType);
            if (prices) {
                settingChartData(setChartData, prices, data);
                setIsLoading(false);
            }
        }
    }

    const handleDaysChange = async (event) => {
        setIsLoading(true);
        setDays(event.target.value);
        const prices = await getCoinPrices(id, event.target.value, priceType);
        if (prices.length > 0) {
            settingChartData(setChartData, prices)
            setIsLoading(false);
        }
    };

    const handlePriceTypeChange = async (event, newType) => {
        setIsLoading(true);
        setPriceType(newType);
        const prices = await getCoinPrices(id, days, newType);
        if (prices.length > 0) {
            settingChartData(setChartData, prices)
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Header/>
            {isLoading ? <Loader/> :
                <div className="list-header-flex" style={{overflowX:"hidden",marginTop:"5rem"}}>
                    <div className="grey-wrapper grey-wrapper-compare-list-mb" style={{padding: "0rem 1rem"}}>
                        <List coin={coinData}/>
                    </div>
                    <div className="grey-wrapper">
                        <SelectDays days={days} handleDaysChange={handleDaysChange}/>
                        <TogglePriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange}/>
                        <LineChart chartData={chartData} priceType={priceType} multiAxis={false}/>
                    </div>
                    <CoinInfo heading={coinData.name} desc={coinData.desc}/>
                    <Footer marginTop={"3rem"}/>
                </div>
            }
        </div>
    )
}

export default Coin