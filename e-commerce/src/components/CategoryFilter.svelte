<script lang="ts">
  import { onMount } from 'svelte';

  export let categories: string[] = [];
  
  let selectedCategory = '';
  let isOpen = false;
  
  function selectCategory(category: string) {
    if (selectedCategory === category) {
      selectedCategory = '';
    } else {
      selectedCategory = category;
    }
    isOpen = false;
    dispatchCategoryEvent();
  }
  
  function clearFilter() {
    selectedCategory = '';
    dispatchCategoryEvent();
  }
  
  function toggleDropdown() {
    isOpen = !isOpen;
  }
  
  function dispatchCategoryEvent() {
    const event = new CustomEvent('category-filter-change', {
      detail: { category: selectedCategory },
      bubbles: true
    });
    
    window.dispatchEvent(event);
  }
</script>

<div class="mb-6 p-4 bg-white rounded-xl shadow">
  <h2 class="text-lg font-semibold mb-4">Filtrar por categoría</h2>
  
  <div class="relative">
    <button 
      on:click={toggleDropdown}
      class="w-full p-2 bg-white border border-gray-300 rounded-lg flex justify-between items-center hover:border-blue-500 transition"
    >
      <span class="truncate">
        {selectedCategory || 'Todas las categorías'}
      </span>
    </button>
    
    {#if isOpen}
      <div 
        class="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-1"
      >
        <button 
          class="w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50 transition"
          on:click={() => clearFilter()}
        >
          Todas las categorías
        </button>
        
        {#each categories as category}
          <button 
            class="w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50 transition {selectedCategory === category ? 'bg-blue-50 font-medium text-blue-700' : ''}"
            on:click={() => selectCategory(category)}
          >
            {category}
          </button>
        {/each}
      </div>
    {/if}
  </div>
  
  {#if selectedCategory}
    <div class="mt-4 flex items-center justify-between">
      <span class="text-sm text-gray-600">
        Categoría: <span class="font-medium">{selectedCategory}</span>
      </span>
      <button
        on:click={clearFilter}
        class="text-blue-600 hover:text-blue-800 text-sm font-medium"
      >
        Limpiar
      </button>
    </div>
  {/if}
</div>
