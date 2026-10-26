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

// Runs promise-returning tasks with at most `limit` of them in parallel.
// add(func, params, id) queues func(...params) and returns a promise for its result.
// addPrio() does the same but puts the task at the front of the queue. When an id is given,
// a task with the same id that is still queued is reused instead of queueing a duplicate.
export function TaskPool(limit) {
  let pool = []
  let running = 0

  const start = () => {
    if (pool.length === 0) {
      running--
      return
    }
    const task = pool.shift()
    if (task.isExecuted) {
      start()
      return
    }
    task.isExecuted = true
    let result
    try {
      result = task.func(...(task.params || []))
    } catch (e) {
      result = Promise.reject(e)
    }
    Promise.resolve(result)
      .then(
        data => { task.resolve(data); start() },
        e => { task.reject(e); start() }
      )
  }

  const findQueued = id => pool.find(task => task.id === id)

  const enqueue = (func, params, id, prio) => {
    let task
    const promise = new Promise((resolve, reject) => {
      task = { func, params, id, resolve, reject }
    })
    task.promise = promise
    if (prio) pool.unshift(task)
    else pool.push(task)
    if (running < limit) {
      running++
      start()
    }
    return promise
  }

  const add = (func, params, id) => {
    if (id != null) {
      const queued = findQueued(id)
      if (queued) return queued.promise
    }
    return enqueue(func, params, id, false)
  }

  const addPrio = (func, params, id) => {
    if (id != null) {
      const queued = findQueued(id)
      if (queued) {
        // move it to the front
        pool = [queued, ...pool.filter(task => task !== queued)]
        return queued.promise
      }
    }
    return enqueue(func, params, id, true)
  }

  // Drops the tasks that have not started yet. Their promises stay pending.
  const clear = () => {
    pool = []
  }

  return { add, addPrio, clear }
}
