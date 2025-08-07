<!-- src/components/PaginationComponent.vue -->
<template>
  <nav
    aria-label="Pokemon pagination"
    class="d-flex justify-content-center mt-5"
  >
    <div class="pagination-container animate-fade-in">
      <div class="pagination-wrapper">
        <!-- Previous Button -->
        <button
          class="pagination-btn pagination-nav"
          :class="{ disabled: currentPage === 1 }"
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          aria-label="Previous page"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M15 18L9 12L15 6" />
          </svg>
          <span class="d-none d-sm-inline ms-1">Prev</span>
        </button>

        <!-- Page Numbers -->
        <div class="page-numbers">
          <template v-for="page in visiblePages" :key="page">
            <button
              v-if="page === '...'"
              class="pagination-btn pagination-ellipsis"
              disabled
            >
              ...
            </button>
            <button
              v-else
              class="pagination-btn"
              :class="{
                active: page === currentPage,
                'd-none d-sm-block': shouldHidePage(page),
              }"
              @click="typeof page === 'number' && changePage(page)"
              :aria-label="`Go to page ${page}`"
              :aria-current="page === currentPage ? 'page' : undefined"
            >
              {{ page }}
            </button>
          </template>
        </div>

        <!-- Next Button -->
        <button
          class="pagination-btn pagination-nav"
          :class="{ disabled: currentPage === totalPages }"
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          aria-label="Next page"
        >
          <span class="d-none d-sm-inline me-1">Next</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M9 18L15 12L9 6" />
          </svg>
        </button>
      </div>

      <!-- Page Info -->
      <div class="pagination-info">
        <span>
          Showing <strong>{{ startItem }}-{{ endItem }}</strong> of
          <strong>{{ totalItems }}</strong> Pokémon
        </span>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "PaginationComponent",
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    totalItems: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
  },
  emits: ["page-change"],
  setup(props, { emit }) {
    const changePage = (page: number) => {
      if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
        emit("page-change", page);
      }
    };

    const visiblePages = computed(() => {
      const pages: (number | string)[] = [];
      const total = props.totalPages;
      const current = props.currentPage;
      const delta = 2;

  
      pages.push(1);

     
      let start = Math.max(2, current - delta);
      let end = Math.min(total - 1, current + delta);

      if (current - delta > 2) pages.push("...");

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current + delta < total - 1) pages.push("...");

      if (total > 1) pages.push(total);

      return pages;
    });

    const startItem = computed(() => {
      return Math.min(
        (props.currentPage - 1) * props.itemsPerPage + 1,
        props.totalItems
      );
    });

    const endItem = computed(() => {
      return Math.min(props.currentPage * props.itemsPerPage, props.totalItems);
    });

    const shouldHidePage = (page: number | string) => {
      if (typeof page !== "number") return false;

     
      return (
        props.totalPages > 7 &&
        page !== props.currentPage &&
        Math.abs(page - props.currentPage) > 1 &&
        page !== 1 &&
        page !== props.totalPages
      );
    };

    return {
      changePage,
      visiblePages,
      startItem,
      endItem,
      shouldHidePage,
    };
  },
});
</script>

<style scoped>
.pagination-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.pagination-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  padding: 0.75rem 1rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 0 2px rgba(0, 0, 0, 0.06);
  border: 1px solid #e9ecef;
  backdrop-filter: blur(4px);
  background-color: rgba(255, 255, 255, 0.85);
}

.page-numbers {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.pagination-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  color: #4a5568;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.pagination-btn:not(.disabled):not(.pagination-ellipsis):hover {
  background: #f8f9fa;
  color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
}

.pagination-btn.active {
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  color: white;
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.25);
  transform: scale(1.05);
}

.pagination-btn.active:hover {
  transform: scale(1.05) translateY(-2px);
}

.pagination-btn.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-btn.pagination-ellipsis {
  cursor: default;
  font-weight: 700;
  min-width: 32px;
  color: #94a3b8;
}

.pagination-nav {
  padding: 0 1rem;
  min-width: auto;
  border: 1px solid #e2e8f0;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.pagination-nav:hover:not(.disabled) {
  border-color: #cbd5e1;
  background-color: #f1f5f9;
  transform: translateY(-2px);
}

.pagination-info {
  font-size: 0.9375rem;
  font-weight: 500;
  color: #4a5568;
  text-align: center;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .pagination-wrapper {
    padding: 0.5rem;
    gap: 0.25rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .pagination-btn {
    min-width: 36px;
    height: 36px;
    font-size: 0.85rem;
  }

  .pagination-nav {
    padding: 0 0.75rem;
    order: 2;
    flex: 1;
    max-width: 120px;
  }

  .page-numbers {
    order: 1;
    width: 100%;
    justify-content: center;
  }
}
</style>
