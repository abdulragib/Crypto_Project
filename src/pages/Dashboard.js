import Header from "../components/Common/Header";
import Tabs from "../components/Dashboard/Tabs";
import Search from "../components/Dashboard/Search";
import React, {useEffect, useState} from "react";
import axios from "axios";
import PaginationComponent from "../components/Dashboard/Pagination";
import Loader from "../components/Common/Loader";
import BackToTop from "../components/Common/BackToTop";

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

    useEffect(() => {
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en\n")
            .then((res) => {
                setCoins(res.data);
                setPaginatedCoins(res.data.slice(0, 10));
                setIsLoading(false);
            })
            .catch((err) => {
                console.log("Error>>", err);
                setApiError(true);
                setIsLoading(false)
            })
    }, []);

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
