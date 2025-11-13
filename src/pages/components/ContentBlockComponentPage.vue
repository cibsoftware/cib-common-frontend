<template>
  <div class="component-page h-100">
    <!-- Component Documentation Header -->
    <div class="container border-bottom border-light pb-3 mb-4">
      <div class="row align-items-center">
        <div class="col-12">
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <h2 class="mb-1 d-flex align-items-center">
                <span class="mdi mdi-24px me-2 mdi-card-outline"></span>
                ContentBlock
                <small class="badge ms-2 bg-success">Vue Component</small>
              </h2>
              <p class="text-muted mb-0">Reusable content block with consistent styling</p>
            </div>
            <div class="text-end">
              <small class="text-muted d-block">Category: Layout</small>
              <small class="text-muted d-block">File: ContentBlock.vue</small>
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
      <div v-show="activeTab === 'overview'" class="tab-pane">
        <div class="row">
          <div class="col-12">
            <h4>Purpose</h4>
            <p>ContentBlock provides a standardized content container with consistent padding, borders, and spacing for creating uniform layouts. It features a card-like design with Bootstrap styling, including a header section with title and optional info popover, an actions area, and a main content area.</p>
            
            <h4>Use Cases</h4>
            <ul>
              <li>Wrap content sections with consistent styling</li>
              <li>Create card-like content blocks with headers and actions</li>
              <li>Organize page content into structured sections</li>
              <li>Apply standard CIB content styling across the application</li>
              <li>Display content with optional help information and action buttons</li>
            </ul>
            
            <h4>Integration</h4>
            <div class="bg-light p-3 rounded">
              <h6>Import Statement:</h6>
              <pre><code>import ContentBlock from './components/common/ContentBlock.vue'</code></pre>
              
              <h6 class="mt-3">Component Registration:</h6>
              <pre><code>components: {
  ContentBlock
}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Props Tab -->
      <div v-show="activeTab === 'props'" class="tab-pane">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Default</th>
                <th>Required</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>title</code></td>
                <td><span class="badge bg-info">String</span></td>
                <td><code>undefined</code></td>
                <td><span class="badge bg-success">No</span></td>
                <td>Title text displayed in the header section of the content block</td>
              </tr>
              <tr>
                <td><code>info</code></td>
                <td><span class="badge bg-info">String</span></td>
                <td><code>undefined</code></td>
                <td><span class="badge bg-success">No</span></td>
                <td>Information text shown as a popover when hovering over the info icon next to the title</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Events Tab -->
      <div v-show="activeTab === 'events'" class="tab-pane">
        <div class="text-center py-5 text-muted">
          This component does not emit any events
        </div>
      </div>

      <!-- Slots Tab -->
      <div v-show="activeTab === 'slots'" class="tab-pane">
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
                <td><code>none</code></td>
                <td>Main content area of the block, displayed below the header section</td>
              </tr>
              <tr>
                <td><code>actions</code></td>
                <td><code>none</code></td>
                <td>Action buttons or controls displayed in the top-right corner of the header</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Examples Tab -->
      <div v-show="activeTab === 'examples'" class="tab-pane">
        <div class="mb-4">
          <h5>Basic Content Block</h5>
          <p class="text-muted">Simple content block with title and content</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;ContentBlock title="User Information"&gt;
  &lt;div class="col-12"&gt;
    &lt;p&gt;This is the main content area of the block.&lt;/p&gt;
    &lt;p&gt;You can put any content here, including forms, lists, or text.&lt;/p&gt;
  &lt;/div&gt;
&lt;/ContentBlock&gt;</code></pre>
          </div>
        </div>

        <div class="mb-4">
          <h5>Content Block with Info Popover</h5>
          <p class="text-muted">Content block with title and informational popover</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;ContentBlock 
  title="Settings" 
  info="Configure your application preferences and options here"&gt;
  &lt;div class="col-12"&gt;
    &lt;form&gt;
      &lt;div class="mb-3"&gt;
        &lt;label class="form-label"&gt;Username&lt;/label&gt;
        &lt;input type="text" class="form-control" v-model="username"&gt;
      &lt;/div&gt;
      &lt;div class="mb-3"&gt;
        &lt;label class="form-label"&gt;Email&lt;/label&gt;
        &lt;input type="email" class="form-control" v-model="email"&gt;
      &lt;/div&gt;
    &lt;/form&gt;
  &lt;/div&gt;
&lt;/ContentBlock&gt;</code></pre>
          </div>
        </div>

        <div class="mb-4">
          <h5>Content Block with Actions</h5>
          <p class="text-muted">Content block with title, info, and action buttons in the header</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;ContentBlock 
  title="Data Table" 
  info="This table shows all available records with pagination"&gt;
  &lt;template #actions&gt;
    &lt;button class="btn btn-primary btn-sm me-2"&gt;
      &lt;i class="mdi mdi-plus"&gt;&lt;/i&gt; Add New
    &lt;/button&gt;
    &lt;button class="btn btn-outline-secondary btn-sm"&gt;
      &lt;i class="mdi mdi-refresh"&gt;&lt;/i&gt; Refresh
    &lt;/button&gt;
  &lt;/template&gt;
  
  &lt;div class="col-12"&gt;
    &lt;table class="table table-striped"&gt;
      &lt;thead&gt;
        &lt;tr&gt;
          &lt;th&gt;Name&lt;/th&gt;
          &lt;th&gt;Email&lt;/th&gt;
          &lt;th&gt;Status&lt;/th&gt;
        &lt;/tr&gt;
      &lt;/thead&gt;
      &lt;tbody&gt;
        &lt;tr&gt;
          &lt;td&gt;John Doe&lt;/td&gt;
          &lt;td&gt;john@example.com&lt;/td&gt;
          &lt;td&gt;&lt;span class="badge bg-success"&gt;Active&lt;/span&gt;&lt;/td&gt;
        &lt;/tr&gt;
      &lt;/tbody&gt;
    &lt;/table&gt;
  &lt;/div&gt;
&lt;/ContentBlock&gt;</code></pre>
          </div>
        </div>

        <div class="mb-4">
          <h5>Multiple Content Blocks Layout</h5>
          <p class="text-muted">Example of using multiple content blocks in a grid layout</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;div class="row"&gt;
  &lt;div class="col-md-6"&gt;
    &lt;ContentBlock title="Quick Stats"&gt;
      &lt;div class="col-12"&gt;
        &lt;div class="row text-center"&gt;
          &lt;div class="col-4"&gt;
            &lt;h3&gt;150&lt;/h3&gt;
            &lt;small&gt;Total Users&lt;/small&gt;
          &lt;/div&gt;
          &lt;div class="col-4"&gt;
            &lt;h3&gt;45&lt;/h3&gt;
            &lt;small&gt;Active Today&lt;/small&gt;
          &lt;/div&gt;
          &lt;div class="col-4"&gt;
            &lt;h3&gt;23&lt;/h3&gt;
            &lt;small&gt;New This Week&lt;/small&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/ContentBlock&gt;
  &lt;/div&gt;
  
  &lt;div class="col-md-6"&gt;
    &lt;ContentBlock title="Recent Activity"&gt;
      &lt;div class="col-12"&gt;
        &lt;ul class="list-group list-group-flush"&gt;
          &lt;li class="list-group-item"&gt;User John logged in&lt;/li&gt;
          &lt;li class="list-group-item"&gt;New data imported&lt;/li&gt;
          &lt;li class="list-group-item"&gt;System backup completed&lt;/li&gt;
        &lt;/ul&gt;
      &lt;/div&gt;
    &lt;/ContentBlock&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentBlockComponentPage',
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
