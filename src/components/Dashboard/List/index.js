import React from "react";
import "./style.css"
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingUp";
import {Tooltip} from "@mui/material";
import {convertNumber} from "../../../functions/convertNumber";

const List = ({coin}) => {
    return (
        <tr className="list-row">

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
                            <div className="price-chip chip-red">{coin.price_change_percentage_24h.toFixed(2)}%</div>
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
                </td>
            </Tooltip>
            <Tooltip title="Total Volume" placement="bottom-start">
                <td className="desktop-td-mkt">
                    <p className="total_volume td-right-align td-total-volume">{coin.total_volume.toLocaleString()}</p></td>
            </Tooltip>
            <Tooltip title="Market Cap" placement="bottom-start">
                <td className="mobile-td-mkt">
                    <p className="total_volume td-right-align">
                        ${convertNumber(coin.market_cap)}
                    </p>
                </td>
            </Tooltip>
        </tr>
    )
}

export default List
