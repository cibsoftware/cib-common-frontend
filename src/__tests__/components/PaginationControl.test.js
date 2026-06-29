/*
 * Copyright CIB software GmbH and/or licensed to CIB software GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. CIB software licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
import { describe, it, expect } from 'vitest'
import { PaginationControl } from '@/library'
import { mountWithDefaults } from '../helpers/mountComponent.js'

function mountPagination(props = {}) {
  return mountWithDefaults(PaginationControl, {
    props: {
      currentPage: 1,
      itemsPerPage: 10,
      total: 100,
      ...props,
    },
  })
}

describe('PaginationControl', () => {
  describe('computed properties', () => {
    it('calculates totalPages', () => {
      const wrapper = mountPagination({ total: 95, itemsPerPage: 10 })
      expect(wrapper.vm.totalPages).toBe(10)
    })

    it('totalPages is at least 1 when total is 0', () => {
      const wrapper = mountPagination({ total: 0 })
      expect(wrapper.vm.totalPages).toBe(1)
    })

    it('calculates startItem and endItem', () => {
      const wrapper = mountPagination({ currentPage: 3, itemsPerPage: 10, total: 100 })
      expect(wrapper.vm.startItem).toBe(21)
      expect(wrapper.vm.endItem).toBe(30)
    })

    it('startItem is 0 when total is 0', () => {
      const wrapper = mountPagination({ total: 0 })
      expect(wrapper.vm.startItem).toBe(0)
    })

    it('endItem does not exceed total', () => {
      const wrapper = mountPagination({ currentPage: 10, itemsPerPage: 10, total: 95 })
      expect(wrapper.vm.endItem).toBe(95)
    })

    it('shows first page button when current page is far from start', () => {
      const wrapper = mountPagination({ currentPage: 10, itemsPerPage: 10, total: 200 })
      expect(wrapper.vm.showFirstPage).toBe(true)
      expect(wrapper.vm.visiblePages.length).toBeGreaterThan(0)
      expect(wrapper.vm.visiblePages[0]).toBeGreaterThan(2)
    })
  })

  describe('goToPage', () => {
    it('emits page-changed for valid page', async () => {
      const wrapper = mountPagination({ currentPage: 5 })
      wrapper.vm.goToPage(6)
      expect(wrapper.emitted('page-changed')).toEqual([[6]])
    })

    it('does not emit for out of bounds page', () => {
      const wrapper = mountPagination({ currentPage: 1 })
      wrapper.vm.goToPage(0)
      wrapper.vm.goToPage(11)
      expect(wrapper.emitted('page-changed')).toBeUndefined()
    })

    it('does not emit for same page', () => {
      const wrapper = mountPagination({ currentPage: 3 })
      wrapper.vm.goToPage(3)
      expect(wrapper.emitted('page-changed')).toBeUndefined()
    })

    it('previous button is disabled on first page', () => {
      const wrapper = mountPagination({ currentPage: 1 })
      const prevBtn = wrapper.find('[aria-label="Previous"]')
      expect(prevBtn.attributes('disabled')).toBeDefined()
    })

    it('next button is disabled on last page', () => {
      const wrapper = mountPagination({ currentPage: 10, total: 100, itemsPerPage: 10 })
      const nextBtn = wrapper.find('[aria-label="Next"]')
      expect(nextBtn.attributes('disabled')).toBeDefined()
    })
  })

  describe('changeItemsPerPage', () => {
    it('emits items-per-page-changed with recalculated page', () => {
      const wrapper = mountPagination({ currentPage: 3, itemsPerPage: 10, total: 100 })
      wrapper.vm.changeItemsPerPage('20')

      expect(wrapper.emitted('items-per-page-changed')).toEqual([[{
        itemsPerPage: 20,
        newPage: 2,
      }]])
    })

    it('change via select triggers changeItemsPerPage', async () => {
      const wrapper = mountPagination({ currentPage: 1, itemsPerPage: 10, total: 100 })
      await wrapper.find('#itemsPerPage').setValue('40')

      expect(wrapper.emitted('items-per-page-changed')).toBeDefined()
    })
  })
})
