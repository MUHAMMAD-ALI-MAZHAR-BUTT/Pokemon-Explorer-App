<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<style>
/* Import our custom styles */
@import url('./style.css');

/* Global app styles */
#app {
  min-height: 100vh;
  position: relative;
}

/* Router transition animations */
.router-enter-active,
.router-leave-active {
  transition: var(--transition-normal);
}

.router-enter-from,
.router-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--gray-100);
}

::-webkit-scrollbar-thumb {
  background: var(--gray-400);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--gray-500);
}

/* Selection styling */
::selection {
  background: rgba(59, 130, 246, 0.2);
  color: var(--primary-dark);
}

/* Focus states */
:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Link styles */
a {
  color: var(--primary-color);
  transition: var(--transition-fast);
}

a:hover {
  color: var(--primary-dark);
}

/* Button reset */
button {
  font-family: inherit;
}

/* Image optimization */
img {
  max-width: 100%;
  height: auto;
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  :root {
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.2);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.2), 0 2px 4px -2px rgb(0 0 0 / 0.2);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2);
    --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.2), 0 8px 10px -6px rgb(0 0 0 / 0.2);
  }
}
</style>