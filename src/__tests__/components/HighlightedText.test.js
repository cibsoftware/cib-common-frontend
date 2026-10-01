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

  it('text is undefined', () => {
    const wrapper = mount(HighlightedText, {
      props: {
        keyword: '',
      }
    })
    expect(wrapper.text()).toBe('')
    expect(wrapper.html()).not.toContain('<mark')
  })

  it('text is null', () => {
    const wrapper = mount(HighlightedText, {
      props: {
        text: null,
        keyword: '',
      }
    })
    expect(wrapper.text()).toBe('')
    expect(wrapper.html()).not.toContain('<mark')
  })

  it('text is empty string', () => {
    const wrapper = mount(HighlightedText, {
      props: {
        text: '',
        keyword: 'test',
      }
    })
    expect(wrapper.text()).toBe('')
    expect(wrapper.html()).not.toContain('<mark')
  })

  // Task and process names are business data, so they are shown as written:
  // angle brackets and quotes in a name are characters, not markup, with and
  // without an active search term.
  const MARKUP_INPUTS = [
    ['a nested element', 'a <div style="height: 100vh"><img src="placeholder.png">b</div>'],
    ['a bold tag', '<b>a label</b>'],
    ['an attribute break-out', '"><span>'],
    ['an anchor', '<a href="#">click</a>'],
  ]

  it.each(MARKUP_INPUTS)('renders %s as text, not markup, without a keyword', (_name, text) => {
    const wrapper = mount(HighlightedText, { props: { text, keyword: '' } })

    expect(wrapper.element.querySelectorAll('*')).toHaveLength(0)
    expect(wrapper.text()).toBe(text)
  })

  it.each(MARKUP_INPUTS)('renders %s as text, not markup, while highlighting', (_name, text) => {
    const wrapper = mount(HighlightedText, { props: { text, keyword: 'a' } })

    // the generated <mark> is the only element this component may emit
    const elements = [...wrapper.element.querySelectorAll('*')]
    expect(elements.length).toBeGreaterThan(0)
    expect(elements.every(el => el.tagName === 'MARK')).toBe(true)
    expect(wrapper.text()).toBe(text)
  })

  it.each([
    ['an opening parenthesis', '('],
    ['an unterminated character class', '['],
    ['a dangling quantifier', '*'],
    ['a backslash', '\\'],
  ])('treats %s in the keyword as a literal instead of throwing', (_name, keyword) => {
    const text = `a ${keyword} b`
    const wrapper = mount(HighlightedText, { props: { text, keyword } })

    expect(wrapper.text()).toBe(text)
    expect(wrapper.html()).toContain('<mark class="p-0">')
  })

  it('still highlights a keyword that matches markup in the text', () => {
    const wrapper = mount(HighlightedText, { props: { text: 'a <b> c', keyword: '<b>' } })

    expect(wrapper.text()).toBe('a <b> c')
    expect(wrapper.html()).toContain('<mark class="p-0">&lt;b&gt;</mark>')
    expect(wrapper.element.querySelector('b')).toBeNull()
  })

  // The keyword is matched against the text the user actually sees. Matching it
  // against an escaped copy instead would let a keyword hit the inside of an
  // HTML entity ('l' inside '&lt;'), splitting it and showing the raw entity.
  it.each([
    ['a keyword inside the entity for <', 'a < b', 'l'],
    ['a keyword inside the entity for &', 'a & b', 'amp'],
    ['a keyword inside the entity for a quote', 'a " b', 'quot'],
    ['a keyword inside the entity for >', 'a > b', 'gt'],
  ])('does not match %s', (_name, text, keyword) => {
    const wrapper = mount(HighlightedText, { props: { text, keyword } })

    expect(wrapper.text()).toBe(text)
    expect(wrapper.html()).not.toContain('<mark')
  })

  it('highlights the character itself when the keyword is the character', () => {
    const wrapper = mount(HighlightedText, { props: { text: 'a < b', keyword: '<' } })

    expect(wrapper.text()).toBe('a < b')
    expect(wrapper.html()).toContain('<mark class="p-0">&lt;</mark>')
  })
})
