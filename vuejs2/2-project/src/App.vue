<template>
    <MyHeader />
    <div class="container">
        <Balance />
        <income-expenses />
        <TransactionList />
        <AddTransaction />
    </div>
</template>

<script>
    import MyHeader from './components/MyHeader.vue';
    import Balance from './components/Balance.vue';
    import IncomeExpenses from './components/IncomeExpenses.vue';
    import TransactionList from './components/TransactionList.vue';
    import AddTransaction from './components/AddTransaction.vue';
    export default {
        components: {
            MyHeader,
            Balance,
            IncomeExpenses,
            TransactionList,
            AddTransaction
        }
    }
</script>