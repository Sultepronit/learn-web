<script setup>
import { ref, computed } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, BarElement, CategoryScale, Filler } from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, BarElement, CategoryScale, Filler);

const chartOptions = {
    responsive: true,
    // maintainAspectRatio: false
};

const myData = ref([11, 22, 44]);
const row2 = [5, 30, 11];

const chartData = computed(() => {
    return {
        labels: [ 'January', 'February', 'March' ],
        datasets: [
            {
                label: 'row 1',
                backgroundColor: 'yellow',
                borderColor: 'green',
                pointRadius: 0,
                tension: 0.1,
                data: myData.value.map(entry => entry)
            },
            {
                label: 'row 2',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'blue',
                fill: true,
                pointRadius: 0,
                tension: 0.1,
                data: row2.map(entry => entry)
            }
        ]
    }
});

setTimeout(() => {
    chartData.value.datasets[0].data[1] = 31;
    console.log(chartData.value.datasets[0].data);

    myData.value[1] = 77;
    row2[0] = 9;
}, 2000);

</script>

<template>
    <Line
        :options="chartOptions"
        :data="chartData"
    />
</template>

<style scoped>

</style>
