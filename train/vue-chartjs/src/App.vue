<script setup>
import BarChart0 from '@/components/BarChart0.vue';
import LineChart0 from '@/components/LineChart0.vue';
import DateChart0 from '@/components/DateChart0.vue';
import DateChart1 from '@/components/DateChart1.vue';
</script>

<template>
    <div id="bar-chart">
        <BarChart0 />
    </div>
    <LineChart0 />
    <DateChart0 />
    <DateChart1 />
</template>

<style scoped>
#bar-chart {
    height: 250px;
}
</style>
