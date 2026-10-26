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

// v-click-outside: calls a handler when the user clicks or touches outside the element.
//
//   v-click-outside="onOutside"
//   v-click-outside="{ handler: 'hideSelector', exclude: ['searchInput', 'previewModal'] }"
//
// `handler` is a function or the name of a method of the component that uses the directive.
// `exclude` lists template refs of that component whose elements do not count as "outside".
// For a component ref, its `content` ref is used when present (e.g. b-modal, whose content
// is rendered outside the component root), otherwise its root element.

const EVENTS = ['click', 'touchstart', 'drag']
const STATE = Symbol('clickOutside')

function refElements(ref) {
  if (!ref) return []
  if (Array.isArray(ref)) return ref.flatMap(refElements)
  if (ref instanceof Element) return [ref]
  const content = ref.$refs?.content
  if (content) return refElements(content)
  return ref.$el instanceof Element ? [ref.$el] : []
}

function resolveHandler(value, instance) {
  const handler = typeof value === 'function' ? value : value?.handler
  if (typeof handler === 'function') return handler
  if (typeof handler === 'string' && typeof instance?.[handler] === 'function') return instance[handler].bind(instance)
  return null
}

export const clickOutside = {
  mounted(el, binding) {
    const state = { binding }
    state.listener = event => {
      const { value, instance } = state.binding
      if (el.contains(event.target)) return
      const exclude = typeof value === 'object' && value?.exclude ? value.exclude : []
      const excluded = exclude.some(name => refElements(instance?.$refs?.[name]).some(ref => ref.contains(event.target)))
      if (excluded) return
      const handler = resolveHandler(value, instance)
      if (handler) handler(event)
    }
    EVENTS.forEach(type => document.addEventListener(type, state.listener))
    el[STATE] = state
  },
  updated(el, binding) {
    if (el[STATE]) el[STATE].binding = binding
  },
  unmounted(el) {
    const state = el[STATE]
    if (!state) return
    EVENTS.forEach(type => document.removeEventListener(type, state.listener))
    delete el[STATE]
  }
}
