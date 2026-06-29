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
import { FilterableSelect } from '@/library'
import { mountWithDefaults } from '../helpers/mountComponent.js'

const elements = [
  { id: 'user1', firstName: 'John', lastName: 'Doe' },
  { id: 'user2', firstName: 'Jane', lastName: 'Smith' },
  { id: 'admin', firstName: 'Admin', lastName: 'User' },
]

describe('FilterableSelect', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  function mountSelect(props = {}) {
    return mountWithDefaults(FilterableSelect, {
      props: {
        elements,
        value: '',
        ...props,
      },
    })
  }

  describe('filteredElements', () => {
    it('filters array elements by id', async () => {
      const wrapper = mountSelect()
      wrapper.vm.filter = 'user1'
      await wrapper.vm.$nextTick()

      const filtered = wrapper.vm.filteredElements
      expect(Object.keys(filtered)).toEqual(['user1'])
    })

    it('filters array elements by name', async () => {
      const wrapper = mountSelect()
      wrapper.vm.filter = 'jane'
      await wrapper.vm.$nextTick()

      const filtered = wrapper.vm.filteredElements
      expect(Object.keys(filtered)).toEqual(['user2'])
    })

    it('filters object elements', async () => {
      const wrapper = mountSelect({
        elements: {
          a: elements[0],
          b: elements[1],
        },
      })
      wrapper.vm.filter = 'smith'
      await wrapper.vm.$nextTick()

      expect(Object.keys(wrapper.vm.filteredElements)).toEqual(['b'])
    })

    it('returns empty when no elements', async () => {
      const wrapper = mountSelect({ elements: null })
      wrapper.vm.filter = 'test'
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.filteredElements).toEqual({})
    })
  })

  describe('filter watcher', () => {
    it('emits update:loading when filter >= 3 chars', async () => {
      const wrapper = mountSelect()
      wrapper.vm.filter = 'abc'
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted('update:loading')).toContainEqual([true])
    })

    it('emits clean-elements when filter < 3 chars', async () => {
      const wrapper = mountSelect()
      wrapper.vm.filter = 'ab'
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted('clean-elements')).toContainEqual(['ab'])
      expect(wrapper.emitted('update:loading')).toContainEqual([false])
    })

    it('does not emit loading when already loading', async () => {
      const wrapper = mountSelect({ loading: true })
      wrapper.vm.filter = 'abc'
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted('update:loading')).toBeUndefined()
    })
  })

  describe('debounced enter', () => {
    it('emits enter after debounce when filter >= 3', async () => {
      const wrapper = mountSelect()
      const filterInput = wrapper.findAll('[data-stub="b-form-input"]')[1]
      await filterInput.setValue('john')
      await filterInput.trigger('input')

      vi.advanceTimersByTime(800)

      expect(wrapper.emitted('enter')).toEqual([['john']])
    })
  })

  describe('isValid computed', () => {
    it('returns true when noInvalidValues is false', () => {
      const wrapper = mountSelect({ value: 'unknown', noInvalidValues: false })
      expect(wrapper.vm.isValid).toBe(true)
    })

    it('returns true when value is empty', () => {
      const wrapper = mountSelect({ value: '', noInvalidValues: true })
      expect(wrapper.vm.isValid).toBe(true)
    })

    it('returns true when value matches element id', () => {
      const wrapper = mountSelect({ value: 'user1', noInvalidValues: true })
      expect(wrapper.vm.isValid).toBe(true)
    })

    it('returns false when value does not match any element', () => {
      const wrapper = mountSelect({ value: 'unknown', noInvalidValues: true })
      expect(wrapper.vm.isValid).toBe(false)
    })
  })
})
