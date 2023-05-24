import React, {useState} from "react";
import "./style.css"
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingUp";
import {IconButton, Tooltip} from "@mui/material";
import {convertNumber} from "../../../functions/convertNumber";
import {Link} from "react-router-dom";
import {hasBeenAdded} from "../../../functions/hasBeenAdded";
import {removeFromWatchlist} from "../../../functions/removeFromWatchlist";
import {addToWatchlist} from "../../../functions/addToWatchlist";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import {motion} from "framer-motion";


const List = ({coin, delay, isWatchlistPage}) => {
    const [added, setAdded] = useState(hasBeenAdded(coin.id));
    return (
        <Link to={`/coin/${coin.id}`}>
            <table className="list-t-body">
                <tbody className="list-b-body">
                <motion.tr style={{display: isWatchlistPage && !added && "none"}}
                           initial={{opacity: 0, x: -50}}
                           whileInView={{opacity: 1, x: 0}}
                           transition={{duration: 0.5, delay: delay}} className="list-row">
                    <Tooltip title="Coin Logo">
                        <td className="td-image">
                            <img src={coin.image} className="coin-logo" alt=""/>
                        </td>
                    </Tooltip>

                    <Tooltip title="Coin Info" placement="bottom-start">
                        <td>
                            <div className="name-col">
                                <p className="coin-symbol">{coin.symbol}</p>
                                <p className="coin-name">{coin.name}</p>
                            </div>
                        </td>
                    </Tooltip>

                    <Tooltip title="Price Change In 24Hrs" placement="bottom-start">
                        {coin.price_change_percentage_24h > 0
                            ? (
                                <td className="chip-flex td-center-align">
                                    <div className="price-chip">{coin.price_change_percentage_24h.toFixed(2)}%</div>
                                    <div className="icon-chip td-icon"><TrendingUpIcon/></div>
                                </td>
                            )
                            : (
                                <td className="chip-flex td-center-align">
                                    <div
                                        className="price-chip chip-red">{coin.price_change_percentage_24h.toFixed(2)}%
                                    </div>
                                    <div className="icon-chip chip-red td-icon"><TrendingDownIcon/></div>
                                </td>
                            )}
                    </Tooltip>
                    <Tooltip title="Current Price">
                        <td>
                            <h3 className="coin-price td-center-align"
                                style={{color: coin.price_change_percentage_24h > 0 ? "var(--green)" : "var(--red)"}}>
                                ${coin.current_price.toLocaleString()}
                            </h3>

                            <h3 className="coin-price td-center-align mobile-price"
                                style={{color: coin.price_change_percentage_24h > 0 ? "var(--green)" : "var(--red)"}}>
                                $
                                {convertNumber(
                                    coin.current_price < 1
                                        ? parseFloat(coin.current_price).toFixed(3)
                                        : parseInt(coin.current_price)
                                )}
                            </h3>
                        </td>
                    </Tooltip>
                    <Tooltip title="Total Volume" placement="bottom-end">
                        <td className="desktop-td-mkt">
                            <p className="total_volume td-right-align td-total-volume">{coin.total_volume.toLocaleString()}</p>
                        </td>
                    </Tooltip>
                    <Tooltip title="Market Cap" placement="bottom-end">
                        <td className="mobile-td-mkt">
                            <p className="total_volume td-right-align">
                                ${convertNumber(coin.market_cap)}
                            </p>
                        </td>
                    </Tooltip>
                    <td style={{width: "fit-content"}}>
                        <IconButton
                            onClick={(e) => {
                                e.preventDefault();
                                if (added) {
                                    removeFromWatchlist(coin.id);
                                    setAdded(false);
                                } else {
                                    addToWatchlist(coin.id);
                                    setAdded(true);
                                }
                            }}
                        >
                            {added ? (
                                <StarRoundedIcon
                                    className={`watchlist-icon ${
                                        coin.price_change_percentage_24h < 0 && "watchlist-icon-red"
                                    } `}
                                />
                            ) : (
                                <StarBorderRoundedIcon
                                    className={`watchlist-icon ${
                                        coin.price_change_percentage_24h < 0 && "watchlist-icon-red"
                                    } `}
                                />
                            )}
                        </IconButton>
                    </td>
                </motion.tr>
                </tbody>
            </table>
        </Link>
    )
}

export default List
