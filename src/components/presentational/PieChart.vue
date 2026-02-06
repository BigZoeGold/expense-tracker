<script setup>
import { computed } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// 1. Register the Chart tools we need
ChartJS.register(ArcElement, Tooltip, Legend);

// 2. Receive the expenses data
const props = defineProps({
  expenses: {
    type: Array,
    required: true
  }
});

// 3. Transform the data for the Chart
const chartData = computed(() => {
  // A. Group amounts by category
  const totals = {};
  
  props.expenses.forEach(item => {
    if (totals[item.category]) {
      totals[item.category] += Number(item.amount);
    } else {
      totals[item.category] = Number(item.amount);
    }
  });

  // B. Return the format Chart.js expects
  return {
    labels: Object.keys(totals),
    datasets: [
      {
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        data: Object.values(totals)
      }
    ]
  };
});

// 4. Make it look pretty (Options)
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
};
</script>

<template>
  <div class="chart-container" v-if="expenses.length > 0">
    <h3>Spending Breakdown</h3>
    <div class="chart-wrapper">
      <Pie :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  background: white;
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.chart-wrapper {
  height: 300px; /* Limits the size so it doesn't fill the screen */
  position: relative;
}
</style>