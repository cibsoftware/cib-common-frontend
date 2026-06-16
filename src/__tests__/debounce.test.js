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
import { debounce } from '../utils/debounce.js'

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('calls function after delay', () => {
    const fn = vi.fn()
    const debounced = debounce(300, fn)

    debounced('arg')
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(300)
    expect(fn).toHaveBeenCalledWith('arg')
  })

  it('resets timer on subsequent calls', () => {
    const fn = vi.fn()
    const debounced = debounce(300, fn)

    debounced('first')
    vi.advanceTimersByTime(200)
    debounced('second')
    vi.advanceTimersByTime(200)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledOnce()
    expect(fn).toHaveBeenCalledWith('second')
  })

  it('preserves this context', () => {
    const ctx = { value: 42 }
    const fn = vi.fn(function () { return this.value })
    const debounced = debounce(100, fn)

    debounced.call(ctx)
    vi.advanceTimersByTime(100)
    expect(fn.mock.instances[0]).toBe(ctx)
  })
})
