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
    <!-- Component Documentation Header -->
    <div class="container border-bottom border-light pb-3 mb-4">
      <div class="row align-items-center">
        <div class="col-12">
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <h2 class="mb-1 d-flex align-items-center">
                <span class="mdi mdi-24px me-2 mdi-marker"></span>
                HighlightedText
                <small class="badge ms-2 bg-success">Vue Component</small>
              </h2>
              <p class="text-muted mb-0">Text component with search term highlighting</p>
            </div>
            <div class="text-end">
              <small class="text-muted d-block">Category: Display</small>
              <small class="text-muted d-block">File: HighlightedText.vue</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <ul class="nav nav-tabs mb-4">
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'overview' }" @click="activeTab = 'overview'" href="#">
          <span class="mdi mdi-information-outline me-1"></span>Overview
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'props' }" @click="activeTab = 'props'" href="#">
          <span class="mdi mdi-cog-outline me-1"></span>Props
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'events' }" @click="activeTab = 'events'" href="#">
          <span class="mdi mdi-lightning-bolt-outline me-1"></span>Events
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'slots' }" @click="activeTab = 'slots'" href="#">
          <span class="mdi mdi-puzzle-outline me-1"></span>Slots
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'examples' }" @click="activeTab = 'examples'" href="#">
          <span class="mdi mdi-code-tags me-1"></span>Examples
        </a>
      </li>
    </ul>

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
        <div class="mb-4">
          <h5>Playground</h5>
          <p class="text-muted">Type a text and a search term to see what gets highlighted</p>
          <div class="row g-3">
            <div class="col-md-8">
              <label for="playground-text" class="form-label">Text</label>
              <input id="playground-text" v-model="playgroundText" class="form-control">
            </div>
            <div class="col-md-4">
              <label for="playground-keyword" class="form-label">Keyword</label>
              <input id="playground-keyword" v-model="playgroundKeyword" class="form-control">
            </div>
          </div>
          <div class="mt-3">
            <h6>Live Example:</h6>
            <div class="border p-3 rounded">
              <HighlightedText :text="playgroundText" :keyword="playgroundKeyword" />
            </div>
          </div>
        </div>

        <div v-for="group in exampleGroups" :key="group.title" class="mb-4">
          <h5>{{ group.title }}</h5>
          <p class="text-muted">{{ group.description }}</p>
          <table class="table table-sm align-middle">
            <thead>
              <tr>
                <th style="width: 20%">Use case</th>
                <th style="width: 30%">text</th>
                <th style="width: 15%">keyword</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="example in group.examples" :key="example.name">
                <td>{{ example.name }}</td>
                <td><code>{{ example.text }}</code></td>
                <td><code>{{ example.keyword }}</code></td>
                <td><HighlightedText :text="example.text" :keyword="example.keyword" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HighlightedTextComponentPage',
  data() {
    return {
      activeTab: 'overview',
      playgroundText: 'Approve invoice <b>INV-2026</b> for "ACME (Germany)"',
      playgroundKeyword: 'inv',
      exampleGroups: [
        {
          title: 'Basic Matching',
          description: 'Every occurrence of the keyword is highlighted, ignoring case',
          examples: [
            { name: 'One match', text: 'This is a simple example.', keyword: 'simple' },
            { name: 'Multiple matches', text: 'Highlighting multiple instances of the word highlight in this highlight example.', keyword: 'highlight' },
            { name: 'Case insensitive', text: 'This HighlightedText component highlights keywords.', keyword: 'HIGHLIGHT' },
            { name: 'Several words', text: 'Approve the invoice before Friday.', keyword: 'the invoice' },
            { name: 'Whole text', text: 'Invoice', keyword: 'invoice' },
            { name: 'Adjacent matches', text: 'aaa', keyword: 'a' },
            { name: 'Overlapping matches', text: 'aaa', keyword: 'aa' },
            { name: 'Non-ASCII letters', text: 'Ärger mit der Prüfung', keyword: 'ä' }
          ]
        },
        {
          title: 'Nothing to Highlight',
          description: 'The text is shown unchanged',
          examples: [
            { name: 'No match', text: 'This text does not contain the search term.', keyword: 'absent' },
            { name: 'Empty keyword', text: 'This text remains unchanged when the keyword is empty.', keyword: '' },
            { name: 'Keyword longer than text', text: 'Inv', keyword: 'Invoice' }
          ]
        },
        {
          title: 'Special Characters in the Keyword',
          description: 'Regular expression characters in a search term are matched literally instead of breaking the search',
          examples: [
            { name: 'Parenthesis', text: 'Order (draft) created', keyword: '(' },
            { name: 'Square bracket', text: 'Tags: [urgent] [review]', keyword: '[urgent]' },
            { name: 'Asterisk', text: 'Fields marked with * are required', keyword: '*' },
            { name: 'Dot is not a wildcard', text: 'Version 1.0 or 100', keyword: '1.0' },
            { name: 'Backslash', text: String.raw`C:\Users\demo`, keyword: '\\' },
            { name: 'Dollar and caret', text: 'Price: $100 ^ tax', keyword: '$1' }
          ]
        },
        {
          title: 'Markup in the Text',
          description: 'Task and process names are business data: angle brackets, quotes and ampersands are shown as typed and never rendered as HTML',
          examples: [
            { name: 'Bold tag', text: '<b>a label</b>', keyword: '' },
            { name: 'Image tag', text: 'Logo <img src="placeholder.png"> here', keyword: 'logo' },
            { name: 'Attribute break-out', text: '"><span>name', keyword: 'name' },
            { name: 'Keyword matching markup', text: 'a <b> c', keyword: '<b>' },
            { name: 'Keyword inside an entity name', text: 'Tom & Jerry < Garfield', keyword: 'amp' },
            { name: 'Ampersand itself', text: 'Tom & Jerry', keyword: '&' }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
/* Tab styling */
.nav-tabs .nav-link {
  border: 1px solid transparent;
  border-radius: 0.375rem 0.375rem 0 0;
}

.nav-tabs .nav-link.active {
  background-color: #fff;
  border-color: #dee2e6 #dee2e6 #fff;
  color: #0d6efd;
}

.nav-tabs .nav-link:hover {
  border-color: #e9ecef #e9ecef #dee2e6;
  isolation: isolate;
}

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
  color: #d63384;
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
