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
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { TranslationsDownload, mergeLocaleMessage } from '@/library'

describe('TranslationsDownload', () => {
  let createObjectURL
  let revokeObjectURL
  let clickSpy
  let container

  beforeEach(() => {
    clickSpy = vi.fn()
    createObjectURL = vi.fn().mockReturnValue('blob:test-url')
    revokeObjectURL = vi.fn()
    vi.stubGlobal('URL', { createObjectURL, revokeObjectURL })

    const origCreate = document.createElement.bind(document)
    vi.spyOn(document, 'createElement').mockImplementation((tag) => {
      const el = origCreate(tag)
      if (tag === 'a') {
        el.click = clickSpy
      }
      return el
    })

    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('downloads translations JSON on mount', async () => {
    const i18n = createI18n({
      legacy: true,
      locale: 'en',
      messages: { en: { hello: 'Hello', bye: 'Goodbye' } },
    })
    mergeLocaleMessage(i18n, 'en')

    const app = createApp(TranslationsDownload)
    app.use(i18n)
    app.config.globalProperties.$i18n = i18n
    app.mount(container)

    await vi.waitFor(() => expect(clickSpy).toHaveBeenCalled())

    expect(createObjectURL).toHaveBeenCalled()
    const blobArg = createObjectURL.mock.calls[0][0]
    const text = await blobArg.text()
    const parsed = JSON.parse(text)

    expect(parsed.locale).toBe('en')
    expect(parsed.translations).toBeDefined()
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:test-url')
  })
})
