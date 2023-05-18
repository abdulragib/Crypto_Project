import Header from "../components/Common/Header";
import Tabs from "../components/Dashboard/Tabs";
import Search from "../components/Dashboard/Search";
import React, {useEffect, useState} from "react";
import axios from "axios";

const Dashboard = () => {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");

    const onSearchChange = (e) => {
        console.log(e.target.value);
        setSearch(e.target.value);
    }

    useEffect(() => {
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en\n")
            .then((res) => {
                console.log("Response>>", res);
                setCoins(res.data);
            })
            .catch((err) => {
                console.log("Error>>", err);
            })
    }, []);

    var filteredCoins = coins.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())
        || item.symbol.toLowerCase().includes(search.toLowerCase()));

    console.log("Filtered Coins>>", filteredCoins)
    return (
        <div>
            <Header/>
            <Search search={search} onSearchChange={onSearchChange}/>
            <Tabs coins={filteredCoins}/>
        </div>
    )
}

export default Dashboard
