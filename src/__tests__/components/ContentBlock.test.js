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
import { ContentBlock } from '@/library'
import { mountWithDefaults } from '../helpers/mountComponent.js'

describe('ContentBlock', () => {
  it('renders title', () => {
    const wrapper = mountWithDefaults(ContentBlock, {
      props: { title: 'Section Title' },
    })

    expect(wrapper.text()).toContain('Section Title')
  })

  it('renders info icon when info prop is set', () => {
    const wrapper = mountWithDefaults(ContentBlock, {
      props: { title: 'Title', info: 'Help text' },
    })

    expect(wrapper.find('.mdi-information-outline').exists()).toBe(true)
  })

  it('does not render info icon without info prop', () => {
    const wrapper = mountWithDefaults(ContentBlock, {
      props: { title: 'Title' },
    })

    expect(wrapper.find('.mdi-information-outline').exists()).toBe(false)
  })

  it('renders default and actions slots', () => {
    const wrapper = mountWithDefaults(ContentBlock, {
      props: { title: 'Title' },
      slots: {
        default: '<p class="body">Body content</p>',
        actions: '<button class="action-btn">Action</button>',
      },
    })

    expect(wrapper.find('.body').text()).toBe('Body content')
    expect(wrapper.find('.action-btn').text()).toBe('Action')
  })
})
