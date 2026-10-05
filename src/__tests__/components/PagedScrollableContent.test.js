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
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { PagedScrollableContent } from '@/library'
import { mountWithDefaults } from '../helpers/mountComponent.js'

function createScrollElement(overrides = {}) {
  const listeners = {}
  return {
    scrollTop: 0,
    clientHeight: 500,
    scrollHeight: 1000,
    addEventListener: vi.fn((event, handler) => { listeners[event] = handler }),
    removeEventListener: vi.fn((event) => { delete listeners[event] }),
    triggerScroll() {
      listeners.scroll?.({ target: this })
    },
    ...overrides,
  }
}

function mountPaged(props = {}) {
  return mountWithDefaults(PagedScrollableContent, {
    props: {
      loading: false,
      loadedCount: 10,
      totalCount: 50,
      ...props,
    },
  })
}

describe('PagedScrollableContent', () => {
  describe('display states', () => {
    it('shows loading spinner when loading', () => {
      const wrapper = mountPaged({ loading: true })
      expect(wrapper.find('[data-stub="b-waiting-box"]').exists()).toBe(true)
      expect(wrapper.text()).toContain('commons.loading')
    })

    it('shows no more results when all loaded', () => {
      const wrapper = mountPaged({ loadedCount: 50, totalCount: 50 })
      expect(wrapper.text()).toContain('commons.noMoreResults')
    })

    it('shows load more button when not all loaded', () => {
      const wrapper = mountPaged({ loadedCount: 10, totalCount: 50 })
      expect(wrapper.text()).toContain('commons.loadMore.title')
    })

    it('hides spinner when showLoadingSpinner is false', () => {
      const wrapper = mountPaged({ loading: true, showLoadingSpinner: false })
      expect(wrapper.find('[data-stub="b-waiting-box"]').exists()).toBe(false)
    })
  })

  describe('allLoaded computed', () => {
    it('returns true when loadedCount >= totalCount', () => {
      const wrapper = mountPaged({ loadedCount: 50, totalCount: 50 })
      expect(wrapper.vm.allLoaded).toBe(true)
    })

    it('returns false when totalCount is undefined', () => {
      const wrapper = mountPaged({ loadedCount: 10, totalCount: undefined })
      expect(wrapper.vm.allLoaded).toBe(false)
    })

    it('returns false when more items remain', () => {
      const wrapper = mountPaged({ loadedCount: 10, totalCount: 50 })
      expect(wrapper.vm.allLoaded).toBe(false)
    })
  })

  describe('scroll listener', () => {
    let scrollEl

    beforeEach(() => {
      scrollEl = createScrollElement()
    })

    it('attaches scroll listener on mount', () => {
      mountPaged({ scrollableArea: scrollEl })
      expect(scrollEl.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })
    })

    it('detaches scroll listener on unmount', () => {
      const wrapper = mountPaged({ scrollableArea: scrollEl })
      wrapper.unmount()
      expect(scrollEl.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
    })

    it('reattaches listener when scrollableArea changes', async () => {
      const wrapper = mountPaged({ scrollableArea: scrollEl })
      const newScrollEl = createScrollElement()
      await wrapper.setProps({ scrollableArea: newScrollEl })

      expect(scrollEl.removeEventListener).toHaveBeenCalled()
      expect(newScrollEl.addEventListener).toHaveBeenCalled()
    })

    it('emits load-next-page when scrolled near bottom', () => {
      const wrapper = mountPaged({ scrollableArea: scrollEl })
      scrollEl.scrollTop = 450
      scrollEl.triggerScroll()

      expect(wrapper.emitted('load-next-page')).toHaveLength(1)
    })

    it('does not emit when loading', () => {
      const wrapper = mountPaged({ scrollableArea: scrollEl, loading: true })
      scrollEl.scrollTop = 450
      scrollEl.triggerScroll()

      expect(wrapper.emitted('load-next-page')).toBeUndefined()
    })

    it('does not emit when all loaded', () => {
      const wrapper = mountPaged({ scrollableArea: scrollEl, loadedCount: 50, totalCount: 50 })
      scrollEl.scrollTop = 450
      scrollEl.triggerScroll()

      expect(wrapper.emitted('load-next-page')).toBeUndefined()
    })
  })

  describe('load more button', () => {
    it('emits load-next-page on click', async () => {
      const wrapper = mountPaged({ loadedCount: 10, totalCount: 50 })
      await wrapper.find('button').trigger('click')
      expect(wrapper.emitted('load-next-page')).toHaveLength(1)
    })
  })
})
