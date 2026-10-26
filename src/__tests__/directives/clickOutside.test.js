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
import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { clickOutside } from '@/directives/clickOutside.js'

const wrappers = []

function mountWith(template, methods = {}, components = {}) {
  const wrapper = mount(defineComponent({ template, methods, components }), {
    attachTo: document.body,
    global: { directives: { 'click-outside': clickOutside } }
  })
  wrappers.push(wrapper)
  return wrapper
}

function click(el) {
  el.dispatchEvent(new MouseEvent('click', { bubbles: true }))
}

afterEach(() => {
  wrappers.splice(0).forEach(w => w.unmount())
})

describe('v-click-outside', () => {
  it('calls a function handler on a click outside the element', () => {
    const onOutside = vi.fn()
    const wrapper = mountWith('<div><div ref="box" v-click-outside="onOutside"><span ref="inner"></span></div><button ref="other"></button></div>', { onOutside })

    click(wrapper.vm.$refs.inner)
    expect(onOutside).not.toHaveBeenCalled()

    click(wrapper.vm.$refs.other)
    expect(onOutside).toHaveBeenCalledOnce()
  })

  it('calls a component method given by name', () => {
    const hide = vi.fn()
    const wrapper = mountWith('<div><div v-click-outside="{ handler: \'hide\' }"></div><button ref="other"></button></div>', { hide })

    click(wrapper.vm.$refs.other)
    expect(hide).toHaveBeenCalledOnce()
  })

  it('ignores clicks on excluded element refs', () => {
    const hide = vi.fn()
    const wrapper = mountWith('<div><div v-click-outside="{ handler: \'hide\', exclude: [\'search\'] }"></div><input ref="search"><button ref="other"></button></div>', { hide })

    click(wrapper.vm.$refs.search)
    expect(hide).not.toHaveBeenCalled()

    click(wrapper.vm.$refs.other)
    expect(hide).toHaveBeenCalledOnce()
  })

  it('ignores clicks inside an excluded component, using its content ref when present', () => {
    const Modal = defineComponent({
      name: 'TestModal',
      render() {
        return h('div', [h('div', { ref: 'content', class: 'content' }, [h('button', { class: 'inside' })])])
      }
    })
    const hide = vi.fn()
    const wrapper = mountWith('<div><div v-click-outside="{ handler: \'hide\', exclude: [\'modal\'] }"></div><test-modal ref="modal" /></div>', { hide }, { TestModal: Modal })

    click(wrapper.find('.inside').element)
    expect(hide).not.toHaveBeenCalled()
  })

  it('handles several elements independently', () => {
    const first = vi.fn()
    const second = vi.fn()
    const wrapper = mountWith('<div><div ref="a" v-click-outside="first"></div><div ref="b" v-click-outside="second"></div></div>', { first, second })

    click(wrapper.vm.$refs.a)
    expect(first).not.toHaveBeenCalled()
    expect(second).toHaveBeenCalledOnce()
  })

  it('removes its listeners when unmounted', () => {
    const onOutside = vi.fn()
    const wrapper = mountWith('<div v-click-outside="onOutside"></div>', { onOutside })
    wrapper.unmount()
    wrappers.splice(wrappers.indexOf(wrapper), 1)

    click(document.body)
    expect(onOutside).not.toHaveBeenCalled()
  })
})
