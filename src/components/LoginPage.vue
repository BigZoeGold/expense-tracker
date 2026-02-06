<script setup>
import { ref, watch } from 'vue';

// 1. Import your presentation components
// (Make sure these paths match where you actually put the files)
import ExpenseForm from './presentational/ExpenseForm.vue';
import ExpenseList from './presentational/ExpenseList.vue';

// 2. Import the Storage Service
// NOTE: If your screen is blank, try changing '../services' to './services'
import { expenseStorage } from '../services/expenseStorage';

// 3. Initialize expenses by loading from storage
// If storage is empty, the service returns [] automatically.
const expenses = ref(expenseStorage.load());

// 4. Handle adding a new expense
const handleAddExpense = (newExpense) => {
  expenses.value.push(newExpense);
};

// 5. Watch for changes and Auto-Save
watch(expenses, (newVal) => {
  expenseStorage.save(newVal);
}, { deep: true });

</script>

<template>
  <div class="expense-container">
    <h1>Expense Tracker</h1>
    
    <ExpenseForm @create-expense="handleAddExpense" />

    <ExpenseList :expenses="expenses" />
  </div>
</template>

<style scoped>
.expense-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}
</style>