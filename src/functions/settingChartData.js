import {convertDate} from "./convertData";

export const settingChartData=(setChartData,prices1,prices2)=>{
    if(Array.isArray(prices2)){
        setChartData({
            labels: prices1.map((price)=> convertDate(price[0])),
            datasets: [{
                label:"Crypto1",
                data: prices1.map((price)=> (price[1])),
                borderColor: "#3a80e9",
                tension:0.25,
                fill:false,
                borderWidth:2,
                pointRadius:0,
                yAxisID:'crypto1'
            },
                {
                    label:"Crypto2",
                    data: prices2.map((price)=> (price[1])),
                    borderColor: "#61c96f",
                    tension:0.25,
                    fill:false,
                    borderWidth:2,
                    pointRadius:0,
                    yAxisID: `crypto2`
                }]
        });
    }else{
        setChartData({
            labels: prices1.map((price)=> convertDate(price[0])),
            datasets: [{
                data: prices1.map((price)=> (price[1])),
                borderColor: "#3a80e9",
                tension:0.25,
                fill:true,
                backgroundColor: "rgba(58, 128, 233, 0.1)",
                borderWidth:2,
                pointRadius:0,
                yAxisID:"crypto1"
            }]
        });
    }

}