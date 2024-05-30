<script setup>
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, BarElement, CategoryScale, Filler, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, BarElement, CategoryScale, Filler, TimeScale, annotationPlugin);

Chart.defaults.borderColor = 'black';

console.log(Chart.defaults);

const dates = [
    '2021-11-06', 
    '2021-11-17', 
    '2021-11-23', 
    '2021-11-29', 
    '2021-12-05', 
    '2021-12-16', 
    '2021-12-27', 
    '2021-12-29', 
    '2022-01-07', 
    '2022-01-17', 
    '2022-01-27'
];

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
            }
        },
        y: {
            ticks: {
                stepSize: 100,
                callback: function(val) {
                    return val % 500 === 0 ? this.getLabelForValue(val) : '';
                }
            },
            grid: {
                color: function(context) {
                    return context.tick && context.tick.value % 500 === 0 ? 'black' : 'lightgray';
                }
            }
        },
    },
    plugins: {
        annotation: {
            annotations: {
                box1: {
                    type: 'box',
                    xMin: '2022-01-15',
                    xMax: '2022-02-01',
                    yMin: -1000,
                    yMax: 1000,
                    backgroundColor: 'rgba(101, 33, 171, 0.5)',
                    borderWidth: 0,
                },
            }
        }
    }
};
const chartData = computed(() => {
    return {
        datasets: [
            {
                label: 'row 1',
                backgroundColor: 'white',
                borderColor: 'green',
                pointRadius: 0,
                tension: 0.1,
                // data: dates.map(entry => [entry, 5])
                data: dates.map(entry => [entry, (Math.random()*1000 + 100)])
            },
            {
                label: 'row 2',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'red',
                fill: true,
                pointRadius: 0,
                tension: 0.1,
                data: dates.map(entry => [entry, (Math.random()*(-500) - 500)])
            }
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
