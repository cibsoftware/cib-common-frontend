<!--

    Copyright CIB software GmbH and/or licensed to CIB software GmbH
    under one or more contributor license agreements. See the NOTICE file
    distributed with this work for additional information regarding copyright
    ownership. CIB software licenses this file to you under the Apache License,
    Version 2.0; you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.

-->

<template>
  <div class="d-flex justify-content-between align-items-center mt-3">
    <!-- Items per page and total info -->
    <div class="small text-muted">
      Showing {{ startItem }} to {{ endItem }} of {{ total }} items
    </div>

    <!-- Pagination controls -->
    <nav aria-label="File pagination">
      <ul class="pagination pagination-sm mb-0">
        <!-- Previous button -->
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button
              class="page-link"
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>

        <!-- First page -->
        <li v-if="showFirstPage" class="page-item">
          <button class="page-link" @click="goToPage(1)">1</button>
        </li>

        <!-- Left ellipsis -->
        <li v-if="showLeftEllipsis" class="page-item disabled">
          <span class="page-link">...</span>
        </li>

        <!-- Page numbers around current page -->
        <li
            v-for="page in visiblePages"
            :key="page"
            class="page-item"
            :class="{ active: page === currentPage }">
          <button class="page-link" @click="goToPage(page)">{{ page }}</button>
        </li>

        <!-- Right ellipsis -->
        <li v-if="showRightEllipsis" class="page-item disabled">
          <span class="page-link">...</span>
        </li>

        <!-- Last page -->
        <li v-if="showLastPage" class="page-item">
          <button class="page-link" @click="goToPage(totalPages)">{{ totalPages }}</button>
        </li>

        <!-- Next button -->
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button
              class="page-link"
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>

    <!-- Items per page selector -->
    <div class="d-flex align-items-center">
      <label for="itemsPerPage" class="form-label small text-muted mb-0 me-2">Items per page:</label>
      <select
          id="itemsPerPage"
          class="form-select form-select-sm"
          style="width: auto;"
          :value="itemsPerPage"
          @change="changeItemsPerPage($event.target.value)">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="40">40</option>
        <option value="60">60</option>
        <option value="100">100</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaginationControl',
  props: {
    currentPage: {
      type: Number,
      required: true,
      default: 1
    },
    itemsPerPage: {
      type: Number,
      required: true,
      default: 40
    },
    total: {
      type: Number,
      required: true,
      default: 0
    },
    maxVisiblePages: {
      type: Number,
      default: 5
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.itemsPerPage) || 1
    },

    startItem() {
      if (this.total === 0) return 0
      return ((this.currentPage - 1) * this.itemsPerPage) + 1
    },

    endItem() {
      const end = this.currentPage * this.itemsPerPage
      return Math.min(end, this.total)
    },

    visiblePages() {
      const pages = []
      const half = Math.floor(this.maxVisiblePages / 2)
      let start = Math.max(1, this.currentPage - half)
      let end = Math.min(this.totalPages, this.currentPage + half)

      // Adjust range if we're near the beginning or end
      if (end - start + 1 < this.maxVisiblePages) {
        if (start === 1) {
          end = Math.min(this.totalPages, start + this.maxVisiblePages - 1)
        } else if (end === this.totalPages) {
          start = Math.max(1, end - this.maxVisiblePages + 1)
        }
      }

      // Don't show pages that would be covered by first/last page buttons
      if (this.showFirstPage && start <= 2) {
        start = Math.max(start, 3)
      }
      if (this.showLastPage && end >= this.totalPages - 1) {
        end = Math.min(end, this.totalPages - 2)
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      return pages
    },

    showFirstPage() {
      return this.totalPages > 1 && this.visiblePages && this.visiblePages.length > 0 && this.visiblePages[0] > 2
    },

    showLastPage() {
      return this.totalPages > 1 && this.visiblePages && this.visiblePages.length > 0 && this.visiblePages[this.visiblePages.length - 1] < this.totalPages - 1
    },

    showLeftEllipsis() {
      return this.showFirstPage && this.visiblePages && this.visiblePages.length > 0 && this.visiblePages[0] > 3
    },

    showRightEllipsis() {
      return this.showLastPage && this.visiblePages && this.visiblePages.length > 0 && this.visiblePages[this.visiblePages.length - 1] < this.totalPages - 2
    }
  },
  methods: {
    goToPage(page) {
      if (page < 1 || page > this.totalPages || page === this.currentPage) {
        return
      }
      this.$emit('page-changed', page)
    },

    changeItemsPerPage(newItemsPerPage) {
      const itemsPerPage = parseInt(newItemsPerPage)
      // Calculate what the new current page should be to show similar items
      const currentFirstItem = (this.currentPage - 1) * this.itemsPerPage + 1
      const newPage = Math.ceil(currentFirstItem / itemsPerPage)

      this.$emit('items-per-page-changed', {
        itemsPerPage,
        newPage: Math.max(1, Math.min(newPage, Math.ceil(this.total / itemsPerPage)))
      })
    }
  }
}
</script>

<style scoped>
.pagination {
  --bs-pagination-padding-x: 0.5rem;
  --bs-pagination-padding-y: 0.25rem;
  --bs-pagination-font-size: 0.875rem;
}

.form-select-sm {
  min-width: 80px;
}
</style>