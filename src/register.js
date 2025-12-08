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
import { registerComponents as bootstrapRegisterComponents } from '@cib/bootstrap-components'
import CIBForm from './components/common/CIBForm.vue';
import CIBHeaderFlow from './components/common/CIBHeaderFlow.vue';
import ConfirmDialog from './components/common/ConfirmDialog.vue';
import ContentBlock from './components/common/ContentBlock.vue';
import CopyableActionButton from './components/common/CopyableActionButton.vue';
import ErrorDialog from './components/common/ErrorDialog.vue';
import FlowTable from './components/common/FlowTable.vue';
import GenericTabs from './components/common/GenericTabs.vue';
import HighlightedText from './components/common/HighlightedText.vue';
import PagedScrollableContent from './components/common/PagedScrollableContent.vue';
import PaginationControl from './components/common/PaginationControl.vue';
import SidebarsDataFlow from './components/common/SidebarsDataFlow.vue';
import SidebarsFlow from './components/common/SidebarsFlow.vue';
import SuccessAlert from './components/common/SuccessAlert.vue';
import TranslationsDownload from './components/common/TranslationsDownload.vue';
import TaskPopper from './components/common/TaskPopper.vue';
import { HoverStyle } from '@/components/common/directives.js'

const registerComponents = function(app) {

  bootstrapRegisterComponents(app)

  // Register global dialogs
  app.component('error-dialog', ErrorDialog)
  app.component('confirm-dialog', ConfirmDialog)

  // ALIASES
  app.component('b-dd', app.component('b-dropdown'))
  app.component('b-dd-form', app.component('b-dropdown-form'))

  // Register local components
  app.component('CIBForm', CIBForm)
  app.component('CIBHeaderFlow', CIBHeaderFlow)
  app.component('ConfirmDialog', ConfirmDialog)
  app.component('ContentBlock', ContentBlock)
  app.component('CopyableActionButton', CopyableActionButton)
  app.component('ErrorDialog', ErrorDialog)
  app.component('FlowTable', FlowTable)
  app.component('GenericTabs', GenericTabs)
  app.component('HighlightedText', HighlightedText)
  app.component('PagedScrollableContent', PagedScrollableContent)
  app.component('PaginationControl', PaginationControl)
  app.component('SidebarsDataFlow', SidebarsDataFlow)
  app.component('SidebarsFlow', SidebarsFlow)
  app.component('SuccessAlert', SuccessAlert)
  app.component('TaskPopper', TaskPopper)
  app.component('TranslationsDownload', TranslationsDownload)
  
  // Register local directives
  app.directive('hover-style', HoverStyle)
  app.directive('block-truncate', {
      inserted: function(el) {
      // Check if the block's height is smaller than the text content height. If so
          // add an ellipsis replacing the last word
        while (el.clientHeight < el.scrollHeight) {
        el.innerHTML = el.innerHTML.replace(/\W*\s(\S)*$/, '...')
        }
      },
    update: function(el, binding) {
      el.innerHTML = binding.value.text
      while (el.clientHeight < el.scrollHeight) {
        el.innerHTML = el.innerHTML.replace(/\W*\s(\S)*$/, '...')
        }
    }
  })

}

export default registerComponents
