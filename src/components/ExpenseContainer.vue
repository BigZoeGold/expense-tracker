<script setup>
import { ref, computed, watch } from 'vue'; 
import ExpenseForm from './presentational/ExpenseForm.vue';
import ExpenseList from './presentational/ExpenseList.vue';
import PieChart from './presentational/PieChart.vue';
import { expenseStorage } from '../services/expenseStorage';

// 1. Load Data
const expenses = ref(expenseStorage.load());

// 2. CALCULATE TOTAL (The New Feature)
const totalSpending = computed(() => {
  return expenses.value.reduce((sum, item) => sum + Number(item.amount), 0);
});

// 3. Add Expense
const handleAddExpense = (newExpense) => {
  expenses.value.push({
    id: Date.now(), 
    ...newExpense
  });
};

// 4. Delete Expense
const handleDelete = (id) => {
  expenses.value = expenses.value.filter(item => item.id !== id);
};

// 5. Auto-Save
watch(expenses, (newVal) => {
  expenseStorage.save(newVal);
}, { deep: true });
</script>

<template>
  <div class="container">
    <h1>Expense Tracker</h1>

    <div class="total-card">
      <h3>Total Spent</h3>
      <div class="total-amount">₦{{ totalSpending.toLocaleString() }}</div>
    </div>

    <ExpenseForm @create-expense="handleAddExpense" />

    <PieChart :expenses="expenses" />
    
    <ExpenseList 
      :expenses="expenses" 
      @delete-expense="handleDelete" 
    />
  </div>
</template>

<style scoped>
.container { 
  max-width: 800px; 
  margin: 0 auto; 
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  padding: 2rem;
}

h1 { text-align: center; color: #333; margin-bottom: 1.5rem; }

/* Styles for the new Total Card */
.total-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); /* Purple Gradient */
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 2rem;
  box-shadow: 0 4px 10px rgba(118, 75, 162, 0.3);
}

.total-card h3 { margin: 0; font-size: 1.1rem; opacity: 0.9; font-weight: normal; }
.total-amount { font-size: 2.5rem; font-weight: bold; margin-top: 0.5rem; }

/* Dark Mode Overrides */
@media (prefers-color-scheme: dark) {
  .container {
    background: #1e1e1e; 
    box-shadow: 0 4px 15px rgba(0,0,0,0.5);
  }
  h1 { color: #ffffff; }
}
</style>