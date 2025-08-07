<template>
  <div class="pokemon-grid-container">
    <div class="pokemon-grid animate-fade-in">
      <div 
        v-for="(pokemon, index) in pokemons" 
        :key="pokemon.id" 
        class="pokemon-grid-item"
      >
        <PokemonCard :pokemon="pokemon" :index="index" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Pokemon } from '@/types/pokemon'
import PokemonCard from './PokemonCard.vue'

export default defineComponent({
  name: 'PokemonGrid',
  components: {
    PokemonCard,
  },
  props: {
    pokemons: {
      type: Array as PropType<Pokemon[]>,
      required: true,
    },
  },
})
</script>

<style scoped>
.pokemon-grid-container {
  width: 100%;
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0;
}

.pokemon-grid-item {
  display: flex;
  flex-direction: column;
}

@media (max-width: 1200px) {
  .pokemon-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .pokemon-grid {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1rem;
  }
}

@media (max-width: 576px) {
  .pokemon-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>