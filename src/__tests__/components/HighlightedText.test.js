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
import { mount } from '@vue/test-utils'
import { HighlightedText } from '@/library'

describe('HighlightedText', () => {
  it('empty', () => {
    const wrapper = mount(HighlightedText, {
      props: {
        text: 'Text to highlight',
        keyword: '',
      }
    })
    expect(wrapper.text()).toContain('Text to highlight')
  })

  it('word', () => {
    const wrapper = mount(HighlightedText, {
      props: {
        text: 'Text to highlight',
        keyword: 'to',
      }
    })
    expect(wrapper.text()).toContain('Text to highlight')
    // ensue '<mark class="p-0">to</mark>' is in the rendered html
    expect(wrapper.html()).toContain('<mark class="p-0">to</mark>')
  })

  it('case insensitive', () => {
    const wrapper = mount(HighlightedText, {
      props: {
        text: 'Text To highlight',
        keyword: 'to',
      }
    })
    expect(wrapper.text()).toContain('Text To highlight')
    // ensue '<mark class="p-0">To</mark>' is in the rendered html
    expect(wrapper.html()).toContain('<mark class="p-0">To</mark>')
  })

  it('multiple occurrences', () => {
    const wrapper = mount(HighlightedText, {
      props: {
        text: 'To be or not to be',
        keyword: 'be',
      }
    })
    expect(wrapper.text()).toContain('To be or not to be')
    // ensue '<mark class="p-0">be</mark>' occurs twice in the rendered html
    const regex = /<mark class="p-0">be<\/mark>/g
    const matches = wrapper.html().match(regex)
    expect(matches).toHaveLength(2)
  })

  it('no match', () => {
    const wrapper = mount(HighlightedText, {
      props: {
        text: 'Hello World',
        keyword: 'test',
      }
    })
    expect(wrapper.text()).toContain('Hello World')
    // ensure no <mark> tags are in the rendered html
    expect(wrapper.html()).not.toContain('<mark class="p-0">')
  })
})
