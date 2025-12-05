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
                <span class="mdi mdi-24px me-2 mdi-form-select"></span>
                CIBForm
                <small class="badge ms-2 bg-success">Vue Component</small>
              </h2>
              <p class="text-muted mb-0">Form wrapper component following CIB design patterns</p>
            </div>
            <div class="text-end">
              <small class="text-muted d-block">Category: Forms</small>
              <small class="text-muted d-block">File: CIBForm.vue</small>
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
      <div v-show="activeTab === 'overview'" >
        <div class="row">
          <div class="col-12">
            <h4>Purpose</h4>
            <p>CIBForm is a form wrapper component that provides HTML5 validation functionality with Bootstrap styling. It handles form submission, validation state management, and provides visual feedback for form validation errors.</p>
            
            <h4>Use Cases</h4>
            <ul>
              <li>Create forms with HTML5 validation</li>
              <li>Handle form submission with validation feedback</li>
              <li>Apply Bootstrap validation styles automatically</li>
              <li>Provide consistent form behavior across the application</li>
              <li>Manage validation state and user feedback</li>
            </ul>
            
            <h4>Integration</h4>
            <div class="bg-light p-3 rounded">
              <h6>Import Statement:</h6>
              <pre><code>import CIBForm from './components/common/CIBForm.vue'</code></pre>
              
              <h6 class="mt-3">Component Registration:</h6>
              <pre><code>components: {
  CIBForm
}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Props Tab -->
      <div v-show="activeTab === 'props'" >
        <div class="text-center py-5 text-muted">
          This component does not define any props. It uses HTML5 form validation attributes directly on form elements.
        </div>
      </div>

      <!-- Events Tab -->
      <div v-show="activeTab === 'events'" >
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Parameters</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>@submitted</code></td>
                <td><code>none</code></td>
                <td>Emitted when the form passes HTML5 validation and is successfully submitted</td>
              </tr>
              <tr>
                <td><code>@fail</code></td>
                <td><code>none</code></td>
                <td>Emitted when the form fails HTML5 validation during submission</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Slots Tab -->
      <div v-show="activeTab === 'slots'" >
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Scoped Props</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>default</code></td>
                <td><code>showValidation</code></td>
                <td>Default slot for form content. Provides <code>showValidation</code> boolean prop to access the current validation state</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Examples Tab -->
      <div v-show="activeTab === 'examples'" >
        <div class="mb-4">
          <h5>Basic Form with Validation</h5>
          <p class="text-muted">Simple form with HTML5 validation and event handling</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;CIBForm @submitted="handleSubmit" @fail="handleValidationError"&gt;
  &lt;div class="mb-3"&gt;
    &lt;label for="email" class="form-label"&gt;Email&lt;/label&gt;
    &lt;input 
      type="email" 
      class="form-control" 
      id="email" 
      v-model="email"
      required
    &gt;
    &lt;div class="invalid-feedback"&gt;
      Please provide a valid email address.
    &lt;/div&gt;
  &lt;/div&gt;
  
  &lt;div class="mb-3"&gt;
    &lt;label for="name" class="form-label"&gt;Name&lt;/label&gt;
    &lt;input 
      type="text" 
      class="form-control" 
      id="name" 
      v-model="name"
      required
      minlength="2"
    &gt;
    &lt;div class="invalid-feedback"&gt;
      Name must be at least 2 characters long.
    &lt;/div&gt;
  &lt;/div&gt;
  
  &lt;button type="submit" class="btn btn-primary"&gt;Submit&lt;/button&gt;
&lt;/CIBForm&gt;</code></pre>
          </div>
        </div>

        <div class="mb-4">
          <h5>Using Scoped Slot for Validation State</h5>
          <p class="text-muted">Access validation state using the showValidation scoped prop</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;CIBForm @submitted="handleSubmit" @fail="handleValidationError"&gt;
  &lt;template #default="{ showValidation }"&gt;
    &lt;div class="mb-3"&gt;
      &lt;label for="username" class="form-label"&gt;Username&lt;/label&gt;
      &lt;input 
        type="text" 
        class="form-control" 
        id="username" 
        v-model="username"
        required
        pattern="[a-zA-Z0-9_]{3,}"
      &gt;
      &lt;div class="invalid-feedback"&gt;
        Username must be at least 3 characters (letters, numbers, underscore only).
      &lt;/div&gt;
    &lt;/div&gt;
    
    &lt;div v-if="showValidation" class="alert alert-warning"&gt;
      Please correct the errors above before submitting.
    &lt;/div&gt;
    
    &lt;button type="submit" class="btn btn-primary"&gt;
      &#123;&#123; showValidation ? 'Fix Errors' : 'Submit' &#125;&#125;
    &lt;/button&gt;
  &lt;/template&gt;
&lt;/CIBForm&gt;</code></pre>
          </div>
        </div>

        <div class="mb-4">
          <h5>Complete Example with Event Handlers</h5>
          <p class="text-muted">Complete Vue component example with data and methods</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;CIBForm @submitted="onFormSubmit" @fail="onFormFail"&gt;
      &lt;div class="row"&gt;
        &lt;div class="col-md-6"&gt;
          &lt;div class="mb-3"&gt;
            &lt;label for="firstName" class="form-label"&gt;First Name&lt;/label&gt;
            &lt;input 
              type="text" 
              class="form-control" 
              id="firstName"
              v-model="form.firstName"
              required
            &gt;
            &lt;div class="invalid-feedback"&gt;First name is required.&lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="col-md-6"&gt;
          &lt;div class="mb-3"&gt;
            &lt;label for="lastName" class="form-label"&gt;Last Name&lt;/label&gt;
            &lt;input 
              type="text" 
              class="form-control" 
              id="lastName"
              v-model="form.lastName"
              required
            &gt;
            &lt;div class="invalid-feedback"&gt;Last name is required.&lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      
      &lt;button type="submit" class="btn btn-success"&gt;Save User&lt;/button&gt;
    &lt;/CIBForm&gt;
    
    &lt;div v-if="message" class="alert alert-info mt-3"&gt;
      &#123;&#123; message &#125;&#125;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  data() {
    return {
      form: {
        firstName: '',
        lastName: ''
      },
      message: ''
    }
  },
  methods: {
    onFormSubmit() {
      this.message = 'Form submitted successfully!'
      console.log('Form data:', this.form)
      // Process form data here
    },
    onFormFail() {
      this.message = 'Please fix the validation errors.'
      console.log('Form validation failed')
    }
  }
}
&lt;/script&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CIBFormComponentPage',
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

/* Smooth transitions */
.tab-content {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
