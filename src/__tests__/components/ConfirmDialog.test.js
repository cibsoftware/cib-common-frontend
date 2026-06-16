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
import { describe, it, expect, vi } from 'vitest'
import { ConfirmDialog } from '@/library'
import { mountWithDefaults } from '../helpers/mountComponent.js'

describe('ConfirmDialog', () => {
  function mountDialog(options = {}) {
    return mountWithDefaults(ConfirmDialog, {
      slots: {
        default: '<span class="msg">{{ param }}</span>',
      },
      ...options,
    })
  }

  it('show stores param and calls modal show', () => {
    const wrapper = mountDialog()
    const showSpy = vi.spyOn(wrapper.vm.$refs.modal, 'show')

    wrapper.vm.show('delete-item')

    expect(wrapper.vm.param).toBe('delete-item')
    expect(showSpy).toHaveBeenCalled()
  })

  it('scoped slot receives param', async () => {
    const wrapper = mountDialog()
    wrapper.vm.show('test-param')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.msg').text()).toBe('test-param')
  })

  it('OK button emits ok with param', async () => {
    const wrapper = mountDialog()
    const hideSpy = vi.spyOn(wrapper.vm.$refs.modal, 'hide')
    wrapper.vm.show({ id: 42 })
    await wrapper.vm.$nextTick()

    const buttons = wrapper.findAll('[data-stub="b-button"]')
    await buttons[1].trigger('click')

    expect(wrapper.emitted('ok')).toEqual([[{ id: 42 }]])
    expect(hideSpy).toHaveBeenCalledWith('ok')
  })

  it('cancel button calls modal hide', async () => {
    const wrapper = mountDialog()
    const hideSpy = vi.spyOn(wrapper.vm.$refs.modal, 'hide')

    const buttons = wrapper.findAll('[data-stub="b-button"]')
    await buttons[0].trigger('click')

    expect(hideSpy).toHaveBeenCalledWith('cancel')
  })

  it('uses custom okTitle when provided', () => {
    const wrapper = mountDialog({
      props: { okTitle: 'Delete' },
    })

    const buttons = wrapper.findAll('[data-stub="b-button"]')
    expect(buttons[1].text()).toBe('Delete')
  })

  it('uses default ok title from i18n', () => {
    const wrapper = mountDialog()

    const buttons = wrapper.findAll('[data-stub="b-button"]')
    expect(buttons[1].text()).toBe('confirm.ok')
  })
})
