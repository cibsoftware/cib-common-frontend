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
import { describe, it, expect, beforeAll } from 'vitest'
import { createApp } from 'vue'
import registerComponents from '../register.js'

/**
 * Element whose rendered height grows with its text, so the truncation loop
 * has something to measure in jsdom, which does no layout of its own.
 */
function sizedElement(clientHeight, heightPerCharacter = 10) {
  const el = document.createElement('div')
  Object.defineProperty(el, 'clientHeight', { get: () => clientHeight })
  Object.defineProperty(el, 'scrollHeight', { get: () => el.textContent.length * heightPerCharacter })
  return el
}

describe('block-truncate directive', () => {
  let directive

  beforeAll(() => {
    const app = createApp({})
    registerComponents(app)
    directive = app.directive('block-truncate')
  })

  it('assigns the bound text as text, not markup', () => {
    const el = sizedElement(1000)
    const text = '<img src="placeholder.png"><b>bold</b>'

    directive.update(el, { value: { text } })

    expect(el.children).toHaveLength(0)
    expect(el.textContent).toBe(text)
  })

  it('replaces trailing words with an ellipsis until the text fits', () => {
    const el = sizedElement(70)

    directive.update(el, { value: { text: 'one two three' } })

    expect(el.textContent).toBe('one...')
  })

  it('leaves text that already fits unchanged', () => {
    const el = sizedElement(1000)

    directive.update(el, { value: { text: 'one two three' } })

    expect(el.textContent).toBe('one two three')
  })

  it('truncates existing content as text when inserted', () => {
    const el = sizedElement(70)
    el.textContent = 'one <b>two</b> three'

    directive.inserted(el)

    expect(el.children).toHaveLength(0)
    expect(el.textContent).toBe('one...')
  })
})
