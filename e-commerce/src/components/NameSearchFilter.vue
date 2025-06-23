<template>
  <div class="mb-6 p-4 bg-white rounded-xl shadow">
    <h2 class="text-lg font-semibold mb-4">Buscar por nombre</h2>
    
    <div class="flex flex-col space-y-3">
      <div class="relative">
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="Buscar productos..." 
          class="w-full p-2 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          @input="handleSearchInput"
        />
        <div class="absolute left-3 top-2.5 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div v-if="searchQuery" class="text-sm text-gray-600 flex items-center justify-between">
        <span>Buscando: "{{ searchQuery }}"</span>
        <button 
          @click="clearSearch" 
          class="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Limpiar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const searchQuery = ref('');

const debounce = (fn: Function, delay: number) => {
  let timeout: number | null = null;
  return (...args: any[]) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn(...args);
    }, delay) as unknown as number;
  };
};

const debouncedSearch = debounce((query: string) => {
  
  const event = new CustomEvent('name-search-change', {
    detail: { query },
    bubbles: true
  });
  window.dispatchEvent(event);
}, 300);

const handleSearchInput = () => {
  debouncedSearch(searchQuery.value);
};

const clearSearch = () => {
  searchQuery.value = '';
  debouncedSearch('');
};
</script>
