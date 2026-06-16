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
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { FlowTable } from '@/library'
import { mountWithDefaults } from '../helpers/mountComponent.js'

const fields = [
  { key: 'name', label: 'table.name', sortable: true },
  { key: 'age', label: 'table.age', sortable: true },
  { key: 'status', label: 'table.status', sortable: false },
]

const items = [
  { name: 'Charlie', age: 30, status: 'active' },
  { name: 'Alice', age: 25, status: 'inactive' },
  { name: 'Bob', age: 35, status: 'active' },
]

const columnDefinitions = [
  { key: 'name', label: 'table.name' },
  { key: 'age', label: 'table.age' },
  { key: 'status', label: 'table.status', disableToggle: true },
]

describe('FlowTable', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.stubGlobal('ResizeObserver', class {
      observe() {}
      disconnect() {}
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    localStorage.clear()
  })

  function mountTable(props = {}) {
    return mountWithDefaults(FlowTable, {
      props: {
        items,
        fields,
        ...props,
      },
    })
  }

  describe('API-1 rendering', () => {
    it('renders rows and columns from fields and items', () => {
      const wrapper = mountTable()
      expect(wrapper.findAll('tbody tr')).toHaveLength(3)
      expect(wrapper.text()).toContain('Charlie')
      expect(wrapper.text()).toContain('Alice')
    })

    it('renders cell slot content', () => {
      const wrapper = mountTable()
      expect(wrapper.find('table').exists()).toBe(true)
    })
  })

  describe('API-2 column visibility', () => {
    it('uses columnDefinitions when api2 props provided', () => {
      const wrapper = mountTable({
        fields: [],
        columns: ['name', 'age'],
        columnDefinitions,
      })
      expect(wrapper.vm.api2).toBe(true)
      expect(wrapper.vm.computedColumns.map(c => c.key)).toEqual(['name', 'age'])
    })

    it('respects columnVisibility from localStorage', () => {
      const key = `cibseven:table:columnVisibility:FlowTable:${columnDefinitions.length}`
      localStorage.setItem(key, JSON.stringify({ age: false }))

      const wrapper = mountTable({
        fields: [],
        columns: ['name', 'age', 'status'],
        columnDefinitions,
      })

      expect(wrapper.vm.computedColumns.map(c => c.key)).toEqual(['name', 'status'])
    })

    it('always includes disableToggle columns when listed in columns', () => {
      const wrapper = mountTable({
        fields: [],
        columns: ['name', 'status'],
        columnDefinitions,
      })
      expect(wrapper.vm.computedColumns.some(c => c.key === 'status')).toBe(true)
    })

    it('toggleColumn updates visibility and localStorage', async () => {
      const wrapper = mountTable({
        fields: [],
        columns: ['name', 'age', 'status'],
        columnDefinitions,
        useCase: 'TestTable',
      })

      wrapper.vm.toggleColumn({ key: 'age', label: 'table.age' })
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.columnVisibility.age).toBe(false)
      const stored = JSON.parse(localStorage.getItem(`cibseven:table:columnVisibility:TestTable:${columnDefinitions.length}`))
      expect(stored.age).toBe(false)
    })
  })

  describe('sorting', () => {
    it('sorts items locally ascending', async () => {
      const wrapper = mountTable()
      wrapper.vm.handleColumnClick(fields[0])
      await wrapper.vm.$nextTick()

      const names = wrapper.vm.sortedItems.map(i => i.name)
      expect(names).toEqual(['Alice', 'Bob', 'Charlie'])
    })

    it('toggles sort order on same column', async () => {
      const wrapper = mountTable()
      wrapper.vm.handleColumnClick(fields[0])
      wrapper.vm.handleColumnClick(fields[0])
      await wrapper.vm.$nextTick()

      const names = wrapper.vm.sortedItems.map(i => i.name)
      expect(names).toEqual(['Charlie', 'Bob', 'Alice'])
    })

    it('does not sort non-sortable columns', () => {
      const wrapper = mountTable()
      wrapper.vm.handleColumnClick(fields[2])
      expect(wrapper.vm.sortKey).toBeNull()
    })

    it('emits external-sort when externalSort enabled', () => {
      const wrapper = mountTable({ externalSort: true, sortBy: 'name', sortDesc: false })
      wrapper.vm.handleColumnClick(fields[0])

      expect(wrapper.emitted('external-sort')).toEqual([[{ sortBy: 'name', sortDesc: true }]])
    })

    it('returns items unchanged with externalSort', () => {
      const wrapper = mountTable({ externalSort: true, sortBy: 'name' })
      expect(wrapper.vm.sortedItems).toEqual(items)
    })
  })

  describe('sort helpers', () => {
    it('getSortClass returns sortable and active classes', () => {
      const wrapper = mountTable()
      wrapper.vm.sortKey = 'name'
      wrapper.vm.sortOrder = 1

      expect(wrapper.vm.getSortClass(fields[0])).toBe('sorting-asc active')
      expect(wrapper.vm.getSortClass(fields[2])).toBe('')
    })

    it('getAriaSort returns translated values', () => {
      const wrapper = mountTable({ sortBy: 'name', sortDesc: false, externalSort: true })
      expect(wrapper.vm.getAriaSort(fields[0])).toBe('bcomponents.ariaSortAsc')
      expect(wrapper.vm.getAriaSort(fields[1])).toBe('bcomponents.ariaSortNone')
    })

    it('getRowClass handles function and string', async () => {
      const wrapper = mountTable({ tbodyTrClass: 'row-class' })
      expect(wrapper.vm.getRowClass(items[0])).toBe('row-class')

      await wrapper.setProps({ tbodyTrClass: (item) => `row-${item.name}` })
      expect(wrapper.vm.getRowClass(items[0])).toBe('row-Charlie')
    })

    it('getHeaderJustifyClass reads thClass', () => {
      const wrapper = mountTable()
      expect(wrapper.vm.getHeaderJustifyClass({ thClass: 'justify-content-end' })).toBe('justify-content-end')
      expect(wrapper.vm.getHeaderJustifyClass({ thClass: 'justify-content-center' })).toBe('justify-content-center')
      expect(wrapper.vm.getHeaderJustifyClass({})).toBe('justify-content-start')
    })
  })

  describe('row click', () => {
    it('emits click when no text selected', () => {
      const wrapper = mountTable()
      vi.stubGlobal('getSelection', () => ({ toString: () => '' }))
      wrapper.vm.onRowClick(items[0])
      expect(wrapper.emitted('click')).toEqual([[items[0]]])
      vi.unstubAllGlobals()
    })

    it('does not emit click when text is selected', () => {
      const wrapper = mountTable()
      vi.stubGlobal('getSelection', () => ({ toString: () => 'selected text' }))
      wrapper.vm.onRowClick(items[0])
      expect(wrapper.emitted('click')).toBeUndefined()
      vi.unstubAllGlobals()
    })
  })

  describe('computedTableClass', () => {
    it('includes striped and hover classes', () => {
      const wrapper = mountTable({ striped: true, hover: true, tableClass: 'custom' })
      expect(wrapper.vm.computedTableClass).toContain('table-striped')
      expect(wrapper.vm.computedTableClass).toContain('table-hover')
      expect(wrapper.vm.computedTableClass).toContain('custom')
    })
  })

  describe('handleColumnClick guards', () => {
    it('skips when skipClick is true', () => {
      const wrapper = mountTable()
      wrapper.vm.skipClick = true
      wrapper.vm.handleColumnClick(fields[0])
      expect(wrapper.vm.sortKey).toBeNull()
    })
  })

  describe('mounted lifecycle', () => {
    it('ignores invalid localStorage JSON', () => {
      const key = `cibseven:table:columnVisibility:FlowTable:${columnDefinitions.length}`
      localStorage.setItem(key, 'not-json')

      const wrapper = mountTable({
        fields: [],
        columns: ['name', 'age'],
        columnDefinitions,
      })

      expect(wrapper.vm.columnVisibility).toEqual({})
    })
  })
})
