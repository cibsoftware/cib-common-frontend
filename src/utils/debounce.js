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
export function debounce(delay, fn) {
    let timeoutID = null
    return function(...args) {
      clearTimeout(timeoutID)
      timeoutID = setTimeout(() => fn.apply(this, args), delay)
    }
}

// Like debounce, but calls fn at the latest maxWait ms after the first call of a burst,
// so continuous calls (e.g. while typing or scrolling) still produce regular updates.
export function debounceWithMaxWait(delay, maxWait, fn) {
    let timeoutID = null
    let firstCall = 0
    return function(...args) {
      if (!firstCall) firstCall = Date.now()
      clearTimeout(timeoutID)
      if (firstCall + maxWait < Date.now()) {
        firstCall = 0
        fn.apply(this, args)
      } else {
        timeoutID = setTimeout(() => {
          firstCall = 0
          fn.apply(this, args)
        }, delay)
      }
    }
}
