import React, { useEffect, useState } from "react";
import Button from "../components/Common/Button";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import Tabs from "../components/Dashboard/Tabs";
import { get100Coins } from "../functions/get100Coins";
import Footer from "../components/Common/Footer";
function Watchlist() {
    const coins = JSON.parse(localStorage.getItem("watchlist"));
    const [myWatchlist, setMyWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setLoading(true)
        try {
            const allCoins = await get100Coins();
            if (coins) {
                setMyWatchlist(allCoins?.filter((item) => coins.includes(item.id)));
            }
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    };

    return (
        <div>
            { (
                <div style={{ minHeight: "90vh" }}>
                    {myWatchlist?.length === 0 || !coins ? (
                        <div>
                            <Header />
                            <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
                                No Items in the Watchlist
                            </h1>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <a href="/dashboard">
                                    <Button text={"Dashboard"} />
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div style={{ height: "95vh" }}>
                            <Header />
                            <Tabs coins={myWatchlist} isWatchlistPage={true} />
                            {loading || !coins ? (
                                <Loader />): null}
                            <Footer marginTop={"30rem"}/>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Watchlist;
