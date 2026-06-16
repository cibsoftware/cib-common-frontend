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
import { SuccessAlert } from '@/library'
import { mountWithDefaults } from '../helpers/mountComponent.js'

describe('SuccessAlert', () => {
  it('renders slot content when shown', async () => {
    const wrapper = mountWithDefaults(SuccessAlert, {
      slots: { default: 'Operation successful' },
    })

    wrapper.vm.show(5)
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Operation successful')
    expect(wrapper.vm.countdown).toBe(5)
  })

  it('uses default show time of 5 seconds', async () => {
    const wrapper = mountWithDefaults(SuccessAlert)

    wrapper.vm.show()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.countdown).toBe(5)
  })

  it('applies custom top prop', async () => {
    const wrapper = mountWithDefaults(SuccessAlert, {
      props: { top: '80px' },
    })
    wrapper.vm.show(5)
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-stub="b-alert"]').attributes('style')).toContain('top: 80px')
  })

  it('uses default top prop', async () => {
    const wrapper = mountWithDefaults(SuccessAlert)
    wrapper.vm.show(5)
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-stub="b-alert"]').attributes('style')).toContain('top: 60px')
  })

  it('resets countdown on dismissed', async () => {
    const wrapper = mountWithDefaults(SuccessAlert)

    wrapper.vm.show(10)
    await wrapper.vm.$nextTick()
    wrapper.find('[data-stub="b-alert"]').trigger('dismissed')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.countdown).toBe(0)
  })
})
