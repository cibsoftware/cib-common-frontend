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
import { UserNameCell } from '@/library'
import { mountWithDefaults } from '../helpers/mountComponent.js'

const mainElement = (wrapper) => wrapper.find('div.text-truncate')
const hover = (wrapper) => wrapper.find('.position-relative').trigger('mouseenter')
const copyButton = (wrapper) => wrapper.find('.mdi-content-copy')

describe('UserNameCell', () => {
  it.each([[''], [undefined]])('renders no markup for name=%s', (name) => {
    const wrapper = mountWithDefaults(UserNameCell, { props: { name } })
    expect(wrapper.html()).toBe('<!--v-if-->')
  })

  it('renders a decorative account icon followed by the name', () => {
    const wrapper = mountWithDefaults(UserNameCell, { props: { name: 'john.doe' } })
    const icon = mainElement(wrapper).find('.mdi-account')
    expect(icon.attributes('aria-hidden')).toBe('true')
    expect(mainElement(wrapper).text()).toBe('john.doe')
  })

  it('is not clickable and shows the full name as tooltip', () => {
    const name = 'maximilian.mustermann-schmidt@example.com'
    const wrapper = mountWithDefaults(UserNameCell, { props: { name } })
    expect(wrapper.find('button').exists()).toBe(false)
    expect(mainElement(wrapper).attributes('title')).toBe(name)
  })

  it('is focusable so the copy button can be reached with the keyboard', () => {
    const wrapper = mountWithDefaults(UserNameCell, { props: { name: 'john.doe' } })
    expect(mainElement(wrapper).attributes('tabindex')).toBe('0')
  })

  it('emits copy with the plain name', async () => {
    const wrapper = mountWithDefaults(UserNameCell, { props: { name: 'john.doe' } })
    await hover(wrapper)
    await copyButton(wrapper).trigger('click')
    expect(wrapper.emitted('copy')).toEqual([['john.doe']])
  })

  it('emits the name of the cell that was copied in a list', async () => {
    const onCopy = vi.fn()
    const wrapper = mountWithDefaults({
      components: { UserNameCell },
      template: '<div><UserNameCell v-for="n in names" :key="n" :name="n" @copy="onCopy" /></div>',
      data: () => ({ names: ['john.doe', 'jane.smith'] }),
      methods: { onCopy },
    })
    await wrapper.findAll('.position-relative')[1].trigger('mouseenter')
    await wrapper.find('.mdi-content-copy').trigger('click')
    expect(onCopy).toHaveBeenCalledExactlyOnceWith('jane.smith')
  })
})