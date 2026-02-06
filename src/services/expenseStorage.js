// src/services/expenseStorage.js

const STORAGE_KEY = 'csc281-expense-data';

export const expenseStorage = {
  // 1. LOAD data from browser
  load() {
    const storedData = localStorage.getItem(STORAGE_KEY);
    // If data exists, parse it. If not, return an empty array.
    return storedData ? JSON.parse(storedData) : [];
  },

  // 2. SAVE data to browser
  save(expenses) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }
};