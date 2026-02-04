<!--

    Copyright CIB software GmbH and/or licensed to CIB software GmbH
    under one or more contributor license agreements. See the NOTICE file
    distributed with this work for additional information regarding copyright
    ownership. CIB software licenses this file to you under the Apache License,
    Version 2.0; you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.

-->
<template>
  <div class="component-page h-100">
    <ComponentPageHeader
      v-model:active-tab="activeTab"
      icon="mdi-marker"
      component-name="HighlightedText"
      description="Text highlighting component"
      category="Text"
      file-name="HighlightedText.vue"
    />

    <!-- Tab Content -->
    <div class="tab-content">
      <!-- Overview Tab -->
      <div v-show="activeTab === 'overview'">
        <div class="row">
          <div class="col-12">
            <h4>Purpose</h4>
            <p>Text component with search term highlighting</p>

            <h4>Integration</h4>
            <div class="bg-light p-3 rounded">
              <h6>Import Statement:</h6>
              <pre><code>import HighlightedText from './components/common/HighlightedText.vue'</code></pre>

              <h6 class="mt-3">Component Registration:</h6>
              <pre><code>components: {
  HighlightedText
}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Props Tab -->
      <div v-show="activeTab === 'props'">
        <div class="text-center py-5 text-muted">
          Component documentation will be added here
        </div>
      </div>

      <!-- Events Tab -->
      <div v-show="activeTab === 'events'">
        <div class="text-center py-5 text-muted">
          Component documentation will be added here
        </div>
      </div>

      <!-- Slots Tab -->
      <div v-show="activeTab === 'slots'">
        <div class="text-center py-5 text-muted">
          Component documentation will be added here
        </div>
      </div>

      <!-- Examples Tab -->
      <div v-show="activeTab === 'examples'">
        <div class="py-5 text-muted">
          <p>One span</p>
          <highlighted-text text="This is a simple example." keyword="simple"></highlighted-text>
          <p class="mt-4">Multiple spans</p>
          <highlighted-text text="Highlighting multiple instances of the word highlight in this highlight example." keyword="highlight"></highlighted-text>
          <p class="mt-4">Case insensitive</p>
          <highlighted-text text="This HighlightedText component highlights keywords." keyword="highlight"></highlighted-text>
          <p class="mt-4">No keyword match</p>
          <highlighted-text text="This text does not contain the search term." keyword="absent"></highlighted-text>
          <p class="mt-4">Empty keyword</p>
          <highlighted-text text="This text remains unchanged when the keyword is empty." keyword=""></highlighted-text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComponentPageHeader from '../ComponentPageHeader.vue'

export default {
  name: 'HighlightedTextComponentPage',
  components: {
    ComponentPageHeader
  },
  data() {
    return {
      activeTab: 'overview'
    }
  }
}
</script>

<style scoped>
/* Code styling */
pre {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  padding: 1rem;
  font-size: 0.875rem;
  overflow-x: auto;
}

code {
  color: #b02a67;
  background-color: #f8f9fa;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

pre code {
  color: #212529;
  background-color: transparent;
  padding: 0;
}

/* Badge styling */
.badge {
  font-size: 0.75em;
}

/* Table styling */
.table th {
  background-color: #f8f9fa;
  font-weight: 600;
  border-top: none;
}

/* Icon sizes */
.mdi-24px {
  font-size: 24px;
}

/* Smooth transitions */
.tab-content {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
