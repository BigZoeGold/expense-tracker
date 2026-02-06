<script setup>
import ExpenseContainer from './components/ExpenseContainer.vue';
</script>

<template>
  <div class="app-wrapper">
    <ExpenseContainer />
  </div>
</template>

<style>
/* 1. Base Styles (Light Mode Default) */
body { 
  margin: 0; 
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
  background-color: #f4f4f9; 
  color: #333333; 
  transition: background-color 0.3s, color 0.3s;
}

.app-wrapper {
  padding: 20px;
  min-height: 100vh;
}

/* 2. Dark Mode Override */
@media (prefers-color-scheme: dark) {
  body {
    background-color: #121212; 
    color: #ffffff; 
  }
}
</style>