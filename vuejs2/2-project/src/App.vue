<template>
    <MyHeader />
    <div class="container">
        <Balance :total="total" />
        <income-expenses :income="income" :expenses="expenses" />
        <TransactionList :transactions="transactions" />
        <AddTransaction />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

import MyHeader from './components/MyHeader.vue';
import Balance from './components/Balance.vue';
import IncomeExpenses from './components/IncomeExpenses.vue';
import TransactionList from './components/TransactionList.vue';
import AddTransaction from './components/AddTransaction.vue';
/* export default {
    components: {
        MyHeader,
        Balance,
        IncomeExpenses,
        TransactionList,
        AddTransaction
    }
} */

const transactions = ref([
    { id: 1, text: 'Flower', amount: -19.99 },
    { id: 2, text: 'Salary', amount: 30.5 }
]);

const total = computed(() => {
    return transactions.value.reduce((acc, transaction) => {
        return acc + transaction.amount;
    }, 0);
});

const income = computed(() => {
    return transactions.value.reduce((acc, transaction) => {
        return transaction.amount > 0 ? acc + transaction.amount : acc;
    }, 0);
});
// console.log(income.value);

const expenses = computed(() => {
    return transactions.value.reduce((acc, transaction) => {
        return transaction.amount < 0 ? acc - transaction.amount : acc;
    }, 0);
});
// console.log(expenses.value);
</script>