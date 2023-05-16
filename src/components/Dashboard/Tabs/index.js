import React,{useState} from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {createTheme, ThemeProvider} from "@mui/material";

function Tabs({coins}) {
    const [value, setValue] = useState("grid");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

const style={
    color:"var(--white)",
    width:"50vw",
    fontSize:"1.2rem",
    fontWeight:600,
    fontFamily:"Inter",
    textTransform:"capitalize",
}

const theme=createTheme({
    palette:{
        primary:{
            main:"#3a80e9"
        }
    }
})

    return (
        <ThemeProvider theme={theme}>
        <div style={{color:"var(--white)"}}>
            <TabContext value={value}>
                    <TabList onChange={handleChange} variant="fullWidth">
                        <Tab label="Grid" value="grid" sx={style}/>
                        <Tab label="List" value="list" sx={style}/>
                    </TabList>
                <TabPanel value="grid">
                    <div>{coins.map((item,i)=>{
                        return(
                            <div>
                                <img src={item.image} alt={item.name} style={{width:"50px",height:"50px"}}/>
                                <p key={i}>
                                    {i+1}.{item.name}
                                </p>
                            </div>
                        )
                    })}</div>
                </TabPanel>
                <TabPanel value="list">
                    mapping for lists
                </TabPanel>
            </TabContext>
        </div>
        </ThemeProvider>
    );
}

export default Tabs;

