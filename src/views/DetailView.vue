<template>
  <div class="detail-view">
    <div class="main-container">
      <div class="container">
        <!-- Back Button -->
        <div class="navigation-header animate-slide-up">
          <router-link to="/" class="back-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Pokédex
          </router-link>
        </div>

        <!-- Content -->
        <div class="detail-content">
          <div v-if="loading" class="loading-section animate-fade-in">
            <LoaderSpinner />
          </div>
          
          <div v-else-if="pokemon" class="pokemon-detail-section">
            <PokemonDetailCard :pokemon="pokemon" @update="handleUpdate" />
          </div>
          
          <div v-else class="not-found-section animate-fade-in">
            <div class="not-found-content">
              <div class="not-found-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
              </div>
              <h2 class="not-found-title">Pokémon Not Found</h2>
              <p class="not-found-description">
                The Pokémon you're looking for doesn't exist in our Pokédex.
              </p>
              <router-link to="/" class="btn-home">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 9L12 2L21 9V20A2 2 0 0 1 19 22H5A2 2 0 0 1 3 20Z"/>
                  <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
                Return Home
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonStore } from '@/store/pokemon'
import PokemonDetailCard from '@/components/PokemonDetailCard.vue'
import LoaderSpinner from '@/components/LoaderSpinner.vue'
import type { Pokemon } from '@/types/pokemon'

export default defineComponent({
  name: 'DetailView',
  components: {
    PokemonDetailCard,
    LoaderSpinner,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = usePokemonStore()
    const route = useRoute()
    const loading = ref(true)

    const pokemonId = Number(route.params.id) || Number(props.id)

    const pokemon = computed<Pokemon | undefined>(() => 
      store.pokemonList.find((p:any) => p.id === pokemonId)
    )

    onMounted(async () => {
      if (!pokemon.value && store.pokemonList.length === 0) {
        await store.fetchPokemons()
      }
      
 
      setTimeout(() => {
        loading.value = false
      }, 500)
    })

    const handleUpdate = (updatedPokemon: Pokemon) => {
      store.updatePokemon(updatedPokemon)
    }

    return {
      pokemon,
      loading,
      handleUpdate,
    }
  },
})
</script>

<style scoped>
.detail-view {
  min-height: 100vh;
}

.navigation-header {
  margin-bottom: 2rem;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: white;
  color: var(--gray-700);
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
  transition: var(--transition-normal);
}

.back-button:hover {
  background: var(--gray-50);
  color: var(--primary-color);
  text-decoration: none;
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

.detail-content {
  margin-bottom: 4rem;
}

.loading-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.not-found-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  text-align: center;
}

.not-found-content {
  max-width: 500px;
  background: white;
  padding: 3rem 2rem;
  border-radius: 24px;
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--gray-200);
}

.not-found-icon {
  color: var(--gray-400);
  margin-bottom: 2rem;
}

.not-found-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--gray-800);
  margin-bottom: 1rem;
}

.not-found-description {
  color: var(--gray-600);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.btn-home {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: var(--gradient-primary);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  transition: var(--transition-normal);
}

.btn-home:hover {
  color: white;
  text-decoration: none;
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

@media (max-width: 768px) {
  .navigation-header {
    margin-bottom: 1.5rem;
  }
  
  .back-button {
    padding: 0.625rem 1.25rem;
    font-size: 0.9rem;
  }
  
  .not-found-content {
    padding: 2rem 1.5rem;
    margin: 0 1rem;
  }
  
  .not-found-title {
    font-size: 1.75rem;
  }
  
  .not-found-description {
    font-size: 1rem;
  }
}
</style>