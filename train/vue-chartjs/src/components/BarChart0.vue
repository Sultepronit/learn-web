<script setup>
import { ref, computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
};

const myData = ref([11, 22, 44]);

const chartData = ref({
    labels: [ 'January', 'February', 'March' ],
    datasets: [
        {
            data: [40, 55, 12]
            // data: myData.value // still not reactive!
        }
    ]
});

setTimeout(() => {
    chartData.value.datasets[0].data[1] = 31;
    console.log(chartData.value.datasets[0].data);

    myData.value[1] = 77;
}, 2000);

const chartData2 = computed(() => {
    return {
        labels: [ 'January', 'February', 'March' ],
        datasets: [
            {
                data: myData.value.map(entry => entry)
            }
        ]
    }
});

</script>

<template>
    <Bar
        id="chart-id"
        :options="chartOptions"
        :data="chartData2"
    />
</template>

<style scoped>

</style>
