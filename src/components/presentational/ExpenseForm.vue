<script setup>
import { ref } from 'vue';

// 1. Define the event we will send to the parent
const emit = defineEmits(['create-expense']);

// 2. Create variables to hold the user's input
const description = ref('');
const amount = ref('');
const date = ref('');
const category = ref('Food');

// 3. The function that runs when you click "Add Expense"
const handleSubmit = () => {
  // Validate that inputs aren't empty
  if (!description.value ||!amount.value || !date.value) return;

  // Bundle the data into an object
  const expenseData = {
    id: Date.now(), // simple unique ID based on time
    description: description.value,
    amount: parseFloat(amount.value),
    date: date.value,
    category: category.value,
  };

  // Send this data up to the parent component
  emit('create-expense', expenseData);

  // Clear the form
  description.value = '';
  amount.value = '';
  date.value = '';
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="expense-form">
    <h3>Add New Expense</h3>
    
    <div class="form-group">
      <label>Description:</label>
      <input v-model="description" type="text" placeholder="e.g. Lunch" required />
    </div>

    <div class="form-group">
      <label>Amount:</label>
      <input v-model="amount" type="number" step="0.01" placeholder="0.00" required />
    </div>

    <div class="form-group">
      <label>Date:</label>
      <input v-model="date" type="date" required />
    </div>

    <div class="form-group">
      <label>Category:</label>
      <select v-model="category">
        <option>Food</option>
        <option>Transport</option>
        <option>Entertainment</option>
        <option>Utilities</option>
        <option>Other</option>
      </select>
    </div>

    <button type="submit">Add Expense</button>
  </form>
</template>

<style scoped>
.expense-form {
  background: #2a2a2a;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #444;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  color: #aaa;
}
input, select {
  width: 100%;
  padding: 8px;
  background: #1a1a1a;
  border: 1px solid #444;
  color: white;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
button:hover {
  background-color: #3aa876;
}
h3 {
  margin-top: 0;
  color: white;
}
</style>