import React, {useState} from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {createTheme, ThemeProvider} from "@mui/material";
import Grid from "../Grid";
import './style.css'
import List from "../List";

function Tabs({coins,isWatchlistPage}) {
    const [value, setValue] = useState("grid");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const style = {
        color: "var(--white)",
        width: "50vw",
        fontSize: "1.2rem",
        fontWeight: 600,
        fontFamily: "Inter",
        textTransform: "capitalize",
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: "#3a80e9"
            }
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <div style={{color: "var(--white)"}}>
                <TabContext value={value}>
                    <TabList onChange={handleChange} variant="fullWidth">
                        <Tab label="Grid" value="grid" sx={style}/>
                        <Tab label="List" value="list" sx={style}/>
                    </TabList>
                    <TabPanel value="grid" variant="fullWidth" className="tabPanel">
                        <div className="grid-flex">
                            {/* For Api Error */}
                            {coins?.includes("Api Error") ? (
                                <div className="no-item">
                                    <h3 style={{color: "var(--white)", textAlign: "center"}}>
                                        Network Issue
                                        <div style={{marginTop: "1rem", height: "auto"}}>
                                            Please Try Again Later
                                        </div>
                                    </h3>
                                </div>
                            ) : coins?.length === 0 ?
                                (<div className="no-item"> {/* for filtered coin */}
                                    <h3 style={{color: "var(--white)"}}>
                                        No Items Found
                                    </h3>
                                    <button className='btn' onClick={() => window.location.reload()}>
                                        Clear Search
                                    </button>
                                </div>) :
                                (
                                    coins?.map((coin, i) => {
                                        if (coin) {
                                            return <Grid coin={coin} key={i}
                                                         delay={(i % 10) * 0.1}
                                                         isWatchlistPage={isWatchlistPage}/>
                                        }
                                    }))}
                        </div>
                    </TabPanel>
                    <TabPanel value="list" variant="fullWidth" className="tabPanel">
                        {/* For Api Error */}
                        {coins?.includes("Api Error") ? (
                            <div className="no-item list-no-item">
                                <h3 style={{color: "var(--white)", textAlign: "center"}}>
                                    Network Issue
                                    <div style={{marginTop: "1rem", height: "auto"}}>
                                        Please Try Again Later
                                    </div>
                                </h3>

                            </div>
                        ) : coins?.length === 0 ?
                            (<div className="no-item"> {/* for filtered coin */}
                                <h3 style={{color: "var(--white)"}}>
                                    No Items Found
                                </h3>
                                <button className='btn' onClick={() => window.location.reload()}>
                                    Clear Search
                                </button>
                            </div>) :
                            (
                                coins?.map((coin, i) => {
                                    if (coin) {
                                        return <List
                                            coin={coin} key={i}
                                            delay={(i % 10) * 0.1}
                                            isWatchlistPage={isWatchlistPage}/>
                                    }
                                }))}
                    </TabPanel>
                </TabContext>
            </div>
        </ThemeProvider>
    );
}

export default Tabs;

