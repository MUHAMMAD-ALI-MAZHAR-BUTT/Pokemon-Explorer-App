<template>
  <div
    class="modal fade"
    id="confirmationModal"
    tabindex="-1"
    aria-labelledby="confirmationModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow-lg">
        <div class="modal-header border-0 pb-0">
          <h5
            class="modal-title d-flex align-items-center gap-2"
            id="confirmationModalLabel"
          >
            <i class="bi bi-check-circle-fill text-success fs-4"></i>
            Changes Saved Successfully!
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body pt-2">
          <p class="mb-3 text-muted">
            Your Pokémon customization has been saved successfully.
          </p>
          <div class="d-flex align-items-center gap-2 p-3 bg-light rounded-3">
            <div class="avatar-sm">
              <img
                :src="pokemon?.image"
                :alt="pokemon?.name"
                class="rounded-circle"
                style="width: 40px; height: 40px; object-fit: contain"
              />
            </div>
            <div>
              <h6 class="mb-1">{{ pokemon?.customName }}</h6>
              <small class="text-muted"
                >{{ pokemon?.customDescription?.substring(0, 50) }}...</small
              >
            </div>
          </div>
        </div>
        <div class="modal-footer border-0 pt-0">
          <button
            type="button"
            class="btn btn-primary btn-hover-lift"
            data-bs-dismiss="modal"
          >
            <i class="bi bi-check-lg me-2"></i>
            Great!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Pokemon } from "@/types/pokemon";

defineProps<{
  pokemon?: Pokemon;
}>();
</script>

<style scoped>
.modal-content {
  border-radius: 16px;
  overflow: hidden;
}

.modal-header {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.avatar-sm img {
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
}

.btn-hover-lift {
  transition: all 0.2s ease-in-out;
}
</style>
