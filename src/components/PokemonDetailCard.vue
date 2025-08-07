<template>
  <div class="container-fluid p-0">
    <!-- Compact Hero Section -->
    <div class="row g-0">
      <div class="col-12">
        <div class="card border-0 shadow-lg overflow-hidden fade-in">
          <div class="hero-section position-relative" :style="heroBackground">
            <div class="hero-overlay"></div>
            <div class="container-fluid py-4 position-relative">
              <div class="row align-items-center g-3">
                <div class="col-md-3 text-center">
                  <div class="pokemon-image-wrapper bounce-in">
                    <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image img-fluid">
                    <div class="image-glow"></div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="text-white">
                    <div class="d-flex align-items-center gap-2 mb-2">
                      <span class="badge bg-light text-dark fs-6">#{{ String(pokemon.id).padStart(3, '0') }}</span>
                      <div class="d-flex gap-1">
                        <span 
                          v-for="type in pokemon.types" 
                          :key="type.type.name"
                          class="badge"
                          :class="`bg-${type.type.name}`"
                          :style="getTypeStyle(type.type.name)"
                        >
                          {{ type.type.name }}
                        </span>
                      </div>
                    </div>
                    <h1 class="display-5 fw-bold mb-2 text-shadow">{{ pokemon.customName || pokemon.name }}</h1>
                    <p v-if="pokemon.customDescription" class="mb-2 opacity-90">{{ pokemon.customDescription }}</p>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="d-flex flex-column gap-2 text-white">
                    <div class="d-flex align-items-center gap-2">
                      <i class="bi bi-rulers fs-5"></i>
                      <span>{{ (pokemon.height / 10).toFixed(1) }}m</span>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                      <i class="bi bi-speedometer2 fs-5"></i>
                      <span>{{ (pokemon.weight / 10).toFixed(1) }}kg</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Optimized Content Grid -->
    <div class="row mt-3 g-3">
      <!-- Edit/Customize Section -->
      <div class="col-lg-8">
        <div class="card h-100 border-0 shadow card-hover slide-up">
          <div class="card-header bg-primary text-white border-0">
            <div class="d-flex align-items-center justify-content-between">
              <h6 class="card-title mb-0 d-flex align-items-center gap-2">
                <i class="bi bi-pencil-square"></i>
                Customize Pokémon
              </h6>
              <button 
                type="button" 
                class="btn btn-sm btn-outline-light btn-hover-lift" 
                @click="toggleEdit"
              >
                <i :class="isEditing ? 'bi bi-eye' : 'bi bi-pencil'"></i>
                {{ isEditing ? 'View' : 'Edit' }}
              </button>
            </div>
          </div>
          <div class="card-body p-3">
            <!-- View Mode -->
            <div v-if="!isEditing" class="fade-in">
              <div class="mb-3">
                <label class="form-label text-muted small fw-bold">CUSTOM NAME</label>
                <p class="fs-6 fw-semibold mb-0">{{ formData.customName || pokemon.name }}</p>
              </div>
              <div>
                <label class="form-label text-muted small fw-bold">CUSTOM DESCRIPTION</label>
                <p class="text-muted small">{{ formData.customDescription || 'No custom description added yet.' }}</p>
              </div>
            </div>

            <!-- Edit Mode -->
            <form v-else @submit.prevent="handleSubmit" class="slide-down">
              <div class="mb-3">
                <label for="customName" class="form-label fw-semibold small">Custom Name</label>
                <input 
                  type="text" 
                  class="form-control"
                  id="customName" 
                  v-model="formData.customName"
                  :placeholder="pokemon.name"
                />
              </div>
              
              <div class="mb-3">
                <label for="customDescription" class="form-label fw-semibold small">Custom Description</label>
                <textarea
                  class="form-control"
                  id="customDescription"
                  v-model="formData.customDescription"
                  rows="3"
                  placeholder="Add a custom description..."
                ></textarea>
              </div>
              
              <button type="submit" class="btn btn-primary btn-sm btn-hover-lift">
                <i class="bi bi-cloud-arrow-up me-1"></i>
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Abilities Section - Compact -->
      <div class="col-lg-4">
        <div class="card h-100 border-0 shadow card-hover slide-up" style="animation-delay: 0.1s">
          <div class="card-header bg-success text-white border-0">
            <h6 class="card-title mb-0 d-flex align-items-center gap-2">
              <i class="bi bi-lightning-charge"></i>
              Abilities
            </h6>
          </div>
          <div class="card-body p-3">
            <div class="d-grid gap-2">
              <div 
                v-for="(ability, index) in pokemon.abilities" 
                :key="ability.ability.name"
                class="d-flex align-items-center gap-2 p-2 bg-light rounded-2 scale-in"
                :style="{ animationDelay: `${index * 0.1}s` }"
              >
                <div class="flex-shrink-0">
                  <div class="bg-success text-white rounded-circle d-flex align-items-center justify-content-center" style="width: 24px; height: 24px;">
                    <i class="bi bi-star-fill" style="font-size: 10px;"></i>
                  </div>
                </div>
                <div class="flex-grow-1">
                  <small class="fw-semibold text-capitalize">{{ ability.ability.name.replace('-', ' ') }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Battle Statistics - Optimized Grid -->
      <div class="col-12">
        <div class="card border-0 shadow card-hover slide-up" style="animation-delay: 0.2s">
          <div class="card-header bg-info text-white border-0">
            <h6 class="card-title mb-0 d-flex align-items-center gap-2">
              <i class="bi bi-bar-chart-fill"></i>
              Battle Statistics
            </h6>
          </div>
          <div class="card-body p-3">
            <div class="row g-2">
              <div 
                v-for="(stat, index) in pokemon.stats" 
                :key="stat.stat.name"
                class="col-md-6 col-lg-4"
              >
                <div class="stat-card p-3 bg-light rounded-2 h-100 slide-left" :style="{ animationDelay: `${index * 0.1}s` }">
                  <div class="d-flex align-items-center gap-2 mb-2">
                    <div class="stat-icon-container">
                      <i :class="getStatIcon(stat.stat.name)" class="stat-icon-pulse" :style="getStatIconStyle(stat.base_stat)"></i>
                    </div>
                    <div class="flex-grow-1">
                      <div class="d-flex justify-content-between align-items-center">
                        <small class="fw-semibold">{{ formatStatName(stat.stat.name) }}</small>
                        <span class="badge" :class="getStatBadgeClass(stat.base_stat)">{{ stat.base_stat }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="progress" style="height: 6px;">
                    <div 
                      class="progress-bar progress-bar-striped"
                      :class="getStatClass(stat.base_stat)"
                      role="progressbar" 
                      :style="{ width: getStatPercentage(stat.base_stat) + '%' }"
                      :aria-valuenow="stat.base_stat" 
                      aria-valuemin="0" 
                      aria-valuemax="200"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <ConfirmationModal :pokemon="pokemon" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Pokemon } from '@/types/pokemon'
import ConfirmationModal from './ConfirmationModal.vue'
import { Modal } from 'bootstrap'

const props = defineProps<{
  pokemon: Pokemon
}>()

const emit = defineEmits<{
  update: [pokemon: Pokemon]
}>()

const isEditing = ref(false)
const formData = ref({
  customName: props.pokemon.customName || props.pokemon.name,
  customDescription: props.pokemon.customDescription || '',
})

const primaryType = computed(() => {
  return props.pokemon.types[0]?.type.name || 'normal'
})

const heroBackground = computed(() => {
  const type = primaryType.value
  const colors = {
    fire: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
    water: 'linear-gradient(135deg, #4dabf7 0%, #339af0 100%)',
    grass: 'linear-gradient(135deg, #51cf66 0%, #40c057 100%)',
    electric: 'linear-gradient(135deg, #ffd43b 0%, #fab005 100%)',
    psychic: 'linear-gradient(135deg, #f783ac 0%, #e64980 100%)',
    ice: 'linear-gradient(135deg, #74c0fc 0%, #339af0 100%)',
    dragon: 'linear-gradient(135deg, #5c7cfa 0%, #4c6ef5 100%)',
    ghost: 'linear-gradient(135deg, #9775fa 0%, #845ef7 100%)',
    poison: 'linear-gradient(135deg, #da77f2 0%, #cc5de8 100%)',
    ground: 'linear-gradient(135deg, #f59f00 0%, #fd7e14 100%)',
    rock: 'linear-gradient(135deg, #868e96 0%, #6c757d 100%)',
    bug: 'linear-gradient(135deg, #8ce99a 0%, #69db7c 100%)',
    steel: 'linear-gradient(135deg, #adb5bd 0%, #868e96 100%)',
    fighting: 'linear-gradient(135deg, #ff8cc8 0%, #f06292 100%)',
    normal: 'linear-gradient(135deg, #ced4da 0%, #adb5bd 100%)',
    flying: 'linear-gradient(135deg, #91a7ff 0%, #748ffc 100%)',
    fairy: 'linear-gradient(135deg, #ffc9c9 0%, #ffa8a8 100%)',
  }
  return { background: colors[type as keyof typeof colors] || colors.normal }
})

const toggleEdit = () => {
  isEditing.value = !isEditing.value
}

const handleSubmit = () => {
  const updatedPokemon = {
    ...props.pokemon,
    ...formData.value,
  }
  
  emit('update', updatedPokemon)
  isEditing.value = false
  
 
  const modalElement = document.getElementById('confirmationModal')
  if (modalElement) {
    const modal = new Modal(modalElement)
    modal.show()
  }
}

const formatStatName = (name: string) => {
  const nameMap: { [key: string]: string } = {
    'hp': 'HP',
    'attack': 'ATK',
    'defense': 'DEF',
    'special-attack': 'SP.ATK',
    'special-defense': 'SP.DEF',
    'speed': 'SPD'
  }
  return nameMap[name] || name
}

const getStatIcon = (statName: string) => {
  const iconMap: { [key: string]: string } = {
    'hp': 'bi bi-heart-fill text-danger',
    'attack': 'bi bi-sword text-warning',
    'defense': 'bi bi-shield-fill text-primary',
    'special-attack': 'bi bi-lightning-fill text-info',
    'special-defense': 'bi bi-shield-check text-success',
    'speed': 'bi bi-speedometer2 text-secondary'
  }
  return iconMap[statName] || 'bi bi-circle-fill text-muted'
}

const getStatIconStyle = (value: number) => {
  return {
    fontSize: '16px',
    filter: value >= 100 ? 'drop-shadow(0 0 4px currentColor)' : 'none'
  }
}

const getStatPercentage = (value: number) => {
  return Math.min((value / 200) * 100, 100)
}

const getStatClass = (value: number) => {
  if (value >= 120) return 'bg-success'
  if (value >= 90) return 'bg-info'
  if (value >= 60) return 'bg-warning'
  return 'bg-danger'
}

const getStatBadgeClass = (value: number) => {
  if (value >= 120) return 'bg-success'
  if (value >= 90) return 'bg-info'
  if (value >= 60) return 'bg-warning'
  return 'bg-danger'
}

const getTypeStyle = (type: string) => {
  const colors = {
    fire: '--bs-bg-opacity: 1; background-color: var(--pokemon-fire)!important',
    water: '--bs-bg-opacity: 1; background-color: var(--pokemon-water)!important',
    grass: '--bs-bg-opacity: 1; background-color: var(--pokemon-grass)!important',
    electric: '--bs-bg-opacity: 1; background-color: var(--pokemon-electric)!important',
    psychic: '--bs-bg-opacity: 1; background-color: var(--pokemon-psychic)!important',
    ice: '--bs-bg-opacity: 1; background-color: var(--pokemon-ice)!important',
    dragon: '--bs-bg-opacity: 1; background-color: var(--pokemon-dragon)!important',
    ghost: '--bs-bg-opacity: 1; background-color: var(--pokemon-ghost)!important',
    poison: '--bs-bg-opacity: 1; background-color: var(--pokemon-poison)!important',
    ground: '--bs-bg-opacity: 1; background-color: var(--pokemon-ground)!important',
    rock: '--bs-bg-opacity: 1; background-color: var(--pokemon-rock)!important',
    bug: '--bs-bg-opacity: 1; background-color: var(--pokemon-bug)!important',
    steel: '--bs-bg-opacity: 1; background-color: var(--pokemon-steel)!important',
    fighting: '--bs-bg-opacity: 1; background-color: var(--pokemon-fighting)!important',
    normal: '--bs-bg-opacity: 1; background-color: var(--pokemon-normal)!important',
    flying: '--bs-bg-opacity: 1; background-color: var(--pokemon-flying)!important',
    fairy: '--bs-bg-opacity: 1; background-color: var(--pokemon-fairy)!important',
  }
  return colors[type as keyof typeof colors] || colors.normal
}
</script>

<style scoped>
.hero-section {
  min-height: 200px;
  position: relative;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
}

.pokemon-image-wrapper {
  position: relative;
  display: inline-block;
}

.pokemon-image {
  width: 120px;
  height: 120px;
  object-fit: contain;
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));
  transition: transform 0.3s ease;
}

.pokemon-image:hover {
  transform: scale(1.05) rotate(3deg);
}

.image-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
  border-radius: 50%;
  z-index: -1;
  animation: pulse 2s infinite;
}

.text-shadow {
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.stat-card {
  transition: all 0.3s ease;
  border: 1px solid rgba(0,0,0,0.05);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.stat-icon-container {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-hover {
  transition: all 0.3s ease;
}

.btn-hover-lift {
  transition: all 0.2s ease;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.4;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

@media (max-width: 768px) {
  .pokemon-image {
    width: 100px;
    height: 100px;
  }
  
  .hero-section {
    min-height: 180px;
  }
  
  .display-5 {
    font-size: 1.5rem;
  }
  
  .stat-card {
    margin-bottom: 0.5rem;
  }
}
</style>