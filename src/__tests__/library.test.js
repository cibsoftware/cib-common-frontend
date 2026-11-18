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
import * as library from '../library.js'
import { normalizeLanguage } from '../utils/language.js'
import { findComponents } from './utils.js'
import fs from 'node:fs'
import path from 'node:path'

const languages = ['de', 'en', 'es', 'it', 'ru', 'ua', 'zh', 'zh-tw']

/**
 * Component name to its import path
 */
function nameToImportPath(vueFiles, name) {
  const pathName = vueFiles.find(f => path.basename(f, '.vue') === name)
  if (!pathName) {
    throw new Error(`Component ${name} not found in vueFiles`)
  }
  const relPathName = pathName.substring(pathName.indexOf('src/') + 4).replaceAll('\\', '/')
  return './' + relPathName
}

describe('library.js', () => {
  // eslint-disable-next-line no-undef
  const srcDir = path.resolve(__dirname, '../../src/components')

  describe('*.vue', () => {
    // Find all .vue files in /src/
    const vueFiles = findComponents(srcDir, '.vue')

    it('exports all .vue components from /src/', () => {

      // Get the base name (without extension) for each .vue file
      const vueComponentNames = vueFiles.map(f =>
        path.basename(f, '.vue')
      )

      // Get all exported keys from library.js
      const exportedKeys = Object.keys(library)

      // Check that each component is exported
      const missingImports = vueComponentNames.filter(
        name => !exportedKeys.includes(name)
      ).map((name) => {
        const relPathName = nameToImportPath(vueFiles, name)
        return `import ${name} from '${relPathName}'`
      })

      expect(missingImports.join('\n')).toEqual('')
    })

    it('valid name of .vue components', () => {
      for (const file of vueFiles) {
        const fileName = path.basename(file, '.vue')

        // Check that the file name is a valid JavaScript identifier
        expect(fileName).toMatch(/^[a-zA-Z_$][0-9a-zA-Z_$]*$/)

        // At least two words in the name
        expect(fileName.split(/(?=[A-Z])/).length).toBeGreaterThanOrEqual(2)

        // File should contain name in format: "'name: <componentName>'"
        const content = fs.readFileSync(file, 'utf-8')
        const isSetupScript = content.includes('<script setup>')
        const specialCases = ['BToggle'] // Components with no name property
        if (specialCases.includes(fileName)) {
          return
        }
        if (isSetupScript) {
          return
        }
        const namePattern = new RegExp(String.raw`name:\s*'${fileName}',`)
        expect(content).toMatch(namePattern, `File ${file} does not contain name: '${fileName}'`)
      }
    })
  })

  describe('mergeLocaleMessage', () => {
    it('should be exported from library', () => {
      expect(library.mergeLocaleMessage).toBeDefined()
      expect(typeof library.mergeLocaleMessage).toBe('function')
    })

    const mockI18n = {
      global: {
        mergeLocaleMessage: vi.fn()
      }
    }

    it.each(languages)('should have translations for supported language: %s', (lang) => {
      library.mergeLocaleMessage(mockI18n, lang)
      expect(mockI18n.global.mergeLocaleMessage).toHaveBeenCalledWith(lang, expect.any(Object))
    })

    it('should fall back to English for unsupported language', () => {
      library.mergeLocaleMessage(mockI18n, 'fr')
      expect(mockI18n.global.mergeLocaleMessage).toHaveBeenCalledWith('fr', expect.any(Object))
    })

    it.each(['zh-TW', 'zh-HK', 'zh-MO', 'zh-Hant', 'zh_TW'])('should merge the traditional Chinese tag %s into zh-tw', (tag) => {
      library.mergeLocaleMessage(mockI18n, tag)
      expect(mockI18n.global.mergeLocaleMessage).toHaveBeenCalledWith('zh-tw', expect.any(Object))
    })

    it.each(['zh-CN', 'zh-Hans', 'zh-SG'])('should merge the simplified Chinese tag %s into zh', (tag) => {
      library.mergeLocaleMessage(mockI18n, tag)
      expect(mockI18n.global.mergeLocaleMessage).toHaveBeenCalledWith('zh', expect.any(Object))
    })

    it('should normalize a missing language to en', () => {
      library.mergeLocaleMessage(mockI18n)
      expect(mockI18n.global.mergeLocaleMessage).toHaveBeenCalledWith('en', expect.any(Object))
    })

    it.each(languages)('should have translation content for %s language', async (lang) => {
      const translation = await import(`@/assets/translations_${lang}.json`)
      expect(translation.default).toBeDefined()
      expect(Object.keys(translation.default).length).toBeGreaterThan(0)
    })
  })

  describe('normalizeLanguage', () => {
    it.each(['zh-TW', 'zh-HK', 'zh-MO', 'zh-Hant', 'zh_TW'])('maps %s to zh-tw', (tag) => {
      expect(normalizeLanguage(tag)).toBe('zh-tw')
    })

    it.each(['zh', 'zh-CN', 'zh-Hans', 'zh-SG'])('maps %s to zh', (tag) => {
      expect(normalizeLanguage(tag)).toBe('zh')
    })

    it('maps other languages to their primary subtag', () => {
      expect(normalizeLanguage('de-DE')).toBe('de')
      expect(normalizeLanguage('en-US')).toBe('en')
    })

    it('maps a missing value to en', () => {
      expect(normalizeLanguage()).toBe('en')
      expect(normalizeLanguage('')).toBe('en')
    })
  })

})
