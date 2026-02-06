<script setup>
defineProps({
  expenses: { type: Array, required: true }
});
defineEmits(['delete-expense']);
</script>

<template>
  <div class="list-section">
    <h3>History</h3>
    
    <table v-if="expenses.length > 0">
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in expenses" :key="item.id">
          <td>{{ new Date(item.id).toLocaleDateString() }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.category }}</td>
          <td style="font-weight: bold;">₦{{ item.amount }}</td>
          <td>
            <button class="del-btn" @click="$emit('delete-expense', item.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else class="empty-msg">No expenses recorded yet.</p>
  </div>
</template>

<style scoped>
.list-section { 
  margin-top: 2rem; 
}

table { 
  width: 100%; 
  border-collapse: collapse; 
  margin-top: 1rem; 
}

th, td { 
  padding: 12px; 
  text-align: left; 
  border-bottom: 1px solid #ddd;
  
  /* Default Text Color */
  color: #333; 
}

/* Make the amount stand out */
td.amount-col {
  font-weight: bold;
}

.del-btn { 
  background: #ff4d4d; 
  color: white; 
  border: none; 
  padding: 6px 12px; 
  border-radius: 4px; 
  cursor: pointer; 
}

.empty-msg { 
  text-align: center; 
  color: #888; 
  font-style: italic; 
  margin-top: 20px;
}

/* Dark Mode Overrides */
@media (prefers-color-scheme: dark) {
  th, td {
    color: #e0e0e0; /* Bright Grey Text for Dark Mode */
    border-bottom: 1px solid #444; /* Darker border lines */
  }
  
  .empty-msg {
    color: #aaa;
  }
}
</style>