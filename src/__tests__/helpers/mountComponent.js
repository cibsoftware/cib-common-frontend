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
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { defineComponent, h } from 'vue'
import { bootstrapStubs } from './bootstrapStubs.js'

export function mockT(key, params) {
  return params ? `${key}:${JSON.stringify(params)}` : key
}

export function createRouterMock(overrides = {}) {
  const route = {
    path: '/',
    query: {},
    ...overrides.route,
  }
  return {
    route,
    router: {
      resolve: (to) => ({
        href: typeof to === 'string' ? to : `#${to.path || '/'}`,
        path: to.path || '/',
        query: to.query || {},
        ...overrides.resolve,
      }),
      ...overrides.router,
    },
  }
}

export function createI18nPlugin(locale = 'en', messages = { en: { hello: 'Hello' } }) {
  return createI18n({
    legacy: true,
    locale,
    messages,
  })
}

const RouterLinkStub = defineComponent({
  name: 'RouterLinkStub',
  props: { to: { type: [String, Object], default: null } },
  emits: ['click'],
  setup(props, { slots, emit }) {
    return () => h('a', {
      'data-stub': 'router-link',
      href: typeof props.to === 'string' ? props.to : '#',
      onClick: (e) => emit('click', e),
    }, slots.default?.())
  },
})

export function mountWithDefaults(component, options = {}) {
  const {
    routerMock,
    i18n,
    stubs = {},
    mocks = {},
    skipDefaultMocks = false,
    ...rest
  } = options

  const global = {
    ...(rest.global || {}),
    stubs: {
      ...bootstrapStubs,
      'router-link': RouterLinkStub,
      ...(rest.global?.stubs || {}),
      ...stubs,
    },
    mocks: {
      ...(skipDefaultMocks ? {} : { $t: mockT }),
      ...(routerMock ? { $route: routerMock.route, $router: routerMock.router } : {}),
      ...(rest.global?.mocks || {}),
      ...mocks,
    },
  }

  if (i18n) {
    global.plugins = [...(global.plugins || []), i18n]
  }

  return mount(component, {
    ...rest,
    global,
  })
}
