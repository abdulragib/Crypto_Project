import React from 'react';
import {Line} from "react-chartjs-2";
import {CategoryScale, Chart as ChartJs, Legend, LinearScale, LineElement, Title, Tooltip,PointElement,Filler} from 'chart.js'; //Don't get rid of this
ChartJs.register(
    Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale,PointElement,Filler
)

const LineChart = ({chartData, priceType, multiAxis}) => {
    const options = {
        plugins: {
            legend: {
                display: multiAxis ? true : false,
            },
        },

        responsive: true,
        interaction: {
            mode: "index",
            intersect: false,
        }
    };
    return <Line data={chartData} options={options}/>
};


export default LineChart;
