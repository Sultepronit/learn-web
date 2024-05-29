<script setup>
import { ref, computed } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, BarElement, CategoryScale, Filler, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, BarElement, CategoryScale, Filler, TimeScale);

function isFirstDateOfMoth(dateText) {
    const date = new Date(dateText);
    console.log(date.getDate());
    return (new Date(dateText)).getDate() === 1;
}

const chartOptions = {
    responsive: true,
    // maintainAspectRatio: false
    scales: {
        x: {
            type: 'time',
            min: '2021-11-01',
            max: '2022-02-01',
            time: {
                unit: 'month',
                // unit: 'day',
                // unit: 'week',
                // displayFormats: {
                //     // month: 'MM/yy',
                //     day: 'dd'
                // },
                // tooltipFormat: 'PP'
            },
            grid: {
                // color: function(context) {
                //     return context.tick && context.tick.major ? 'black' : 'gray';
                // }
                color: 'black'
            },
            ticks: {
                autoSkip: false,
                // maxTicksLimit: 191,
                // minTcksLimit: 30,
                // major: {
                //     // enabled: true
                // },
                // font: function(context) {
                //     return context.tick && context.tick.major ? { weight: 'bold' } : {};
                // }
                // callback: function(val, index) {
                //     console.log(val, index);
                //     console.log(this.getLabelForValue(val));
                //     // return index % 2 === 0 ? this.getLabelForValue(val) : '';
                //     // return isFirstDateOfMoth(val) ? this.getLabelForValue(val) : '';
                //     // return isFirstDateOfMoth(val) ? 'm' : (new Date(val)).getDate();
                //     return isFirstDateOfMoth(val) ? 'mm' : '';
                    
                // }
            }
        }
    }
};
const chartData = computed(() => {
    return {
        // labels: [ 'January', 'February', 'March' ],
        datasets: [
            {
                label: 'row 1',
                backgroundColor: 'yellow',
                borderColor: 'green',
                pointRadius: 0,
                tension: 0.1,
                // data: myData.value.map(entry => entry)
                data: [
                    { x: '2021-11-06', y: 50 },
                    { x: '2021-12-07', y: 60 },
                    { x: '2021-12-13', y: 60 },
                    { x: '2021-12-14', y: 70 },
                    { x: '2021-12-15', y: 60 },
                    { x: '2021-12-16', y: 70 },
                    { x: '2021-12-17', y: 60 },
                    { x: '2021-12-18', y: 70 },
                    { x: '2021-12-19', y: 60 },
                    { x: '2021-12-20', y: 70 },
                    { x: '2022-01-17', y: -20 }
                ]
            },
            // {
            //     label: 'row 2',
            //     backgroundColor: 'rgba(255, 99, 132, 0.2)',
            //     borderColor: 'blue',
            //     fill: true,
            //     pointRadius: 0,
            //     tension: 0.1,
            //     data: row2.map(entry => entry)
            // }
        ]
    }
});

</script>

<template>
    <Line
        :options="chartOptions"
        :data="chartData"
    />
</template>

<style scoped>

</style>
