<template>
  <div class="component-page h-100">
    <!-- Component Documentation Header -->
    <div class="container border-bottom border-light pb-3 mb-4">
      <div class="row align-items-center">
        <div class="col-12">
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <h2 class="mb-1 d-flex align-items-center">
                <span class="mdi mdi-24px me-2 mdi-page-layout-sidebar-left"></span>
                SidebarsDataFlow
                <small class="badge ms-2 bg-success">Vue Component</small>
              </h2>
              <p class="text-muted mb-0">Collapsible sidebar layout component with left and right panels</p>
            </div>
            <div class="text-end">
              <small class="text-muted d-block">Category: Layout</small>
              <small class="text-muted d-block">File: SidebarsDataFlow.vue</small>
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
            <p>SidebarsDataFlow provides a flexible layout with collapsible left and right sidebars, perfect for creating dashboard-style interfaces with navigation panels and detail views.</p>
            
            <h4>Use Cases</h4>
            <ul>
              <li>Dashboard layouts with navigation sidebar</li>
              <li>Master-detail views with collapsible panels</li>
              <li>Three-column layouts with optional sidebars</li>
              <li>Responsive layouts that hide sidebars on mobile</li>
            </ul>
            
            <h4>Integration</h4>
            <div class="bg-light p-3 rounded">
              <h6>Import Statement:</h6>
              <pre><code>import SidebarsDataFlow from './components/common/SidebarsDataFlow.vue'</code></pre>
              
              <h6 class="mt-3">Component Registration:</h6>
              <pre><code>components: {
  SidebarsDataFlow
}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Props Tab -->
      <div v-show="activeTab === 'props'">
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
              <tr v-for="prop in componentData.props" :key="prop.name">
                <td><code>{{ prop.name }}</code></td>
                <td><span class="badge bg-info">{{ prop.type }}</span></td>
                <td><code>{{ prop.default || 'undefined' }}</code></td>
                <td><span class="badge" :class="prop.required ? 'bg-danger' : 'bg-success'">{{ prop.required ? 'Yes' : 'No' }}</span></td>
                <td>{{ prop.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Events Tab -->
      <div v-show="activeTab === 'events'">
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
              <tr v-for="event in componentData.events" :key="event.name">
                <td><code>@{{ event.name }}</code></td>
                <td><code>{{ event.parameters || 'none' }}</code></td>
                <td>{{ event.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Slots Tab -->
      <div v-show="activeTab === 'slots'">
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
              <tr v-for="slot in componentData.slots" :key="slot.name">
                <td><code>{{ slot.name || 'default' }}</code></td>
                <td><code>{{ slot.scopedProps || 'none' }}</code></td>
                <td>{{ slot.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Examples Tab -->
      <div v-show="activeTab === 'examples'">
        <div v-for="(example, index) in componentData.examples" :key="index" class="mb-4">
          <h5>{{ example.title }}</h5>
          <p class="text-muted">{{ example.description }}</p>
          <div class="bg-light p-3 rounded">
            <pre><code>{{ example.code }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarsDataFlowComponentPage',
  data() {
    return {
      activeTab: 'overview',
      componentData: {
        props: [
          { name: 'leftOpen', type: 'Boolean', default: 'undefined', required: false, description: 'Controls left sidebar visibility (v-model:left-open)' },
          { name: 'rightOpen', type: 'Boolean', default: 'undefined', required: false, description: 'Controls right sidebar visibility (v-model:right-open)' },
          { name: 'leftCaption', type: 'String', default: 'undefined', required: false, description: 'Caption text for left sidebar toggle button' },
          { name: 'rightCaption', type: 'String', default: 'undefined', required: false, description: 'Caption text for right sidebar toggle button' },
          { name: 'leftSize', type: 'Array', default: '[12, 6, 4, 3, 3]', required: false, description: 'Bootstrap column sizes for left sidebar across breakpoints' },
          { name: 'rightSize', type: 'Array', default: '[12, 6, 4, 3, 3]', required: false, description: 'Bootstrap column sizes for right sidebar across breakpoints' }
        ],
        events: [
          { name: 'update:leftOpen', parameters: 'boolean', description: 'Emitted when left sidebar visibility changes' },
          { name: 'update:rightOpen', parameters: 'boolean', description: 'Emitted when right sidebar visibility changes' }
        ],
        slots: [
          { name: 'default', scopedProps: 'none', description: 'Main content area between sidebars' },
          { name: 'left', scopedProps: 'none', description: 'Left sidebar content' },
          { name: 'right', scopedProps: 'none', description: 'Right sidebar content' }
        ],
        examples: [
          {
            title: 'Basic Layout',
            description: 'Simple layout with left navigation and main content',
            code: `<SidebarsDataFlow
  v-model:left-open="showSidebar"
  left-caption="Navigation">
  <template #left>
    <!-- Navigation content -->
  </template>
  
  <!-- Main content -->
  <div>Main content area</div>
</SidebarsDataFlow>`
          }
        ]
      }
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