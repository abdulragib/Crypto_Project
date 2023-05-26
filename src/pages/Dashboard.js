import Header from "../components/Common/Header";
import Tabs from "../components/Dashboard/Tabs";
import Search from "../components/Dashboard/Search";
import React, {useEffect, useState} from "react";
import PaginationComponent from "../components/Dashboard/Pagination";
import Loader from "../components/Common/Loader";
import BackToTop from "../components/Common/BackToTop";
import {get100Coins} from "../functions/get100Coins";
import Footer from "../components/Common/Footer";

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
        try{
            setCoins(myCoins);
            setPaginatedCoins(myCoins.slice(0, 10));
            setIsLoading(false);
        }
        catch(error){
            console.log(error)
            setApiError(true);
            setIsLoading(false)
        }
    }

    // for pagination
    useEffect(() => {
        var previousIndex = (page - 1) * 10;
        if(!apiError)
        {
            setPaginatedCoins(coins.slice(previousIndex, previousIndex + 10));
        }
    }, [page, coins]);

    if(!apiError)
    {
        var filteredCoins = coins.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())
            || item.symbol.toLowerCase().includes(search.toLowerCase()));
    }


    return (
        <>
            <Header/>
            <BackToTop/>
            {isLoading ? <Loader/> :
                (
                    <div style={{overflowX:"hidden"}}>
                        <Search search={search} onSearchChange={onSearchChange}/>
                        <Tabs coins={search ? filteredCoins : (apiError ? ["Api Error"] : paginatedCoins)}/>
                        {!search && !apiError && <PaginationComponent page={page} handlePageChange={handlePageChange}/>}
                    </div>
                )
            }
            <Footer marginTop={"3rem"}/>
        </>
    )
}

export default Dashboard
