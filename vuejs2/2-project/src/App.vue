<template>
    <MyHeader />
    <div class="container">
        <Balance />
        <income-expenses />
        <TransactionList :transactions="transactions" />
        <AddTransaction />
    </div>
</template>

<script setup>
    import { ref } from 'vue';

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
</script>