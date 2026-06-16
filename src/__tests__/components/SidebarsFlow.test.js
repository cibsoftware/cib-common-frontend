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
import { SidebarsFlow } from '@/library'
import { mountWithDefaults } from '../helpers/mountComponent.js'

const defaultProps = {
  leftOpen: true,
  rightOpen: false,
  leftCaption: 'Tasks',
  rightCaption: 'Details',
  number: 5,
}

function mountSidebars(props = {}) {
  return mountWithDefaults(SidebarsFlow, {
    props: { ...defaultProps, ...props },
    slots: {
      default: '<div class="main">Main</div>',
      left: '<div class="left-slot">Left</div>',
      right: '<div class="right-slot">Right</div>',
    },
  })
}

describe('SidebarsFlow', () => {
  beforeEach(() => {
    vi.stubGlobal('innerWidth', 1200)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders main slot content', () => {
    const wrapper = mountSidebars()
    expect(wrapper.find('.main').text()).toBe('Main')
  })

  it('renders left sidebar when leftOpen', () => {
    const wrapper = mountSidebars({ leftOpen: true })
    expect(wrapper.find('.left-slot').text()).toBe('Left')
    expect(wrapper.text()).toContain('Tasks')
  })

  it('shows collapsed left tab when left is closed', () => {
    const wrapper = mountSidebars({ leftOpen: false })
    const collapsedButtons = wrapper.findAll('[data-stub="b-button"]')
    expect(collapsedButtons.some(b => b.text().includes('Tasks'))).toBe(true)
  })

  it('emits update:leftOpen false when close button clicked', async () => {
    const wrapper = mountSidebars({ leftOpen: true })
    const closeBtn = wrapper.findAll('[data-stub="b-button"]')[0]
    await closeBtn.trigger('click')
    expect(wrapper.emitted('update:leftOpen')).toEqual([[false]])
  })

  it('emits update:leftOpen true when collapsed tab clicked', async () => {
    const wrapper = mountSidebars({ leftOpen: false })
    const openBtn = wrapper.findAll('[data-stub="b-button"]').find(
      b => b.isVisible() && b.text().includes('Tasks') && b.classes().includes('border-end-0')
    )
    await openBtn.trigger('click')
    expect(wrapper.emitted('update:leftOpen')).toContainEqual([true])
  })

  it('renders number badge when number prop is set', () => {
    const wrapper = mountSidebars({ leftOpen: true, number: 5 })
    expect(wrapper.text()).toContain('5')
  })

  it('emits update:rightOpen when right sidebar close clicked', async () => {
    const wrapper = mountSidebars({ rightOpen: true })
    const rightCloseBtn = wrapper.findAll('[data-stub="b-button"]').find(b => b.text().includes('Details'))
    await rightCloseBtn.trigger('click')
    expect(wrapper.emitted('update:rightOpen')).toEqual([[false]])
  })

  describe('colClasses', () => {
    it('returns d-none for zero size', () => {
      const wrapper = mountSidebars()
      expect(wrapper.vm.colClasses([0, 6, 4])).toContain('d-none')
    })

    it('returns col classes for sizes', () => {
      const wrapper = mountSidebars()
      const result = wrapper.vm.colClasses([12, 6, 4, 3, 3])
      expect(result).toContain('col-12')
      expect(result).toContain('col-sm-6')
    })
  })

  describe('middleClasses', () => {
    it('returns col-12 when both sidebars closed', () => {
      const wrapper = mountSidebars({ leftOpen: false, rightOpen: false })
      expect(wrapper.vm.middleClasses).toBe('col-12')
    })

    it('computes offset when left is open', () => {
      const wrapper = mountSidebars({ leftOpen: true, rightOpen: false })
      expect(wrapper.vm.middleClasses).toContain('offset-')
    })
  })

  describe('showMain', () => {
    it('closes both sidebars on small screens', () => {
      vi.stubGlobal('innerWidth', 500)
      const wrapper = mountSidebars({ leftOpen: true, rightOpen: true })
      wrapper.vm.showMain()
      expect(wrapper.emitted('update:leftOpen')).toContainEqual([false])
      expect(wrapper.emitted('update:rightOpen')).toContainEqual([false])
    })

    it('closes left when right open on medium screen with keepRight', () => {
      vi.stubGlobal('innerWidth', 700)
      const wrapper = mountSidebars({ leftOpen: true, rightOpen: true })
      wrapper.vm.showMain(true)
      expect(wrapper.emitted('update:leftOpen')).toContainEqual([false])
    })
  })

  describe('showRight', () => {
    it('opens right sidebar', () => {
      const wrapper = mountSidebars()
      wrapper.vm.showRight()
      expect(wrapper.emitted('update:rightOpen')).toEqual([[true]])
    })

    it('closes left on medium screens', () => {
      vi.stubGlobal('innerWidth', 700)
      const wrapper = mountSidebars({ leftOpen: true })
      wrapper.vm.showRight()
      expect(wrapper.emitted('update:leftOpen')).toContainEqual([false])
    })
  })
})
