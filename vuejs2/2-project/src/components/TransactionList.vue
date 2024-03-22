<template>
    <h3>History</h3>
    <ul id="list" class="list">
        <li
            v-for="transaction in transactions"
            :key="transaction.id"
            :class="transaction.amount < 0 ? 'minus' : 'plus'"
        >
            <span>{{ transaction.text }}</span>
            <span>
                {{ transaction.amount < 0 ? '-' : '' }}${{ Math.abs(transaction.amount) }}
            </span>
            <!-- <button @click="deleteTransaction(transaction.id)" class="delete-btn">x</button> -->
            <button @click="emit('transctionDeleted', transaction.id)" class="delete-btn">x</button>
        </li>
    </ul>
</template>

<script setup>
// import { defineProps } from 'vue';

const emit = defineEmits(['transctionDeleted']);

defineProps({
    transactions: {
        type: Array,
        required: true
    }
});

// function deleteTransaction(id) {
//     emit('transctionDeleted', id);
// }
</script>