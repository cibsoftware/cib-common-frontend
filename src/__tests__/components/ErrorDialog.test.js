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
import { ErrorDialog } from '@/library'
import { mountWithDefaults } from '../helpers/mountComponent.js'

describe('ErrorDialog', () => {
  it('show with string renders multiline message', async () => {
    const wrapper = mountWithDefaults(ErrorDialog)
    const showSpy = vi.spyOn(wrapper.vm.$refs.modal, 'show')

    wrapper.vm.show('Line one\nLine two')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.message).toBe('Line one\nLine two')
    expect(showSpy).toHaveBeenCalled()
    expect(wrapper.text()).toContain('Line one')
    expect(wrapper.text()).toContain('Line two')
  })

  it('show with error object uses $t for message', async () => {
    const wrapper = mountWithDefaults(ErrorDialog, {
      mocks: {
        $t: (key, params) => `translated:${key}:${JSON.stringify(params)}`,
      },
    })

    wrapper.vm.show({ type: 'notFound', params: { id: 1 } })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.message).toBe('translated:errors.notFound:{"id":1}')
  })

  it('wraps quoted words in strong tags', async () => {
    const wrapper = mountWithDefaults(ErrorDialog)

    wrapper.vm.message = 'Error in "myProcess" failed'
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toContain('<strong>myProcess</strong>')
  })

  // A message may carry backend detail, so it is shown as written: angle
  // brackets and quotes in it are characters, not markup.
  it.each([
    ['a bold tag', '<b>a label</b>'],
    ['an image tag', '<img src="placeholder.png">'],
    ['an attribute break-out', '"><b>'],
  ])('renders %s in the message as text, not markup', async (_name, message) => {
    const wrapper = mountWithDefaults(ErrorDialog)

    wrapper.vm.message = message
    await wrapper.vm.$nextTick()

    expect(wrapper.element.querySelector('b, img')).toBeNull()
    expect(wrapper.text()).toContain(message)
  })

  it('still bolds quoted words when the message also contains markup', async () => {
    const wrapper = mountWithDefaults(ErrorDialog)

    wrapper.vm.message = 'Error in "<b>myProcess</b>" failed'
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toContain('<strong>&lt;b&gt;myProcess&lt;/b&gt;</strong>')
    expect(wrapper.element.querySelector('b')).toBeNull()
  })
})
