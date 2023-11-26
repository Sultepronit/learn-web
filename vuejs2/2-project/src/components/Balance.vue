<template>
    <h4>Your balance</h4>
    <h1 id="balance">${{ total.toFixed(2) }}</h1>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    total: {
        type: Number,
        required: true
    }
});
</script>