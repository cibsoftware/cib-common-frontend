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
import { createRouter, createWebHistory } from 'vue-router'
import ComponentsPage from './pages/ComponentsPage.vue'

// Import component pages
import FlowTableComponentPage from './pages/components/FlowTableComponentPage.vue'
import SidebarsDataFlowComponentPage from './pages/components/SidebarsDataFlowComponentPage.vue'
import ConfirmDialogComponentPage from './pages/components/ConfirmDialogComponentPage.vue'
import ErrorDialogComponentPage from './pages/components/ErrorDialogComponentPage.vue'
import PaginationControlComponentPage from './pages/components/PaginationControlComponentPage.vue'
import CIBHeaderFlowComponentPage from './pages/components/CIBHeaderFlowComponentPage.vue'
import CIBFormComponentPage from './pages/components/CIBFormComponentPage.vue'
import ContentBlockComponentPage from './pages/components/ContentBlockComponentPage.vue'
import CopyableActionButtonComponentPage from './pages/components/CopyableActionButtonComponentPage.vue'
import GenericTabsComponentPage from './pages/components/GenericTabsComponentPage.vue'
import HighlightedTextComponentPage from './pages/components/HighlightedTextComponentPage.vue'
import PagedScrollableContentComponentPage from './pages/components/PagedScrollableContentComponentPage.vue'
import SidebarsFlowComponentPage from './pages/components/SidebarsFlowComponentPage.vue'
import SuccessAlertComponentPage from './pages/components/SuccessAlertComponentPage.vue'
import TaskListComponentPage from './pages/components/TaskListComponentPage.vue'
import TaskPopperComponentPage from './pages/components/TaskPopperComponentPage.vue'
import TranslationsDownloadComponentPage from './pages/components/TranslationsDownloadComponentPage.vue'
import DirectivesModuleComponentPage from './pages/components/DirectivesModuleComponentPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/components'
  },
  {
    path: '/components',
    name: 'Components',
    component: ComponentsPage,
    meta: {
      title: 'Components Library'
    },
    children: [
      {
        path: 'flow-table',
        name: 'FlowTableComponent',
        component: FlowTableComponentPage,
        meta: { title: 'FlowTable Component' }
      },
      {
        path: 'sidebars-dataflow',
        name: 'SidebarsDataFlowComponent',
        component: SidebarsDataFlowComponentPage,
        meta: { title: 'SidebarsDataFlow Component' }
      },
      {
        path: 'confirm-dialog',
        name: 'ConfirmDialogComponent',
        component: ConfirmDialogComponentPage,
        meta: { title: 'ConfirmDialog Component' }
      },
      {
        path: 'error-dialog',
        name: 'ErrorDialogComponent',
        component: ErrorDialogComponentPage,
        meta: { title: 'ErrorDialog Component' }
      },
      {
        path: 'pagination-control',
        name: 'PaginationControlComponent',
        component: PaginationControlComponentPage,
        meta: { title: 'PaginationControl Component' }
      },
      {
        path: 'cib-header-flow',
        name: 'CIBHeaderFlowComponent',
        component: CIBHeaderFlowComponentPage,
        meta: { title: 'CIBHeaderFlow Component' }
      },
      {
        path: 'cib-form',
        name: 'CIBFormComponent',
        component: CIBFormComponentPage,
        meta: { title: 'CIBForm Component' }
      },
      {
        path: 'content-block',
        name: 'ContentBlockComponent',
        component: ContentBlockComponentPage,
        meta: { title: 'ContentBlock Component' }
      },
      {
        path: 'copyable-action-button',
        name: 'CopyableActionButtonComponent',
        component: CopyableActionButtonComponentPage,
        meta: { title: 'CopyableActionButton Component' }
      },
      {
        path: 'generic-tabs',
        name: 'GenericTabsComponent',
        component: GenericTabsComponentPage,
        meta: { title: 'GenericTabs Component' }
      },
      {
        path: 'highlighted-text',
        name: 'HighlightedTextComponent',
        component: HighlightedTextComponentPage,
        meta: { title: 'HighlightedText Component' }
      },
      {
        path: 'paged-scrollable-content',
        name: 'PagedScrollableContentComponent',
        component: PagedScrollableContentComponentPage,
        meta: { title: 'PagedScrollableContent Component' }
      },
      {
        path: 'sidebars-flow',
        name: 'SidebarsFlowComponent',
        component: SidebarsFlowComponentPage,
        meta: { title: 'SidebarsFlow Component' }
      },
      {
        path: 'success-alert',
        name: 'SuccessAlertComponent',
        component: SuccessAlertComponentPage,
        meta: { title: 'SuccessAlert Component' }
      },
      {
        path: 'task-list',
        name: 'TaskListComponent',
        component: TaskListComponentPage,
        meta: { title: 'TaskList Component' }
      },
      {
        path: 'task-popper',
        name: 'TaskPopperComponent',
        component: TaskPopperComponentPage,
        meta: { title: 'TaskPopper Component' }
      },
      {
        path: 'translations-download',
        name: 'TranslationsDownloadComponent',
        component: TranslationsDownloadComponentPage,
        meta: { title: 'TranslationsDownload Component' }
      },
      {
        path: 'directives',
        name: 'DirectivesComponent',
        component: DirectivesModuleComponentPage,
        meta: { title: 'Directives Module' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory('/common-frontend/'),
  routes
})

// Optional: Set page titles
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Cib Common Frontend'
  next()
})

export default router