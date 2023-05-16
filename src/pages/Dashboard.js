import Header from "../components/Common/Header";
import Tabs from "../components/Dashboard/Tabs";
import React,{useState,useEffect} from "react";
import axios from "axios";

const Dashboard = () => {
    const [coins,setCoins] = useState([])

    useEffect(() => {
       axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en\n")
            .then((res)=>{
                console.log("Response>>",res);
                setCoins(res.data);
            })
            .catch((err)=>{
                   console.log("Error>>",err);
               })
    }, []);

    return (
        <div>
             <Header/>
             <Tabs coins={coins}/>
        </div>
    )
}

export default Dashboard
