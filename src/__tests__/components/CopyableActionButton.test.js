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
import { CopyableActionButton } from '@/library'
import { mountWithDefaults, createRouterMock } from '../helpers/mountComponent.js'

describe('CopyableActionButton', () => {
  it('does not render when valueToCopy is empty', () => {
    const wrapper = mountWithDefaults(CopyableActionButton, {
      props: { displayValue: '' },
    })
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('renders as button when clickable and no link', () => {
    const wrapper = mountWithDefaults(CopyableActionButton, {
      props: { displayValue: 'Hello' },
    })
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.text()).toContain('Hello')
  })

  it('renders as div when not clickable', () => {
    const wrapper = mountWithDefaults(CopyableActionButton, {
      props: { displayValue: 'Text', clickable: false },
    })
    expect(wrapper.find('div.position-relative').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('renders as router-link when to prop is set', () => {
    const routerMock = createRouterMock()
    const wrapper = mountWithDefaults(CopyableActionButton, {
      props: { displayValue: 'Link', to: '/path' },
      routerMock,
    })
    expect(wrapper.find('[data-stub="router-link"]').exists()).toBe(true)
  })

  it('renders as anchor when to and newTab are set', () => {
    const routerMock = createRouterMock()
    const wrapper = mountWithDefaults(CopyableActionButton, {
      props: { displayValue: 'Link', to: '/path', newTab: true },
      routerMock,
    })
    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.find('a').attributes('target')).toBe('_blank')
  })

  it('uses http URL as-is for anchor', () => {
    const routerMock = createRouterMock()
    const wrapper = mountWithDefaults(CopyableActionButton, {
      props: { displayValue: 'Ext', to: 'https://example.com', newTab: true },
      routerMock,
    })
    expect(wrapper.find('a').attributes('href')).toBe('https://example.com')
  })

  it('shows copy button on hover', async () => {
    const wrapper = mountWithDefaults(CopyableActionButton, {
      props: { displayValue: 'Copy me' },
    })

    expect(wrapper.find('.mdi-content-copy').exists()).toBe(false)
    await wrapper.find('button').trigger('mouseenter')
    expect(wrapper.find('.mdi-content-copy').exists()).toBe(true)
  })

  it('handleClick emits click for button', async () => {
    const wrapper = mountWithDefaults(CopyableActionButton, {
      props: { displayValue: 'Click' },
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('handleClick does not emit for router link', async () => {
    const routerMock = createRouterMock()
    const wrapper = mountWithDefaults(CopyableActionButton, {
      props: { displayValue: 'Link', to: '/path' },
      routerMock,
    })
    wrapper.vm.handleClick({ stopPropagation: vi.fn() })
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('handleCopy emits copy with copyValue or displayValue', async () => {
    const wrapper = mountWithDefaults(CopyableActionButton, {
      props: { displayValue: 'Display', copyValue: 'Secret' },
    })
    await wrapper.find('button').trigger('mouseenter')
    await wrapper.find('.mdi-content-copy').trigger('click')
    expect(wrapper.emitted('copy')).toEqual([['Secret']])
  })

  it('uses displayValue for copy when copyValue not set', async () => {
    const wrapper = mountWithDefaults(CopyableActionButton, {
      props: { displayValue: 'Display' },
    })
    wrapper.vm.handleCopy()
    expect(wrapper.emitted('copy')).toEqual([['Display']])
  })

  it('bindAttrs resolves object route for anchor', () => {
    const routerMock = createRouterMock({
      router: {
        resolve: (to) => ({ path: '/resolved', query: { q: '1' } }),
      },
    })
    const wrapper = mountWithDefaults(CopyableActionButton, {
      props: { displayValue: 'Link', to: { path: '/foo' }, newTab: true },
      routerMock,
    })
    const href = wrapper.find('a').attributes('href')
    expect(href).toContain('#/resolved')
  })
})
