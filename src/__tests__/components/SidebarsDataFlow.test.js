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
import { SidebarsDataFlow } from '@/library'
import { mountWithDefaults } from '../helpers/mountComponent.js'

const defaultProps = {
  leftOpen: true,
  rightOpen: false,
  leftCaption: 'Filters',
  rightCaption: 'Preview',
}

function mountSidebars(props = {}) {
  return mountWithDefaults(SidebarsDataFlow, {
    props: { ...defaultProps, ...props },
    slots: {
      default: '<div class="main">Main</div>',
      left: '<div class="left-slot">Left</div>',
      right: '<div class="right-slot">Right</div>',
    },
  })
}

describe('SidebarsDataFlow', () => {
  beforeEach(() => {
    vi.stubGlobal('innerWidth', 1200)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders main and left slots', () => {
    const wrapper = mountSidebars()
    expect(wrapper.find('.main').text()).toBe('Main')
    expect(wrapper.find('.left-slot').text()).toBe('Left')
  })

  it('shows collapsed left tab when closed', () => {
    const wrapper = mountSidebars({ leftOpen: false })
    const buttons = wrapper.findAll('button')
    expect(buttons.some(b => b.text().includes('Filters'))).toBe(true)
  })

  it('emits update:leftOpen false on close', async () => {
    const wrapper = mountSidebars({ leftOpen: true })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:leftOpen')).toEqual([[false]])
  })

  it('emits update:leftOpen true from collapsed tab', async () => {
    const wrapper = mountSidebars({ leftOpen: false })
    const openBtn = wrapper.findAll('button').find(
      b => b.isVisible() && b.text().includes('Filters') && b.classes().includes('border-end-0')
    )
    await openBtn.trigger('click')
    expect(wrapper.emitted('update:leftOpen')).toContainEqual([true])
  })

  it('emits update:rightOpen false on right close', async () => {
    const wrapper = mountSidebars({ rightOpen: true })
    const closeBtn = wrapper.findAll('button').find(b => b.text().includes('Preview'))
    await closeBtn.trigger('click')
    expect(wrapper.emitted('update:rightOpen')).toEqual([[false]])
  })

  it('emits update:rightOpen true from collapsed right tab', async () => {
    const wrapper = mountSidebars({ rightOpen: false })
    const openBtn = wrapper.findAll('button').find(
      b => b.isVisible() && b.text().includes('Preview') && b.classes().includes('border-start-0')
    )
    await openBtn.trigger('click')
    expect(wrapper.emitted('update:rightOpen')).toContainEqual([true])
  })

  describe('colClasses', () => {
    it('returns d-none for zero size', () => {
      const wrapper = mountSidebars()
      expect(wrapper.vm.colClasses([0, 6])).toContain('d-none')
    })
  })

  describe('showMain and showRight', () => {
    it('closes both on small screens', () => {
      vi.stubGlobal('innerWidth', 500)
      const wrapper = mountSidebars({ leftOpen: true, rightOpen: true })
      wrapper.vm.showMain()
      expect(wrapper.emitted('update:leftOpen')).toContainEqual([false])
      expect(wrapper.emitted('update:rightOpen')).toContainEqual([false])
    })

    it('showRight opens right and closes left on medium', () => {
      vi.stubGlobal('innerWidth', 700)
      const wrapper = mountSidebars({ leftOpen: true })
      wrapper.vm.showRight()
      expect(wrapper.emitted('update:rightOpen')).toEqual([[true]])
      expect(wrapper.emitted('update:leftOpen')).toContainEqual([false])
    })
  })
})
