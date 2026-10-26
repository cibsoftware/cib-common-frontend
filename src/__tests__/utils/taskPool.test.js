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
import { TaskPool } from '@/utils/taskPool.js'

// A task whose promise is resolved/rejected manually from the test
function deferredTask() {
  const calls = []
  const func = vi.fn((...args) => new Promise((resolve, reject) => calls.push({ args, resolve, reject })))
  return { func, calls }
}

const flush = () => new Promise(resolve => setTimeout(resolve, 0))

describe('TaskPool', () => {
  it('passes params and resolves with the task result', async () => {
    const pool = new TaskPool(2)
    await expect(pool.add((a, b) => Promise.resolve(a + b), [1, 2])).resolves.toBe(3)
  })

  it('starts the task synchronously when below the limit', () => {
    const pool = new TaskPool(1)
    const func = vi.fn(() => Promise.resolve())
    pool.add(func)
    expect(func).toHaveBeenCalledOnce()
  })

  it('runs at most `limit` tasks in parallel', async () => {
    const pool = new TaskPool(2)
    const { func, calls } = deferredTask()

    const results = [1, 2, 3, 4].map(n => pool.add(func, [n]))
    expect(func).toHaveBeenCalledTimes(2)

    calls[0].resolve('one')
    await flush()
    expect(func).toHaveBeenCalledTimes(3)
    expect(func).toHaveBeenLastCalledWith(3)

    calls[1].resolve('two')
    calls[2].resolve('three')
    await flush()
    calls[3].resolve('four')

    await expect(Promise.all(results)).resolves.toEqual(['one', 'two', 'three', 'four'])
  })

  it('rejects the task promise and keeps processing the queue', async () => {
    const pool = new TaskPool(1)
    const failing = pool.add(() => Promise.reject(new Error('boom')))
    const next = pool.add(() => Promise.resolve('ok'))

    await expect(failing).rejects.toThrow('boom')
    await expect(next).resolves.toBe('ok')
  })

  it('rejects when the task throws synchronously', async () => {
    const pool = new TaskPool(1)
    const failing = pool.add(() => { throw new Error('sync') })
    const next = pool.add(() => Promise.resolve('ok'))

    await expect(failing).rejects.toThrow('sync')
    await expect(next).resolves.toBe('ok')
  })

  it('reuses a queued task with the same id', async () => {
    const pool = new TaskPool(1)
    const { func, calls } = deferredTask()

    pool.add(func, ['blocker'])
    const first = pool.add(func, ['a'], 'id-1')
    const second = pool.add(func, ['b'], 'id-1')

    expect(second).toBe(first)
    calls[0].resolve()
    await flush()
    calls[1].resolve('done')
    await expect(first).resolves.toBe('done')
    expect(func).toHaveBeenCalledTimes(2)
  })

  it('addPrio puts the task at the front of the queue', async () => {
    const pool = new TaskPool(1)
    const { func, calls } = deferredTask()

    pool.add(func, ['blocker'])
    pool.add(func, ['normal'])
    pool.addPrio(func, ['urgent'])

    calls[0].resolve()
    await flush()
    expect(func).toHaveBeenLastCalledWith('urgent')
  })

  it('addPrio moves an already queued task with the same id to the front', async () => {
    const pool = new TaskPool(1)
    const { func, calls } = deferredTask()

    pool.add(func, ['blocker'])
    pool.add(func, ['other'])
    const queued = pool.add(func, ['target'], 'id-1')
    const prio = pool.addPrio(func, ['ignored'], 'id-1')

    expect(prio).toBe(queued)
    calls[0].resolve()
    await flush()
    expect(func).toHaveBeenLastCalledWith('target')
  })

  it('clear drops the tasks that have not started yet', async () => {
    const pool = new TaskPool(1)
    const { func, calls } = deferredTask()

    pool.add(func, ['running'])
    pool.add(func, ['queued'])
    pool.clear()

    calls[0].resolve()
    await flush()
    expect(func).toHaveBeenCalledOnce()

    // the pool is still usable afterwards
    await expect(pool.add(() => Promise.resolve('after'))).resolves.toBe('after')
  })
})
