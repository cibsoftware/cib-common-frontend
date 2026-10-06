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
    await wrapper.find('div').trigger('mouseenter')
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
    await wrapper.find('div').trigger('mouseenter')
    await wrapper.find('.mdi-content-copy').trigger('click')
    expect(wrapper.emitted('copy')).toEqual([['Secret']])
  })

  it('handleCopy emits copy when rendered as anchor in new tab mode', async () => {
    const routerMock = createRouterMock()
    const wrapper = mountWithDefaults(CopyableActionButton, {
      props: { displayValue: 'Display', copyValue: 'Secret', to: '/path', newTab: true },
      routerMock,
    })

    await wrapper.find('div').trigger('mouseenter')
    await wrapper.find('.mdi-content-copy').trigger('click')
    expect(wrapper.emitted('copy')).toEqual([['Secret']])
  })

  it('uses displayValue for copy when copyValue not set', async () => {
    const wrapper = mountWithDefaults(CopyableActionButton, {
      props: { displayValue: 'Display' },
    })
    await wrapper.find('div').trigger('mouseenter')
    await wrapper.find('.mdi-content-copy').trigger('click')
    expect(wrapper.emitted('copy')).toEqual([['Display']])
  })

  it('bindAttrs resolves object route for anchor', () => {
    const routerMock = createRouterMock({
      router: {
        resolve: () => ({ path: '/resolved', query: { q: '1' } }),
      },
    })
    const wrapper = mountWithDefaults(CopyableActionButton, {
      props: { displayValue: 'Link', to: { path: '/foo' }, newTab: true },
      routerMock,
    })
    const href = wrapper.find('a').attributes('href')
    expect(href).toContain('#/resolved')
  })

  describe('consumer use cases', () => {
    // jsdom never matches :focus-visible, so emulate a browser: keyboard focus by default
    const nativeMatches = Element.prototype.matches
    const stubFocusVisible = (value) => vi.spyOn(Element.prototype, 'matches').mockImplementation(function(selector) {
      if (selector === ':focus-visible') {
        if (value instanceof Error) throw value
        return value
      }
      return nativeMatches.call(this, selector)
    })

    beforeEach(() => {
      stubFocusVisible(true)
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    const hover = (wrapper) => wrapper.find('div').trigger('mouseenter')
    const copyButton = (wrapper) => wrapper.find('.mdi-content-copy')

    describe('identifier in a table cell (to + title + @copy)', () => {
      it('renders a router-link with a route location object', () => {
        const to = { name: 'process', params: { processKey: 'p', versionIndex: 1 }, query: { tab: 'instances' } }
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'abc-123', title: 'Instance:\nabc-123', to },
          routerMock: createRouterMock(),
        })
        const link = wrapper.find('[data-stub="router-link"]')
        expect(link.exists()).toBe(true)
        expect(link.text()).toBe('abc-123')
        expect(link.attributes('title')).toBe('Instance:\nabc-123')
        expect(wrapper.find('button').exists()).toBe(false)
      })

      it('does not emit click when a router-link is clicked', async () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'abc-123', to: { name: 'process' } },
          routerMock: createRouterMock(),
        })
        await wrapper.find('[data-stub="router-link"]').trigger('click')
        expect(wrapper.emitted('click')).toBeUndefined()
      })

      it('copies the full value when copy button is used next to a router-link', async () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'abc-123', to: '/path' },
          routerMock: createRouterMock(),
        })
        await hover(wrapper)
        await copyButton(wrapper).trigger('click')
        expect(wrapper.emitted('copy')).toEqual([['abc-123']])
        expect(wrapper.emitted('click')).toBeUndefined()
      })
    })

    describe('label with a different copy value', () => {
      it('displays displayValue and copies copyValue', async () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'John Doe', copyValue: 'user-7f3a9c12', title: 'Copy user ID' },
        })
        expect(wrapper.find('button').text()).toBe('John Doe')
        expect(wrapper.find('button').attributes('title')).toBe('Copy user ID')
        await hover(wrapper)
        await copyButton(wrapper).trigger('click')
        expect(wrapper.emitted('copy')).toEqual([['user-7f3a9c12']])
      })

      it('uses displayValue as title by default', () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Hello' },
        })
        expect(wrapper.find('button').attributes('title')).toBe('Hello')
      })

      it('renders when only copyValue is provided', async () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: '', copyValue: 'only-copy' },
        })
        expect(wrapper.find('button').exists()).toBe(true)
        await hover(wrapper)
        await copyButton(wrapper).trigger('click')
        expect(wrapper.emitted('copy')).toEqual([['only-copy']])
      })
    })

    describe('non-clickable copy element', () => {
      it('renders a div instead of a button and never emits click', async () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'ABCDE', copyValue: '12345', clickable: false },
        })
        expect(wrapper.find('button').exists()).toBe(false)
        await wrapper.find('.text-truncate').trigger('click')
        expect(wrapper.emitted('click')).toBeUndefined()
        await hover(wrapper)
        await copyButton(wrapper).trigger('click')
        expect(wrapper.emitted('copy')).toEqual([['12345']])
      })

      it('prefers the link over clickable=false when to is set', () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Link', clickable: false, to: '/path' },
          routerMock: createRouterMock(),
        })
        expect(wrapper.find('[data-stub="router-link"]').exists()).toBe(true)
      })
    })

    describe('clickable action with copy', () => {
      it('emits click with the event and stops its propagation to the parent', async () => {
        const parentClick = vi.fn()
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'john@example.com' },
          attrs: { onClick: undefined },
          attachTo: document.body,
        })
        wrapper.element.parentElement.addEventListener('click', parentClick)
        await wrapper.find('button').trigger('click')
        expect(wrapper.emitted('click')).toHaveLength(1)
        expect(wrapper.emitted('click')[0][0]).toBeInstanceOf(Event)
        expect(parentClick).not.toHaveBeenCalled()
        wrapper.unmount()
      })

      it('handles a programmatic call without an event', () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Click' },
        })
        expect(() => wrapper.vm.handleClick()).not.toThrow()
        expect(wrapper.emitted('click')).toEqual([[undefined]])
      })

      it('copying does not emit click and does not bubble to the parent', async () => {
        const parentClick = vi.fn()
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'john@example.com' },
          attachTo: document.body,
        })
        wrapper.element.parentElement.addEventListener('click', parentClick)
        await hover(wrapper)
        await copyButton(wrapper).trigger('click')
        expect(wrapper.emitted('copy')).toEqual([['john@example.com']])
        expect(wrapper.emitted('click')).toBeUndefined()
        expect(parentClick).not.toHaveBeenCalled()
        wrapper.unmount()
      })

      it('renders a button for clickable=true and a non-button for clickable=false', async () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'File.pdf', clickable: true },
        })
        expect(wrapper.find('button.btn-link').exists()).toBe(true)
        await wrapper.setProps({ clickable: false })
        expect(wrapper.find('button.btn-link').exists()).toBe(false)
      })
    })

    describe('link in new tab', () => {
      it('renders an anchor with rel and target for an external URL', () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Docs', copyValue: 'https://docs.example.com', to: 'https://docs.example.com', newTab: true },
          routerMock: createRouterMock(),
        })
        const a = wrapper.find('a')
        expect(a.attributes('href')).toBe('https://docs.example.com')
        expect(a.attributes('target')).toBe('_blank')
        expect(a.attributes('rel')).toBe('noopener')
      })

      it('prefixes a plain internal path with # for hash mode', () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Internal', to: '/process/foo', newTab: true },
          routerMock: createRouterMock(),
        })
        expect(wrapper.find('a').attributes('href')).toBe('#/process/foo')
      })

      it('resolves a route location object including its query', () => {
        const routerMock = createRouterMock({
          router: { resolve: () => ({ path: '/process/foo', query: { tab: 'jobs' } }) },
        })
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Internal', to: { name: 'process' }, newTab: true },
          routerMock,
        })
        expect(wrapper.find('a').attributes('href')).toContain('#/process/foo?tab=jobs')
      })

      it('omits the query string when the resolved route has no query', () => {
        const routerMock = createRouterMock({
          router: { resolve: () => ({ path: '/process/foo', query: undefined }) },
        })
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Internal', to: { name: 'process' }, newTab: true },
          routerMock,
        })
        const href = wrapper.find('a').attributes('href')
        expect(href).toMatch(/#\/process\/foo$/)
        expect(href).not.toContain('?')
      })

      it('omits the trailing question mark when the resolved route has an empty query object', () => {
        // vue-router always returns a query object, which is empty for routes without query parameters
        const routerMock = createRouterMock({
          router: { resolve: () => ({ path: '/process/foo', query: {} }) },
        })
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Internal', to: { name: 'process' }, newTab: true },
          routerMock,
        })
        expect(wrapper.find('a').attributes('href')).toMatch(/#\/process\/foo$/)
      })

      it('encodes multiple query parameters', () => {
        const routerMock = createRouterMock({
          router: { resolve: () => ({ path: '/process/foo', query: { tab: 'jobs', tenantId: 'a b' } }) },
        })
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Internal', to: { name: 'process' }, newTab: true },
          routerMock,
        })
        expect(wrapper.find('a').attributes('href')).toMatch(/#\/process\/foo\?tab=jobs&tenantId=a\+b$/)
      })

      it('renders an anchor without href for a route location object when no router is available', () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Internal', to: { name: 'process' }, newTab: true },
        })
        const a = wrapper.find('a')
        expect(a.exists()).toBe(true)
        expect(a.attributes('href')).toBeUndefined()
        expect(a.attributes('target')).toBe('_blank')
      })

      it('renders a button when newTab is set without a destination', () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'No link', newTab: true },
        })
        expect(wrapper.find('button').exists()).toBe(true)
        expect(wrapper.find('a').exists()).toBe(false)
      })
    })

    describe('attribute fallthrough (regression for CIB7-1632)', () => {
      it('passes target="_blank" to the router-link so navigation opens in a new tab', () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Definition', to: { name: 'process' } },
          attrs: { target: '_blank' },
          routerMock: createRouterMock(),
        })
        expect(wrapper.find('[data-stub="router-link"]').attributes('target')).toBe('_blank')
        expect(wrapper.find('div.position-relative').attributes('target')).toBeUndefined()
      })

      it('passes class to the interactive element and not to the wrapper', () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Text', clickable: false },
          attrs: { class: 'pt-2' },
        })
        expect(wrapper.find('.text-truncate').classes()).toContain('pt-2')
        expect(wrapper.find('div.position-relative').classes()).not.toContain('pt-2')
      })

      it('keeps its own classes when a consumer adds classes to a clickable button', () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'File.pdf' },
          attrs: { class: 'w-100 text-start' },
        })
        expect(wrapper.find('button').classes()).toEqual(expect.arrayContaining(['btn', 'btn-link', 'text-truncate', 'text-start', 'w-100']))
      })

      it('passes arbitrary attributes such as data-testid and id to the interactive element', () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Text' },
          attrs: { 'data-testid': 'cell', id: 'my-id' },
        })
        expect(wrapper.find('button').attributes('data-testid')).toBe('cell')
        expect(wrapper.find('button').attributes('id')).toBe('my-id')
        expect(wrapper.find('div.position-relative').attributes('data-testid')).toBeUndefined()
      })

      it('does not let consumer attributes override the computed href of a new-tab anchor', () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Docs', to: 'https://docs.example.com', newTab: true },
          attrs: { href: 'https://evil.example.com' },
          routerMock: createRouterMock(),
        })
        expect(wrapper.find('a').attributes('href')).toBe('https://docs.example.com')
      })
    })

    describe('list of copyable values (v-for)', () => {
      it('tracks hover independently for every instance', async () => {
        const wrapper = mountWithDefaults({
          components: { CopyableActionButton },
          template: '<ul><li v-for="k in keys" :key="k"><CopyableActionButton :display-value="k" :clickable="false" /></li></ul>',
          data: () => ({ keys: ['ORDER-1', 'ORDER-2', 'INVOICE-3'] }),
        })
        expect(wrapper.findAll('.position-relative')).toHaveLength(3)
        await wrapper.findAll('.position-relative')[1].trigger('mouseenter')
        expect(wrapper.findAll('.mdi-content-copy')).toHaveLength(1)
        expect(wrapper.findAll('li')[1].find('.mdi-content-copy').exists()).toBe(true)
      })

      it('emits the value of the instance that was copied', async () => {
        const onCopy = vi.fn()
        const wrapper = mountWithDefaults({
          components: { CopyableActionButton },
          template: '<ul><li v-for="k in keys" :key="k"><CopyableActionButton :display-value="k" :clickable="false" @copy="onCopy" /></li></ul>',
          data: () => ({ keys: ['ORDER-1', 'ORDER-2'] }),
          methods: { onCopy },
        })
        await wrapper.findAll('.position-relative')[1].trigger('mouseenter')
        await wrapper.find('.mdi-content-copy').trigger('click')
        expect(onCopy).toHaveBeenCalledExactlyOnceWith('ORDER-2')
      })
    })

    describe('optional value', () => {
      it.each([[''], [undefined]])('renders no markup for displayValue=%s without copyValue', (displayValue) => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue },
        })
        expect(wrapper.find('div').exists()).toBe(false)
        expect(wrapper.html()).toBe('<!--v-if-->')
      })

      it('renders again once a value becomes available', async () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: '' },
        })
        await wrapper.setProps({ displayValue: 'late' })
        expect(wrapper.find('button').text()).toBe('late')
      })
    })

    describe('copy button behaviour and accessibility', () => {
      it('is hidden until hover and hides again on mouseleave', async () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Hover' },
        })
        expect(copyButton(wrapper).exists()).toBe(false)
        await hover(wrapper)
        expect(copyButton(wrapper).exists()).toBe(true)
        await wrapper.find('div').trigger('mouseleave')
        expect(copyButton(wrapper).exists()).toBe(false)
      })

      it('is shown on keyboard focus and hidden on focus loss', async () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Focus' },
        })
        await wrapper.find('button').trigger('focusin')
        expect(copyButton(wrapper).exists()).toBe(true)
        await wrapper.find('div').trigger('focusout')
        expect(copyButton(wrapper).exists()).toBe(false)
      })

      it('keeps the copy button while focus moves from the main element to it', async () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Tab' },
        })
        await wrapper.find('button').trigger('focusin')
        const copy = copyButton(wrapper)
        // the browser removes DOM nodes between focusout and focusin, so the copy button must survive focusout
        await wrapper.find('button').trigger('focusout', { relatedTarget: copy.element })
        expect(copyButton(wrapper).exists()).toBe(true)
        await copy.trigger('focusin')
        expect(copyButton(wrapper).exists()).toBe(true)
      })

      it('keeps the copy button while focus moves back from it to the main element', async () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Tab' },
        })
        await wrapper.find('button').trigger('focusin')
        const copy = copyButton(wrapper)
        await copy.trigger('focusin')
        await copy.trigger('focusout', { relatedTarget: wrapper.find('button').element })
        expect(copyButton(wrapper).exists()).toBe(true)
      })

      it('hides the copy button when focus leaves the component', async () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Tab' },
          attachTo: document.body,
        })
        const outside = document.createElement('input')
        document.body.appendChild(outside)
        await wrapper.find('button').trigger('focusin')
        await copyButton(wrapper).trigger('focusin')
        await copyButton(wrapper).trigger('focusout', { relatedTarget: outside })
        expect(copyButton(wrapper).exists()).toBe(false)
        outside.remove()
        wrapper.unmount()
      })

      it('keeps the copy button while it has focus even if the mouse pointer leaves', async () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Tab' },
        })
        await hover(wrapper)
        await copyButton(wrapper).trigger('focusin')
        await wrapper.find('div').trigger('mouseleave')
        expect(copyButton(wrapper).exists()).toBe(true)
      })

      it('keeps the copy button while the mouse is over it after focus is lost', async () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Tab' },
        })
        await hover(wrapper)
        await wrapper.find('div').trigger('focusout')
        expect(copyButton(wrapper).exists()).toBe(true)
      })

      it('does not show the copy button for focus caused by a mouse click', async () => {
        vi.restoreAllMocks()
        stubFocusVisible(false)
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Mouse' },
        })
        await wrapper.find('button').trigger('focusin')
        expect(copyButton(wrapper).exists()).toBe(false)
      })

      it('shows the copy button when the user starts using the keyboard on an element focused by mouse', async () => {
        vi.restoreAllMocks()
        const focusVisible = stubFocusVisible(false)
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Mouse then keyboard' },
        })
        await wrapper.find('button').trigger('focusin')
        expect(copyButton(wrapper).exists()).toBe(false)
        focusVisible.mockRestore()
        stubFocusVisible(true) // the browser now treats the focused element as :focus-visible
        await wrapper.find('button').trigger('keydown', { key: 'Tab' })
        expect(copyButton(wrapper).exists()).toBe(true)
      })

      it('does not show the copy button on a key press while the focus is not keyboard focus', async () => {
        vi.restoreAllMocks()
        stubFocusVisible(false)
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Mouse' },
        })
        await wrapper.find('button').trigger('keydown', { key: 'a' })
        expect(copyButton(wrapper).exists()).toBe(false)
      })

      it('treats focus as keyboard focus when :focus-visible is not supported', async () => {
        vi.restoreAllMocks()
        stubFocusVisible(new SyntaxError('unsupported selector'))
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Old browser' },
        })
        await wrapper.find('button').trigger('focusin')
        expect(copyButton(wrapper).exists()).toBe(true)
      })

      it('adds right padding to the main element while hovered', async () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Pad' },
        })
        expect(wrapper.find('button.btn-link').classes()).not.toContain('pe-4')
        await hover(wrapper)
        expect(wrapper.find('button.btn-link').classes()).toContain('pe-4')
      })

      it('is not nested inside the link or button it belongs to', async () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Nested?', to: '/path' },
          routerMock: createRouterMock(),
        })
        await hover(wrapper)
        expect(wrapper.find('a .mdi-content-copy').exists()).toBe(false)
        expect(wrapper.find('button button').exists()).toBe(false)
      })

      it('has type=button, an aria-label and a tooltip containing the copied value', async () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Show', copyValue: 'Hidden' },
        })
        await hover(wrapper)
        const btn = copyButton(wrapper)
        expect(btn.attributes('type')).toBe('button')
        expect(btn.attributes('aria-label')).toBe('commons.copyValue: Hidden')
        expect(btn.attributes('title')).toBe('commons.copyValue:\nHidden')
      })

      it('names the copy button after the displayed value so each cell is distinguishable', async () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'John Doe', copyValue: 'user-7f3a9c12' },
        })
        await hover(wrapper)
        expect(copyButton(wrapper).attributes('aria-label')).toBe('commons.copyValue: user-7f3a9c12')
      })

      it('falls back to the copy value for the aria-label when nothing is displayed', async () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: '', copyValue: 'only-copy' },
        })
        await hover(wrapper)
        expect(copyButton(wrapper).attributes('aria-label')).toBe('commons.copyValue: only-copy')
      })

      it.each(['enter', 'space'])('emits copy exactly once on keydown.%s without bubbling', async (key) => {
        const parentKeydown = vi.fn()
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Key' },
          attachTo: document.body,
        })
        wrapper.element.parentElement.addEventListener('keydown', parentKeydown)
        await hover(wrapper)
        await copyButton(wrapper).trigger(`keydown.${key}`)
        expect(wrapper.emitted('copy')).toEqual([['Key']])
        expect(parentKeydown).not.toHaveBeenCalled()
        wrapper.unmount()
      })

      it('does not submit a surrounding form', async () => {
        const onSubmit = vi.fn((e) => e.preventDefault())
        const wrapper = mountWithDefaults({
          components: { CopyableActionButton },
          template: '<form @submit="onSubmit"><CopyableActionButton display-value="Form" /></form>',
          methods: { onSubmit },
        }, { attachTo: document.body })
        await wrapper.find('.position-relative').trigger('mouseenter')
        await wrapper.find('.mdi-content-copy').trigger('click')
        expect(onSubmit).not.toHaveBeenCalled()
        wrapper.unmount()
      })
    })

    describe('copied feedback', () => {
      afterEach(() => {
        vi.useRealTimers()
      })

      const copy = async (wrapper) => {
        await hover(wrapper)
        await copyButton(wrapper).trigger('click')
      }

      it('shows the copy icon and an empty live region before anything was copied', async () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Value' },
        })
        await hover(wrapper)
        expect(wrapper.find('.mdi-content-copy').exists()).toBe(true)
        expect(wrapper.find('.mdi-check').exists()).toBe(false)
        const live = wrapper.find('[aria-live="polite"]')
        expect(live.exists()).toBe(true)
        expect(live.classes()).toContain('visually-hidden')
        expect(live.text()).toBe('')
      })

      it('switches to a check icon and announces "copied" after copying', async () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Value' },
        })
        await copy(wrapper)
        expect(wrapper.find('.mdi-check').exists()).toBe(true)
        expect(wrapper.find('.mdi-content-copy').exists()).toBe(false)
        expect(wrapper.find('[aria-live="polite"]').text()).toBe('commons.copied')
      })

      it('still emits copy exactly once', async () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Value', copyValue: 'Secret' },
        })
        await copy(wrapper)
        expect(wrapper.emitted('copy')).toEqual([['Secret']])
      })

      it('restores the copy icon and clears the announcement after approx. 2 seconds', async () => {
        vi.useFakeTimers()
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Value' },
        })
        await copy(wrapper)
        await vi.advanceTimersByTimeAsync(1249)
        expect(wrapper.find('.mdi-check').exists()).toBe(true)
        await vi.advanceTimersByTimeAsync(1)
        expect(wrapper.find('.mdi-check').exists()).toBe(false)
        expect(wrapper.find('.mdi-content-copy').exists()).toBe(true)
        expect(wrapper.find('[aria-live="polite"]').text()).toBe('')
      })

      it('restarts the 2 second period when copying again', async () => {
        vi.useFakeTimers()
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Value' },
        })
        await copy(wrapper)
        await vi.advanceTimersByTimeAsync(1000)
        await wrapper.find('.mdi-check').trigger('click')
        await vi.advanceTimersByTimeAsync(50)
        expect(wrapper.find('.mdi-check').exists()).toBe(true)
        await vi.advanceTimersByTimeAsync(1200)
        expect(wrapper.find('.mdi-check').exists()).toBe(false)
        expect(vi.getTimerCount()).toBe(0)
      })

      it('keeps the check icon visible after the pointer left, then hides the button', async () => {
        vi.useFakeTimers()
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Value' },
        })
        await copy(wrapper)
        await wrapper.find('div').trigger('mouseleave')
        expect(wrapper.find('.mdi-check').exists()).toBe(true)
        await vi.advanceTimersByTimeAsync(2000)
        expect(copyButton(wrapper).exists()).toBe(false)
        expect(wrapper.find('.mdi-check').exists()).toBe(false)
      })

      it('resets the feedback when the instance is reused for another value', async () => {
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'First' },
        })
        await copy(wrapper)
        expect(wrapper.find('.mdi-check').exists()).toBe(true)
        await wrapper.setProps({ displayValue: 'Second' })
        expect(wrapper.find('.mdi-check').exists()).toBe(false)
        expect(wrapper.find('[aria-live="polite"]').text()).toBe('')
      })

      it('gives every copy button its own feedback in a list', async () => {
        const wrapper = mountWithDefaults({
          components: { CopyableActionButton },
          template: '<div><CopyableActionButton v-for="k in keys" :key="k" :display-value="k" :clickable="false" /></div>',
          data: () => ({ keys: ['A', 'B'] }),
        })
        const [first, second] = wrapper.findAll('.position-relative')
        await first.trigger('mouseenter')
        await first.find('.mdi-content-copy').trigger('click')
        expect(first.find('.mdi-check').exists()).toBe(true)
        expect(second.find('.mdi-check').exists()).toBe(false)
        expect(second.find('[aria-live="polite"]').text()).toBe('')
      })

      it('hides the copy button after the feedback when it was clicked with the mouse and the pointer left', async () => {
        vi.useFakeTimers()
        vi.restoreAllMocks()
        stubFocusVisible(false) // a mouse click focuses the button without :focus-visible
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Value' },
        })
        await hover(wrapper)
        await copyButton(wrapper).trigger('focusin')
        await copyButton(wrapper).trigger('click')
        await wrapper.find('div').trigger('mouseleave')
        expect(wrapper.find('.mdi-check').exists()).toBe(true)
        await vi.advanceTimersByTimeAsync(2000)
        expect(wrapper.find('.mdi-check').exists()).toBe(false)
        expect(copyButton(wrapper).exists()).toBe(false)
      })

      it('keeps the copy button after the feedback while it has keyboard focus', async () => {
        vi.useFakeTimers()
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Value' },
        })
        await wrapper.find('button').trigger('focusin')
        await copyButton(wrapper).trigger('focusin')
        await copyButton(wrapper).trigger('keydown.enter')
        expect(wrapper.find('.mdi-check').exists()).toBe(true)
        await vi.advanceTimersByTimeAsync(2000)
        expect(copyButton(wrapper).exists()).toBe(true)
      })

      it('clears the pending timer when unmounted', async () => {
        vi.useFakeTimers()
        const wrapper = mountWithDefaults(CopyableActionButton, {
          props: { displayValue: 'Value' },
        })
        await copy(wrapper)
        expect(vi.getTimerCount()).toBe(1)
        wrapper.unmount()
        expect(vi.getTimerCount()).toBe(0)
      })
    })

    describe('consumer writes to the clipboard', () => {
      it('passes the value to the parent handler which can call navigator.clipboard', async () => {
        const writeText = vi.fn().mockResolvedValue()
        vi.stubGlobal('navigator', { clipboard: { writeText } })
        const wrapper = mountWithDefaults({
          components: { CopyableActionButton },
          template: '<CopyableActionButton display-value="process-def-2:42:abc" :clickable="false" @copy="write" />',
          methods: { write(v) { return navigator.clipboard.writeText(v) } },
        })
        await wrapper.find('.position-relative').trigger('mouseenter')
        await wrapper.find('.mdi-content-copy').trigger('click')
        expect(writeText).toHaveBeenCalledExactlyOnceWith('process-def-2:42:abc')
        vi.unstubAllGlobals()
      })
    })
  })
})
