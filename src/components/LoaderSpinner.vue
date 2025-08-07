<template>
  <div class="loader-container animate-fade-in">
    <div class="loader-wrapper">
      <div class="pokeball-loader">
        <div class="pokeball">
          <div class="pokeball-top"></div>
          <div class="pokeball-bottom"></div>
          <div class="pokeball-center">
            <div class="pokeball-button"></div>
          </div>
        </div>
      </div>

      <div class="loading-text">
        <span class="loading-message">{{ loadingMessage }}</span>
        <div class="loading-dots">
          <span class="dot" :style="{ animationDelay: '0s' }">.</span>
          <span class="dot" :style="{ animationDelay: '0.2s' }">.</span>
          <span class="dot" :style="{ animationDelay: '0.4s' }">.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";

export default defineComponent({
  name: "LoaderSpinner",
  setup() {
    const loadingMessage = ref("Loading Pokémon");
    const messages = [
      "Loading Pokémon",
      "Catching them all",
      "Preparing your Pokédex",
      "Getting ready",
    ];
    let messageInterval: ReturnType<typeof setInterval>;

    onMounted(() => {
      messageInterval = setInterval(() => {
        const currentIndex = messages.indexOf(loadingMessage.value);
        const nextIndex = (currentIndex + 1) % messages.length;
        loadingMessage.value = messages[nextIndex];
      }, 2000);
    });

    onUnmounted(() => {
      if (messageInterval) {
        clearInterval(messageInterval);
      }
    });

    return {
      loadingMessage,
    };
  },
});
</script>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  padding: 3rem 0;
}

.loader-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.pokeball-loader {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pokeball {
  width: 80px;
  height: 80px;
  position: relative;
  animation: spin 2s linear infinite;
}

.pokeball-top {
  width: 100%;
  height: 50%;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  border-radius: 40px 40px 0 0;
  position: relative;
  border: 3px solid #333;
  border-bottom: 2px solid #333;
}

.pokeball-bottom {
  width: 100%;
  height: 50%;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 0 0 40px 40px;
  position: relative;
  border: 3px solid #333;
  border-top: none;
}

.pokeball-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: white;
  border: 3px solid #333;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.pokeball-button {
  width: 8px;
  height: 8px;
  background: #333;
  border-radius: 50%;
}

.pokeball::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 6px;
  background: #333;
  transform: translateY(-50%);
  z-index: 1;
}

.loading-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.loading-message {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--gray-700);
  text-align: center;
}

.loading-dots {
  display: flex;
  gap: 0.25rem;
}

.dot {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
  animation: bounce 1.4s ease-in-out infinite both;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .loader-container {
    min-height: 200px;
    padding: 2rem 0;
  }

  .pokeball {
    width: 60px;
    height: 60px;
  }

  .pokeball-center {
    width: 16px;
    height: 16px;
  }

  .pokeball-button {
    width: 6px;
    height: 6px;
  }

  .loading-message {
    font-size: 1.1rem;
  }
}
</style>
