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
import { GenericTabs } from '@/library'
import { mountWithDefaults, createRouterMock } from '../helpers/mountComponent.js'

const tabs = [
  { id: 'overview', text: 'tabs.overview' },
  { id: 'details', text: 'tabs.details' },
]

describe('GenericTabs', () => {
  function mountTabs(props = {}) {
    const routerMock = createRouterMock()
    const wrapper = mountWithDefaults(GenericTabs, {
      props: {
        tabs,
        modelValue: 'overview',
        ...props,
      },
      routerMock,
      attachTo: document.body,
    })
    return { wrapper, routerMock }
  }

  it('renders tab labels via $t', () => {
    const { wrapper } = mountTabs()
    expect(wrapper.text()).toContain('tabs.overview')
    expect(wrapper.text()).toContain('tabs.details')
  })

  it('applies active class to current tab', () => {
    const { wrapper } = mountTabs({ modelValue: 'overview' })
    const links = wrapper.findAll('.nav-link')
    expect(links[0].classes()).toContain('active')
    expect(links[1].classes()).not.toContain('active')
  })

  it('click emits update:modelValue and tab-click', async () => {
    const { wrapper } = mountTabs()
    const links = wrapper.findAll('.nav-link')
    await links[1].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual([['details']])
    expect(wrapper.emitted('tab-click')).toHaveLength(1)
    expect(wrapper.emitted('tab-click')[0][0].tab.id).toBe('details')
  })

  it('getTabUrl uses router resolve', () => {
    const { wrapper, routerMock } = mountTabs()
    const url = wrapper.vm.getTabUrl(tabs[1])
    expect(url).toBeDefined()
    expect(routerMock.router.resolve).toBeDefined()
  })

  it('applies border-start-0 to first tab', () => {
    const { wrapper } = mountTabs()
    const links = wrapper.findAll('.nav-link')
    expect(links[0].classes()).toContain('border-start-0')
  })
})
