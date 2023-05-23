import Header from "../components/Common/Header";
import Tabs from "../components/Dashboard/Tabs";
import Search from "../components/Dashboard/Search";
import React, {useEffect, useState} from "react";
import axios from "axios";
import PaginationComponent from "../components/Dashboard/Pagination";
import Loader from "../components/Common/Loader";
import BackToTop from "../components/Common/BackToTop";
import {get100Coins} from "../functions/get100Coins";

const Dashboard = () => {
    const [coins, setCoins] = useState([]);
    const [paginatedCoins, setPaginatedCoins] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [apiError, setApiError] = useState(false);

    const onSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1);
    }

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    // for Api Calling
    useEffect(() => {
        getData();
    }, []);

    const getData = async() => {
        const myCoins=await get100Coins();
        if(myCoins.length>0)
        {
            setCoins(myCoins);
            setPaginatedCoins(myCoins.slice(0, 10));
            setIsLoading(false);
        }
        else{
            setApiError(true);
            setIsLoading(false)
        }
    }

    // for pagination
    useEffect(() => {
        var previousIndex = (page - 1) * 10;
        setPaginatedCoins(coins.slice(previousIndex, previousIndex + 10));
    }, [page, coins]);

    var filteredCoins = coins.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())
        || item.symbol.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <Header/>
            <BackToTop/>
            {isLoading ? <Loader/> :
                (
                    <div>
                        <Search search={search} onSearchChange={onSearchChange}/>
                        <Tabs coins={search ? filteredCoins : (apiError ? ["Api Error"] : paginatedCoins)}/>
                        {!search && !apiError && <PaginationComponent page={page} handlePageChange={handlePageChange}/>}
                    </div>
                )
            }
        </>
    )
}

export default Dashboard
