<template>
    <MyHeader />
    <div class="container">
        <Balance :total="total" />
        <income-expenses :income="+income" :expenses="+expenses" />
        <TransactionList
            :transactions="transactions"
            @transction-deleted="handleDelete"
        />
        <AddTransaction @transaction-submitted="handleNewTransaction" />
    </div>
</template>

<script setup>
import MyHeader from './components/MyHeader.vue';
import Balance from './components/Balance.vue';
import IncomeExpenses from './components/IncomeExpenses.vue';
import TransactionList from './components/TransactionList.vue';
import AddTransaction from './components/AddTransaction.vue';

import { ref, computed, onMounted, watch } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const transactions = ref([]);

// onMounted(() => {
//     const saved = JSON.parse(localStorage.getItem('transactions'));
//     if(saved) {
//         transactions.value = saved;
//     }
// });

const saved = JSON.parse(localStorage.getItem('transactions'));
if(saved) {
    transactions.value = saved;
}

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

function generateId() {
    const id = Math.floor(Math.random() * 1000000);
    console.log(id);
    return id;
}

function handleNewTransaction(transactionData) {
    console.log(transactionData);
    transactions.value.push({
        id: generateId(),
        ...transactionData
    });

    toast.success('Transaction added');
}

function handleDelete(id) {
    console.log(id);
    transactions.value = transactions.value.filter(
        transaction => transaction.id !== id
    );

    toast.success('Transaction deleted');
}

// function saveToLocalStorage() {
//     localStorage.setItem('transactions', JSON.stringify(transactions.value));
// }
watch(transactions, () => {
    localStorage.setItem('transactions', JSON.stringify(transactions.value));
    console.log('updated db!');
}, { deep: true });
</script>