<template>
  <div class="pokemon-card-wrapper animate-scale-in">
    <div class="pokemon-card" :style="{ '--delay': animationDelay }">
      <div class="card-image-container">
        <div class="image-background" :class="`type-${primaryType}`"></div>
        <img 
          :src="pokemon.image" 
          class="card-img-top pokemon-image" 
          :alt="pokemon.name"
          loading="lazy"
          @error="handleImageError"
        />
        <div class="type-badges">
          <span 
            v-for="type in pokemon.types" 
            :key="type.type.name" 
            class="type-badge" 
            :class="`type-${type.type.name}`"
          >
            {{ type.type.name }}
          </span>
        </div>
      </div>
      
      <div class="card-body">
        <div class="pokemon-info">
          <h5 class="pokemon-name">{{ pokemon.customName }}</h5>
          <p class="pokemon-id">#{{ String(pokemon.id).padStart(3, '0') }}</p>
        </div>
        
        <p class="pokemon-description">{{ truncatedDescription }}</p>
        
        <div class="pokemon-stats">
          <div class="stat-item">
            <span class="stat-label">Height</span>
            <span class="stat-value">{{ pokemon.height / 10 }}m</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Weight</span>
            <span class="stat-value">{{ pokemon.weight / 10 }}kg</span>
          </div>
        </div>
      </div>
      
      <div class="card-footer">
        <router-link 
          :to="{ name: 'detail', params: { id: pokemon.id } }" 
          class="btn-details"
        >
          <span>View Details</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M7 17L17 7M17 7H7M17 7V17"/>
          </svg>
        </router-link>
      </div>
      
      <div class="card-glow"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'
import type { Pokemon } from '@/types/pokemon'

export default defineComponent({
  name: 'PokemonCard',
  props: {
    pokemon: {
      type: Object as PropType<Pokemon>,
      required: true,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const primaryType = computed(() => {
      return props.pokemon.types[0]?.type.name || 'normal'
    })
    
    const truncatedDescription = computed(() => {
      const desc = props.pokemon.customDescription
      return desc.length > 100 ? desc.substring(0, 100) + '...' : desc
    })
    
    const animationDelay = computed(() => {
      return `${props.index * 0.1}s`
    })
    
    const handleImageError = (event: Event) => {
      const img = event.target as HTMLImageElement
      img.src = 'https://via.placeholder.com/200x200/e2e8f0/64748b?text=Pokemon'
    }
    
    return {
      primaryType,
      truncatedDescription,
      animationDelay,
      handleImageError,
    }
  },
})
</script>

<style scoped>
.pokemon-card-wrapper {
  height: 100%;
  animation-delay: var(--delay);
}

.pokemon-card {
  height: 100%;
  background: white;
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: var(--transition-normal);
  cursor: pointer;
  position: relative;
  border: 1px solid var(--gray-200);
  display: flex;
  flex-direction: column;
}

.pokemon-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: var(--shadow-xl);
}

.pokemon-card:hover .card-glow {
  opacity: 1;
}

.card-glow {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: radial-gradient(circle at center, rgba(255, 234, 0, 0.105), transparent);
  border-radius: 22px;
  z-index: -1;
  opacity: 0;
  transition: var(--transition-normal);
}

.card-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.image-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
  background: var(--gradient-primary);
}

.pokemon-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1rem;
  transition: var(--transition-normal);
  position: relative;
  z-index: 2;
}

.pokemon-card:hover .pokemon-image {
  transform: scale(1.1);
}

.type-badges {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 3;
}

.type-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  text-transform: capitalize;
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-sm);
}

/* Type Colors */
.type-normal { background: linear-gradient(135deg, #a8a878, #c6c6a7); }
.type-fire { background: linear-gradient(135deg, #f08030, #ffa756); }
.type-water { background: linear-gradient(135deg, #6890f0, #9db7f5); }
.type-electric { background: linear-gradient(135deg, #f8d030, #fae078); }
.type-grass { background: linear-gradient(135deg, #78c850, #a7db8d); }
.type-ice { background: linear-gradient(135deg, #98d8d8, #bce6e6); }
.type-fighting { background: linear-gradient(135deg, #c03028, #d67873); }
.type-poison { background: linear-gradient(135deg, #a040a0, #c183c1); }
.type-ground { background: linear-gradient(135deg, #e0c068, #ebd69d); }
.type-flying { background: linear-gradient(135deg, #a890f0, #c6b7f5); }
.type-psychic { background: linear-gradient(135deg, #f85888, #fa92b2); }
.type-bug { background: linear-gradient(135deg, #a8b820, #c6d16e); }
.type-rock { background: linear-gradient(135deg, #b8a038, #d1c17d); }
.type-ghost { background: linear-gradient(135deg, #705898, #a292bc); }
.type-dragon { background: linear-gradient(135deg, #7038f8, #a27dfa); }
.type-dark { background: linear-gradient(135deg, #705848, #a29288); }
.type-steel { background: linear-gradient(135deg, #b8b8d0, #d1d1e0); }
.type-fairy { background: linear-gradient(135deg, #ee99ac, #f4bdc9); }

.card-body {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.pokemon-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.pokemon-name {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  color: var(--gray-800);
  text-transform: capitalize;
}

.pokemon-id {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--gray-500);
  margin: 0;
}

.pokemon-description {
  font-size: 0.875rem;
  color: var(--gray-600);
  line-height: 1.5;
  margin-bottom: 1rem;
  flex-grow: 1;
}

.pokemon-stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--gray-500);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-value {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--gray-800);
}

.card-footer {
  padding: 1rem 1.5rem;
  background: var(--gray-50);
  border-top: 1px solid var(--gray-100);
}

.btn-details {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--gradient-primary);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.875rem;
  transition: var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.btn-details:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
  color: white;
  text-decoration: none;
}

.btn-details:before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn-details:hover:before {
  left: 100%;
}

@media (max-width: 768px) {
  .card-image-container {
    height: 160px;
  }
  
  .card-body {
    padding: 1rem;
  }
  
  .pokemon-name {
    font-size: 1.1rem;
  }
  
  .pokemon-stats {
    gap: 0.5rem;
  }
}
</style>