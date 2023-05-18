import React,{useState} from 'react';
import './style.css'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
function Search({search,onSearchChange}){
    return <div className='search-flex'>
        <SearchRoundedIcon className="search-icon"/>
        <input type="text" placeholder="Search" className="search-input" value={search} onChange={(e)=>onSearchChange(e)}/>
    </div>
}

export default Search;