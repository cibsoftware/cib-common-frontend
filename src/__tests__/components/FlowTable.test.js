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

    it('renders valid aria-sort tokens and omits aria-sort on non-sortable columns', async () => {
      const wrapper = mountTable({ sortBy: 'name', sortDesc: false, externalSort: true })
      const headers = () => wrapper.findAll('th').map(th => th.attributes('aria-sort'))
      expect(headers()).toEqual(['ascending', 'none', undefined])

      await wrapper.setProps({ sortDesc: true })
      expect(headers()).toEqual(['descending', 'none', undefined])
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

  describe('container resize (CIB7-2688)', () => {
    let observerCallback

    beforeEach(() => {
      observerCallback = null
      vi.stubGlobal('ResizeObserver', class {
        constructor(callback) { observerCallback = callback }
        observe() {}
        disconnect() {}
      })
    })

    async function mountResizable() {
      const wrapper = mountTable({ resizable: true })
      await wrapper.vm.$nextTick()
      const container = wrapper.vm.$refs.table.parentElement
      const setContainerWidth = (width) =>
        Object.defineProperty(container, 'clientWidth', { configurable: true, value: width })
      const restart = vi.spyOn(wrapper.vm, 'restartColumnWidths')
      return { wrapper, setContainerWidth, restart }
    }

    function drag(wrapper, fromX, toX) {
      wrapper.vm.columnWidths = ['200px', '200px', '200px']
      wrapper.vm.startResize(0, { clientX: fromX })
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: toX }))
    }

    it('keeps the column widths when only the container height changes', async () => {
      const { wrapper, restart } = await mountResizable()
      wrapper.vm.columnWidths = ['100px', '300px', '200px']

      observerCallback()

      expect(restart).not.toHaveBeenCalled()
      expect(wrapper.vm.columnWidths).toEqual(['100px', '300px', '200px'])
    })

    it('recalculates the column widths when the container width changes', async () => {
      const { setContainerWidth, restart } = await mountResizable()

      setContainerWidth(800)
      observerCallback()
      observerCallback()

      expect(restart).toHaveBeenCalledTimes(1)
    })

    it('ignores container size changes while a column is being dragged', async () => {
      const { wrapper, setContainerWidth, restart } = await mountResizable()
      drag(wrapper, 300, 210)

      setContainerWidth(780)
      observerCallback()

      expect(restart).not.toHaveBeenCalled()
      expect(wrapper.vm.columnWidths).toEqual(['110px', '290px', '200px'])
      document.dispatchEvent(new MouseEvent('mouseup'))
    })

    it('keeps the dragged widths after release and takes the current container width as reference', async () => {
      const { wrapper, setContainerWidth, restart } = await mountResizable()
      drag(wrapper, 300, 210)
      setContainerWidth(780)
      document.dispatchEvent(new MouseEvent('mouseup'))

      observerCallback()

      expect(restart).not.toHaveBeenCalled()
      expect(wrapper.vm.resizing).toBe(false)
      expect(wrapper.vm.columnWidths).toEqual(['110px', '290px', '200px'])

      setContainerWidth(900)
      observerCallback()
      expect(restart).toHaveBeenCalledTimes(1)
    })

    it('keeps the column widths when the window changes only its height', async () => {
      const { wrapper } = await mountResizable()
      wrapper.vm.columnWidths = ['100px', '300px', '200px']

      globalThis.dispatchEvent(new Event('resize'))

      expect(wrapper.vm.columnWidths).toEqual(['100px', '300px', '200px'])
    })

    it('keeps the dragged widths when the window is resized during a drag', async () => {
      const { wrapper, setContainerWidth } = await mountResizable()
      drag(wrapper, 300, 210)

      setContainerWidth(780)
      globalThis.dispatchEvent(new Event('resize'))

      expect(wrapper.vm.columnWidths).toEqual(['110px', '290px', '200px'])
      document.dispatchEvent(new MouseEvent('mouseup'))
    })

    it('recalculates the column widths when the window changes the container width', async () => {
      const { wrapper, setContainerWidth } = await mountResizable()
      wrapper.vm.columnWidths = ['100px', '300px', '200px']

      setContainerWidth(800)
      globalThis.dispatchEvent(new Event('resize'))

      expect(wrapper.vm.columnWidths).not.toEqual(['100px', '300px', '200px'])
    })

    it('stops listening to window resize after unmount', async () => {
      const { wrapper, setContainerWidth } = await mountResizable()
      const restart = vi.spyOn(wrapper.vm, 'restartColumnWidths')
      wrapper.unmount()

      setContainerWidth(800)
      globalThis.dispatchEvent(new Event('resize'))

      expect(restart).not.toHaveBeenCalled()
    })

    it('recalculates the column widths when the columns change', async () => {
      const { wrapper } = await mountResizable()
      expect(wrapper.vm.columnWidths).toHaveLength(3)

      await wrapper.setProps({ fields: [...fields, { key: 'role', label: 'table.role' }] })
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.columnWidths).toHaveLength(4)
    })

    it('recalculates the column widths when a column is toggled', async () => {
      const wrapper = mountTable({ resizable: true, fields: [], columns: ['name', 'age', 'status'], columnDefinitions })
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.columnWidths).toHaveLength(3)

      wrapper.vm.toggleColumn({ key: 'age', label: 'table.age' })
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.columnWidths).toHaveLength(2)
    })

    it('keeps the column widths when the same columns are passed again', async () => {
      const { wrapper, restart } = await mountResizable()

      await wrapper.setProps({ fields: fields.map(field => ({ ...field })) })
      await wrapper.vm.$nextTick()

      expect(restart).not.toHaveBeenCalled()
    })

    it('does not narrow a column below the 75 px minimum', async () => {
      const { wrapper } = await mountResizable()
      drag(wrapper, 300, 150)

      expect(wrapper.vm.columnWidths).toEqual(['200px', '200px', '200px'])
      document.dispatchEvent(new MouseEvent('mouseup'))
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
