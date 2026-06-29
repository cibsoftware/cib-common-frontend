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
import { describe, it, expect } from 'vitest'
import { CIBForm } from '@/library'
import { mountWithDefaults } from '../helpers/mountComponent.js'

describe('CIBForm', () => {
  it('emits submitted when form is valid', async () => {
    const wrapper = mountWithDefaults(CIBForm, {
      slots: {
        default: '<input required value="test" />',
      },
      attachTo: document.body,
    })

    wrapper.vm.$refs.form.checkValidity = () => true
    const result = wrapper.vm.onSubmit()

    expect(result).toBe(true)
    expect(wrapper.emitted('submitted')).toHaveLength(1)
    expect(wrapper.vm.showValidation).toBe(false)
    wrapper.unmount()
  })

  it('emits fail and shows validation when form is invalid', async () => {
    const wrapper = mountWithDefaults(CIBForm, {
      slots: {
        default: '<input required />',
      },
      attachTo: document.body,
    })

    wrapper.vm.$refs.form.checkValidity = () => false
    const result = wrapper.vm.onSubmit()

    expect(result).toBe(false)
    expect(wrapper.emitted('fail')).toHaveLength(1)
    expect(wrapper.vm.showValidation).toBe(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('form').classes()).toContain('was-validated')
    wrapper.unmount()
  })

  it('exposes showValidation to slot', () => {
    const wrapper = mountWithDefaults(CIBForm, {
      slots: {
        default: '<span class="validation-flag">{{ showValidation }}</span>',
      },
    })

    expect(wrapper.find('.validation-flag').text()).toBe('false')
  })
})
