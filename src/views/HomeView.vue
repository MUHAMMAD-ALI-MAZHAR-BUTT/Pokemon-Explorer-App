<!-- src/views/HomeView.vue -->
<template>
  <div class="home-view">
    <div class="main-container">
      <div class="container">
        <!-- Header Section -->
        <header class="page-header animate-slide-up">
          <h1 class="page-title title-gradient">Pokédex Explorer</h1>
          <p class="page-subtitle">
            Discover and explore the amazing world of Pokémon
          </p>
        </header>

        <!-- Search Section -->
        <div class="search-section animate-slide-up">
          <SearchBar />
        </div>

        <!-- Content Section -->
        <div class="content-section">
          <div v-if="isLoading" class="loading-section">
            <LoaderSpinner />
          </div>

          <div v-else class="pokemon-section">
            <!-- Results Header -->
            <div class="results-header animate-slide-up" v-if="!isLoading">
              <div class="results-info">
                <h2 class="results-title">
                  {{
                    searchQuery
                      ? `Search Results for "${searchQuery}"`
                      : "All Pokémon"
                  }}
                </h2>
                <p class="results-count">{{ totalItems }} Pokémon found</p>
              </div>

              <div class="view-controls">
                <select
                  v-model="selectedItemsPerPage"
                  @change="handleItemsPerPageChange"
                  class="items-per-page-select"
                >
                  <option :value="12">12 per page</option>
                  <option :value="24">24 per page</option>
                  <option :value="36">36 per page</option>
                  <option :value="48">48 per page</option>
                </select>
              </div>
            </div>

            <!-- Pokemon Grid -->
            <div
              v-if="paginatedPokemons.length > 0"
              class="pokemon-grid-section"
            >
              <PokemonGrid :pokemons="paginatedPokemons" />
            </div>

            <!-- No Results -->
            <div
              v-else-if="!isLoading && searchQuery"
              class="no-results animate-fade-in"
            >
              <div class="no-results-content">
                <div class="no-results-icon">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                    <line x1="11" y1="8" x2="11" y2="12" />
                    <line x1="11" y1="16" x2="11.01" y2="16" />
                  </svg>
                </div>
                <h3 class="no-results-title">No Pokémon found</h3>
                <p class="no-results-text">
                  Try adjusting your search terms or browse all Pokémon
                </p>
                <button @click="clearSearch" class="btn-clear-search">
                  View All Pokémon
                </button>
              </div>
            </div>

            <!-- Pagination -->
            <div
              v-if="totalPages > 1 && paginatedPokemons.length > 0"
              class="pagination-section"
            >
              <PaginationComponent
                :current-page="currentPage"
                :total-pages="totalPages"
                :total-items="totalItems"
                :items-per-page="itemsPerPage"
                @page-change="handlePageChange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { usePokemonStore } from "@/store/pokemon";
import PokemonGrid from "@/components/PokemonGrid.vue";
import SearchBar from "@/components/SearchBar.vue";
import LoaderSpinner from "@/components/LoaderSpinner.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    PokemonGrid,
    SearchBar,
    LoaderSpinner,
    PaginationComponent,
  },
  setup() {
    const store = usePokemonStore();
    const selectedItemsPerPage = ref(store.itemsPerPage);

 
    if (store.pokemonList.length === 0) {
      store.fetchPokemons();
    }

    const handlePageChange = (page: number) => {
      store.setCurrentPage(page);

 
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    const handleItemsPerPageChange = () => {
      store.setItemsPerPage(selectedItemsPerPage.value);

 
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    const clearSearch = () => {
      store.setSearchQuery("");
    };

  
    watch(
      () => store.searchQuery,
      () => {
        store.setCurrentPage(1);
      }
    );

    return {
      isLoading: computed(() => store.isLoading),
      paginatedPokemons: computed(() => store.paginatedPokemons),
      searchQuery: computed(() => store.searchQuery),
      currentPage: computed(() => store.currentPage),
      totalPages: computed(() => store.totalPages),
      totalItems: computed(() => store.totalItems),
      itemsPerPage: computed(() => store.itemsPerPage),
      selectedItemsPerPage,
      handlePageChange,
      handleItemsPerPageChange,
      clearSearch,
    };
  },
});
</script>

<style scoped>
.home-view {
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
}

.page-title {
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 1rem;
  line-height: 1.1;
}

.page-subtitle {
  font-size: 1.25rem;
  color: var(--gray-600);
  font-weight: 500;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.search-section {
  margin-bottom: 3rem;
}

.content-section {
  margin-bottom: 4rem;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--gray-200);
}

.results-info {
  flex: 1;
}

.results-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--gray-800);
  margin-bottom: 0.25rem;
}

.results-count {
  font-size: 1rem;
  color: var(--gray-600);
  font-weight: 500;
  margin: 0;
}

.view-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.items-per-page-select {
  padding: 0.5rem 1rem;
  border: 2px solid var(--gray-200);
  border-radius: 8px;
  background: white;
  color: var(--gray-700);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition-normal);
}

.items-per-page-select:focus {
  outline: none;
  border-color: var(--primary-color);
}

.pokemon-grid-section {
  margin-bottom: 3rem;
}

.no-results {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  text-align: center;
}

.no-results-content {
  max-width: 400px;
}

.no-results-icon {
  color: var(--gray-400);
  margin-bottom: 1.5rem;
}

.no-results-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gray-800);
  margin-bottom: 0.75rem;
}

.no-results-text {
  color: var(--gray-600);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.btn-clear-search {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition-normal);
}

.btn-clear-search:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

.pagination-section {
  margin-top: 4rem;
}

.loading-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

@media (max-width: 1024px) {
  .results-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .view-controls {
    width: 100%;
    justify-content: flex-end;
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 1rem 0;
    margin-bottom: 2rem;
  }

  .page-title {
    font-size: 2.5rem;
  }

  .page-subtitle {
    font-size: 1.1rem;
  }

  .search-section {
    margin-bottom: 2rem;
  }

  .results-header {
    margin-bottom: 1.5rem;
  }

  .results-title {
    font-size: 1.5rem;
  }

  .view-controls {
    justify-content: flex-start;
  }

  .items-per-page-select {
    font-size: 0.9rem;
  }
}
</style>
