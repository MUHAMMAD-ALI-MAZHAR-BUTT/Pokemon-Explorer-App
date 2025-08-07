<template>
  <div class="search-container animate-slide-up">
    <div class="search-wrapper">
      <div class="search-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      </div>
      
      <input
        type="text"
        class="search-input"
        placeholder="Search Pokémon by name..."
        v-model="searchQuery"
        @input="handleInput"
        @focus="onFocus"
        @blur="onBlur"
        ref="searchInput"
      />
      
      <div class="search-actions" v-if="searchQuery">
        <button class="clear-button" @click="clearSearch" aria-label="Clear search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
    
    <div class="search-suggestions" v-if="showSuggestions && suggestions.length > 0">
      <div class="suggestions-header">
        <span class="suggestions-title">Suggestions</span>
      </div>
      <div class="suggestions-list">
        <button
          v-for="suggestion in suggestions.slice(0, 5)"
          :key="suggestion.id"
          class="suggestion-item"
          @click="selectSuggestion(suggestion)"
        >
          <img :src="suggestion.image" :alt="suggestion.name" class="suggestion-image" />
          <div class="suggestion-info">
            <span class="suggestion-name">{{ suggestion.customName }}</span>
            <span class="suggestion-id">#{{ String(suggestion.id).padStart(3, '0') }}</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'
import { usePokemonStore } from '@/store/pokemon'

export default defineComponent({
  name: 'SearchBar',
  setup() {
    const store = usePokemonStore()
    const searchQuery = ref('')
    const searchInput = ref<HTMLInputElement>()
    const showSuggestions = ref(false)
    const isFocused = ref(false)
    
    const suggestions = computed(() => {
      if (!searchQuery.value || searchQuery.value.length < 2) return []
      
      return store.pokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        pokemon.customName.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    })
    
    const handleInput = () => {
      store.setSearchQuery(searchQuery.value)
      showSuggestions.value = isFocused.value && suggestions.value.length > 0
    }
    
    const onFocus = () => {
      isFocused.value = true
      showSuggestions.value = suggestions.value.length > 0
    }
    
    const onBlur = () => {
   
      setTimeout(() => {
        isFocused.value = false
        showSuggestions.value = false
      }, 200)
    }
    
    const clearSearch = () => {
      searchQuery.value = ''
      store.setSearchQuery('')
      searchInput.value?.focus()
      showSuggestions.value = false
    }
    
    const selectSuggestion = (pokemon: any) => {
      searchQuery.value = pokemon.customName
      store.setSearchQuery(pokemon.customName)
      showSuggestions.value = false
      searchInput.value?.blur()
    }
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.search-container')) {
        showSuggestions.value = false
      }
    }
    
    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })
    
    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })
    
    return {
      searchQuery,
      searchInput,
      showSuggestions,
      suggestions,
      handleInput,
      onFocus,
      onBlur,
      clearSearch,
      selectSuggestion,
    }
  }
})
</script>

<style scoped>
.search-container {
  position: relative;
  max-width: 600px;
  margin: 0 auto 2rem;
}

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 16px;
  padding: 0.75rem 1rem;
  box-shadow: var(--shadow-lg);
  border: 2px solid var(--gray-100);
  transition: var(--transition-normal);
}

.search-wrapper:focus-within {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-xl), 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.search-icon {
  color: var(--gray-400);
  margin-right: 0.75rem;
  transition: var(--transition-fast);
}

.search-wrapper:focus-within .search-icon {
  color: var(--primary-color);
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: 500;
  color: var(--gray-800);
  background: transparent;
  padding: 0.5rem 0;
}

.search-input::placeholder {
  color: var(--gray-400);
  font-weight: 400;
}

.search-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 0.5rem;
}

.clear-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: var(--gray-100);
  color: var(--gray-500);
  border-radius: 8px;
  cursor: pointer;
  transition: var(--transition-fast);
}

.clear-button:hover {
  background: var(--gray-200);
  color: var(--gray-700);
}

.search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 16px;
  margin-top: 0.5rem;
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--gray-200);
  z-index: 1000;
  overflow: hidden;
  animation: slideInUp 0.2s ease-out;
}

.suggestions-header {
  padding: 0.75rem 1rem;
  background: var(--gray-50);
  border-bottom: 1px solid var(--gray-100);
}

.suggestions-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--gray-600);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.suggestions-list {
  max-height: 300px;
  overflow-y: auto;
}

.suggestion-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: var(--transition-fast);
  text-align: left;
}

.suggestion-item:hover {
  background: var(--gray-50);
}

.suggestion-item:not(:last-child) {
  border-bottom: 1px solid var(--gray-100);
}

.suggestion-image {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  margin-right: 0.75rem;
  object-fit: contain;
  background: var(--gray-50);
}

.suggestion-info {
  display: flex;
  flex-direction: column;
}

.suggestion-name {
  font-weight: 600;
  color: var(--gray-800);
  text-transform: capitalize;
}

.suggestion-id {
  font-size: 0.875rem;
  color: var(--gray-500);
}

@media (max-width: 768px) {
  .search-container {
    margin: 0 0 1.5rem;
  }
  
  .search-wrapper {
    padding: 0.625rem 0.875rem;
  }
  
  .search-input {
    font-size: 0.9rem;
  }
}
</style>