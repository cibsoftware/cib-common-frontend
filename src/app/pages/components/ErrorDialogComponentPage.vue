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
                <span class="mdi mdi-24px me-2 mdi-alert-circle-outline"></span>
                ErrorDialog
                <small class="badge ms-2 bg-success">Vue Component</small>
              </h2>
              <p class="text-muted mb-0">Modal dialog for displaying error messages</p>
            </div>
            <div class="text-end">
              <small class="text-muted d-block">Category: Feedback</small>
              <small class="text-muted d-block">File: ErrorDialog.vue</small>
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
    <div class="tab-content overflow-auto" style="max-height: calc(95vh - 300px);">
      <!-- Overview Tab -->
      <div v-show="activeTab === 'overview'">
        <div class="row">
          <div class="col-12">
            <h4>Purpose</h4>
            <p>ErrorDialog provides a consistent way to display error messages to users, supporting both simple string messages and structured error objects with internationalization.</p>
            
            <h4>Use Cases</h4>
            <ul>
              <li>Display API error responses</li>
              <li>Show validation errors</li>
              <li>Present system error messages</li>
              <li>Display localized error messages using i18n</li>
            </ul>
            
            <h4>Integration</h4>
            <div class="bg-light p-3 rounded">
              <h6>Import Statement:</h6>
              <pre><code>import ErrorDialog from './components/common/ErrorDialog.vue'</code></pre>
              
              <h6 class="mt-3">Component Registration:</h6>
              <pre><code>components: {
  ErrorDialog
}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Props Tab -->
      <div v-show="activeTab === 'props'">
        <div class="text-center py-5 text-muted">
          No props defined for this component
        </div>
      </div>

      <!-- Events Tab -->
      <div v-show="activeTab === 'events'">
        <div class="text-center py-5 text-muted">
          No events defined for this component
        </div>
      </div>

      <!-- Slots Tab -->
      <div v-show="activeTab === 'slots'">
        <div class="text-center py-5 text-muted">
          No slots defined for this component
        </div>
      </div>

      <!-- Examples Tab -->
      <div v-show="activeTab === 'examples'">
        <div class="mb-4">
          <h5>Show Error Dialog</h5>
          <p class="text-muted">Display error message using the show method</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;ErrorDialog ref="errorDialog" /&gt;

&lt;!-- Show error --&gt;
&lt;script&gt;
// Simple string message
this.$refs.errorDialog.show('An error occurred')

// Structured error with type
this.$refs.errorDialog.show({
  type: 'validation_failed',
  params: { field: 'email' }
})
&lt;/script&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorDialogComponentPage',
  data() {
    return {
      activeTab: 'overview'
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

/* Tab content styling */
.tab-content {
  animation: fadeIn 0.3s ease-in-out;
}

.tab-pane {
  display: block;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
