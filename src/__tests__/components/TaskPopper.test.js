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
import { h } from 'vue'
import { TaskPopper } from '@/library'
import { mountWithDefaults } from '../helpers/mountComponent.js'

describe('TaskPopper', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  function mountPopper(props = {}) {
    return mountWithDefaults(TaskPopper, {
      props: { title: 'Tasks', placement: 'bottom', ...props },
      slots: {
        default: (slotProps) => [
          h('button', { class: 'add-btn', onClick: () => slotProps.add('task1') }, 'Add'),
          h('button', {
            class: 'dl-btn',
            onClick: () => slotProps.download(new Blob(['x']), 'file.txt'),
          }, 'Download'),
          h('span', { class: 'busy' }, String(slotProps.busy)),
        ],
      },
      attachTo: document.body,
    })
  }

  it('exposes add, download, and busy via slot', () => {
    const wrapper = mountPopper()
    expect(wrapper.find('.add-btn').exists()).toBe(true)
    expect(wrapper.find('.dl-btn').exists()).toBe(true)
    expect(wrapper.find('.busy').text()).toBe('false')
  })

  it('addTask without factory returns updater and opens popover', () => {
    const wrapper = mountPopper()
    const openSpy = vi.spyOn(wrapper.vm.$refs.pop, '$emit')

    const updater = wrapper.vm.addTask('task1', null, null)

    expect(wrapper.vm.tasks).toHaveLength(1)
    expect(wrapper.vm.tasks[0].name).toBe('task1')
    expect(openSpy).toHaveBeenCalledWith('open')
    expect(typeof updater).toBe('function')
  })

  it('calls promiseFactory when provided', () => {
    const wrapper = mountPopper()
    const factory = vi.fn(() => new Promise(() => {}))

    wrapper.vm.addTask('task', null, factory)

    expect(factory).toHaveBeenCalled()
    expect(wrapper.vm.tasks[0].name).toBe('task')
  })

  it('promiseFactory receives progress handlers', async () => {
    const wrapper = mountPopper()
    let capturedProgress
    let capturedFake
    const factory = vi.fn((progress, fake) => {
      capturedProgress = progress
      capturedFake = fake
      return Promise.resolve('done')
    })

    await wrapper.vm.addTask('task', null, factory).catch(() => {})

    expect(typeof capturedProgress).toBe('function')
    expect(typeof capturedFake).toBe('function')
  })

  it('updater sets progress and state when bound to component', () => {
    const wrapper = mountPopper()
    const updater = wrapper.vm.addTask('task', null, null)

    updater.call(wrapper.vm, 50)
    expect(wrapper.vm.tasks[0].progress).toBe(50)
    expect(wrapper.vm.busy).toBe(true)

    updater.call(wrapper.vm, true)
    expect(wrapper.vm.tasks[0].state).toBe(true)
    expect(wrapper.vm.busy).toBe(false)
  })

  it('triggerDownload creates anchor and clicks it', () => {
    const wrapper = mountPopper()
    const clickSpy = vi.fn()
    const createObjectURL = vi.fn().mockReturnValue('blob:url')
    const revokeObjectURL = vi.fn()

    vi.stubGlobal('URL', { createObjectURL, revokeObjectURL })
    const origCreate = document.createElement.bind(document)
    vi.spyOn(document, 'createElement').mockImplementation((tag) => {
      const el = origCreate(tag)
      if (tag === 'a') el.click = clickSpy
      return el
    })

    wrapper.vm.triggerDownload(new Blob(['data']), 'test.txt')

    expect(createObjectURL).toHaveBeenCalled()
    expect(clickSpy).toHaveBeenCalled()

    vi.advanceTimersByTime(500)
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:url')
    vi.unstubAllGlobals()
  })

  it('clears tasks when popover hidden', async () => {
    const wrapper = mountPopper()
    wrapper.vm.tasks = [{ name: 't1' }]
    wrapper.find('[data-stub="b-popover"]').trigger('hidden')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.tasks).toEqual([])
  })
})
