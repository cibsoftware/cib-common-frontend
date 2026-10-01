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
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { escapeRegExp } from '@/utils/escape.js'

const METACHARACTERS = [
  ['an opening parenthesis', '('],
  ['an unterminated character class', '['],
  ['a dangling quantifier', '*'],
  ['a backslash', '\\'],
  ['an anchor', '^'],
  ['an alternation', '|'],
  ['a quantifier brace', '{2}'],
]

const hadNativeEscape = Object.prototype.hasOwnProperty.call(RegExp, 'escape')
const nativeEscape = RegExp.escape

function restoreNativeEscape() {
  if (hadNativeEscape) RegExp.escape = nativeEscape
  else delete RegExp.escape
}

/**
 * Stand-in for the ES2025 built-in, so its branch is covered on engines that do
 * not ship it yet. Like the real one it escapes the metacharacters and
 * hex-escapes a leading letter or digit, which is why the assertions below are
 * about matching behaviour rather than the exact escaped string.
 */
function installBuiltinEscape() {
  RegExp.escape = text => text
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/^[A-Za-z0-9]/, character => '\\x' + character.charCodeAt(0).toString(16))
}

describe('escapeRegExp', () => {
  afterEach(restoreNativeEscape)

  describe.each([
    ['the built-in RegExp.escape', installBuiltinEscape],
    ['the manual fallback', () => { delete RegExp.escape }],
  ])('with %s', (_name, setUpEngine) => {
    beforeEach(setUpEngine)

    it.each(METACHARACTERS)('quotes %s so RegExp accepts it as a literal', (_label, input) => {
      expect(() => new RegExp(escapeRegExp(input))).not.toThrow()
      expect(new RegExp(escapeRegExp(input)).test(input)).toBe(true)
    })

    it('does not match a metacharacter as a wildcard', () => {
      expect(new RegExp(escapeRegExp('.')).test('a')).toBe(false)
    })

    it('still matches a plain term, case insensitively', () => {
      expect(new RegExp(escapeRegExp('invoice'), 'i').test('an INVOICE process')).toBe(true)
    })

    it.each([
      ['null', null],
      ['undefined', undefined],
    ])('returns an empty string for %s', (_label, input) => {
      expect(escapeRegExp(input)).toBe('')
    })
  })

  it('delegates to the built-in when the engine has one', () => {
    const builtin = vi.fn(text => text)
    RegExp.escape = builtin

    escapeRegExp('invoice')

    expect(builtin).toHaveBeenCalledWith('invoice')
  })

  it('escapes by hand when the engine has no built-in', () => {
    delete RegExp.escape

    expect(escapeRegExp('a.b*c')).toBe('a\\.b\\*c')
  })

  it('converts a non-string before escaping', () => {
    delete RegExp.escape

    expect(escapeRegExp(42)).toBe('42')
  })
})
