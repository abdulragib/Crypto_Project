import {convertDate} from "./convertData";

export const settingChartData=(setChartData,prices)=>{
    setChartData({
        labels: prices.map((price)=> convertDate(price[0])),
        datasets: [{
            label:"First Data Set",
            data: prices.map((price)=> (price[1])),
            backgroundColor: "rgba(58, 128, 233, 0.1)",
            borderColor: "#3a80e9",
            tension:0.25,
            fill:true,
            borderWidth:2,
            pointRadius:0,
        }]
    });

}