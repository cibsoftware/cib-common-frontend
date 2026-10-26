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
import { FileArea } from '@/library'
import { mountWithDefaults } from '../helpers/mountComponent.js'

const file = (name, type) => new File(['x'], name, { type })

describe('FileArea', () => {
  it('shows the single-file title by default', () => {
    const wrapper = mountWithDefaults(FileArea)
    expect(wrapper.text()).toContain('file-area.titleBelowSingle')
    expect(wrapper.find('input').attributes('aria-label')).toBe('file-area.titleBelowSingle')
  })

  it('shows the multiple-files title and sets the input to multiple', () => {
    const wrapper = mountWithDefaults(FileArea, { props: { multiple: true } })
    expect(wrapper.text()).toContain('file-area.titleBelowMultiple')
    expect(wrapper.find('input').attributes('multiple')).toBeDefined()
  })

  it('passes accept and disabled to the file input', () => {
    const wrapper = mountWithDefaults(FileArea, { props: { accept: '.pdf', disabled: true } })
    const input = wrapper.find('input')
    expect(input.attributes('accept')).toBe('.pdf')
    expect(input.attributes('disabled')).toBeDefined()
  })

  it('uses the default icon unless an image is given', () => {
    expect(mountWithDefaults(FileArea).find('img').attributes('src')).toBeTruthy()
    expect(mountWithDefaults(FileArea, { props: { img: 'custom.svg' } }).find('img').attributes('src')).toBe('custom.svg')
  })

  it('emits all files when no accept filter is set', () => {
    const wrapper = mountWithDefaults(FileArea)
    const files = [file('a.pdf', 'application/pdf'), file('b.png', 'image/png')]
    wrapper.vm.onChange(files)
    expect(wrapper.emitted('select')[0][0]).toEqual(files)
  })

  it('filters by MIME type, wildcard and file ending', () => {
    const wrapper = mountWithDefaults(FileArea, { props: { accept: 'image/*, .PDF' } })
    const png = file('a.png', 'image/png')
    const pdf = file('b.pdf', 'application/pdf')
    const txt = file('c.txt', 'text/plain')

    wrapper.vm.onChange([png, pdf, txt])
    expect(wrapper.emitted('select')[0][0]).toEqual([png, pdf])
  })

  it('emits nothing and clears the input when no file is acceptable', () => {
    const wrapper = mountWithDefaults(FileArea, { props: { accept: '.pdf' } })
    wrapper.vm.onChange([file('c.txt', 'text/plain')])
    expect(wrapper.emitted('select')).toBeUndefined()
    expect(wrapper.find('input').element.value).toBe('')
  })

  it('ignores an empty selection', () => {
    const wrapper = mountWithDefaults(FileArea)
    wrapper.vm.onChange([])
    wrapper.vm.onChange(null)
    expect(wrapper.emitted('select')).toBeUndefined()
  })
})
