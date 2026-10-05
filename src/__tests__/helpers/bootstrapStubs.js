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
import { defineComponent, h } from 'vue'

function passthrough(name, extra = {}) {
  return defineComponent({
    name,
    inheritAttrs: false,
    ...extra,
    setup(_, { slots, attrs, emit }) {
      return () => h('div', { ...attrs, 'data-stub': name, onClick: () => emit('click') }, slots.default?.())
    },
  })
}

export const BModalStub = defineComponent({
  name: 'BModalStub',
  inheritAttrs: false,
  setup(_, { slots, attrs, expose }) {
    const show = () => {}
    const hide = () => {}
    expose({ show, hide })
    return () => h('div', { ...attrs, 'data-stub': 'b-modal' }, [
      slots.default?.(),
      slots['modal-footer']?.(),
    ])
  },
})

export const BPopoverStub = defineComponent({
  name: 'BPopoverStub',
  inheritAttrs: false,
  emits: ['hidden', 'open', 'close'],
  setup(_, { slots, attrs, emit, expose }) {
    expose({ $emit: emit })
    return () => h('div', {
      ...attrs,
      'data-stub': 'b-popover',
      onHidden: () => emit('hidden'),
    }, [
      slots.title?.(),
      slots.default?.(),
    ])
  },
})

export const BAlertStub = defineComponent({
  name: 'BAlertStub',
  inheritAttrs: false,
  props: { show: { type: [Boolean, Number], default: false } },
  setup(props, { slots, attrs, emit }) {
    return () => props.show
      ? h('div', {
        ...attrs,
        'data-stub': 'b-alert',
        onDismissed: () => emit('dismissed'),
      }, slots.default?.())
      : null
  },
})

export const BFormInputStub = defineComponent({
  name: 'BFormInputStub',
  inheritAttrs: false,
  props: {
    modelValue: { type: String, default: '' },
    value: { type: String, default: '' },
    size: { type: String, default: undefined },
  },
  emits: ['update:modelValue', 'input', 'keydown'],
  setup(props, { attrs, emit }) {
    return () => h('input', {
      'data-stub': 'b-form-input',
      'data-size': props.size,
      ...attrs,
      value: props.modelValue || props.value,
      onInput: (e) => {
        emit('update:modelValue', e.target.value)
        emit('input', e)
      },
      onKeydown: (e) => emit('keydown', e),
    })
  },
})

export const BDdStub = defineComponent({
  name: 'BDdStub',
  inheritAttrs: false,
  emits: ['shown', 'hidden', 'show', 'hide'],
  setup(_, { slots, attrs }) {
    return () => h('div', { ...attrs, 'data-stub': 'b-dd' }, [
      h('div', { 'data-stub': 'b-dd-toggle' }, slots['button-content']?.()),
      h('div', { 'data-stub': 'b-dd-menu' }, slots.default?.()),
    ])
  },
})

export const bootstrapStubs = {
  'b-alert': BAlertStub,
  'b-modal': BModalStub,
  'b-button': passthrough('b-button'),
  'b-popover': BPopoverStub,
  'b-dd': BDdStub,
  'b-dd-form': passthrough('b-dd-form'),
  'b-dd-item-btn': passthrough('b-dd-item-btn'),
  'b-dropdown-group': passthrough('b-dropdown-group'),
  'b-form-input': BFormInputStub,
  'b-input-group': passthrough('b-input-group'),
  'b-spinner': passthrough('b-spinner'),
  'b-avatar': passthrough('b-avatar'),
  'b-badge': passthrough('b-badge'),
  'b-button-close': passthrough('b-button-close'),
  'b-waiting-box': passthrough('b-waiting-box'),
  transition: false,
  Transition: false,
}
