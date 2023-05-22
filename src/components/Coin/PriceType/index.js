import React,{useState} from 'react';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './style.css';

export default function TogglePriceType({price,handlePriceTypeChange}) {


    return (
        <div className="toggle-prices">
        <ToggleButtonGroup
            value={price}
            exclusive
            onChange={handlePriceTypeChange}
            aria-label="text alignment"
            sx={{"& .Mui-selected":{
              color:"var(--blue ) !important"},

                borderColor:"var(--blue )",
                border:"unset !important",
                "& .MuiToggleButtonGroup-grouped":{
                border:"1px solid !important",
                    borderColor:"unset",
                    color:"var(--blue)",
            },
            "& .MuiToggleButton-standard":{
                color:"var(--blue)",
            }
            }}
        >
            <ToggleButton value="prices" className="toggle-btn">
                Price
            </ToggleButton>
            <ToggleButton value="market_caps" className="toggle-btn">
                Market Cap
            </ToggleButton>
            <ToggleButton value="total_volumes" className="toggle-btn">
                Total Volume
            </ToggleButton>
        </ToggleButtonGroup>
        </div>
    );
}