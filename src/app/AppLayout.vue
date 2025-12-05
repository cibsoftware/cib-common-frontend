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
  <div class="h-100 d-flex flex-column">
    <CIBHeaderFlow :languages="['de', 'en', 'es']" @logout="console.log('logout')">
      <div class="me-auto d-flex flex-column flex-md-row" style="height: 38px">
        <b-navbar-brand class="py-0" title="Home" to="/">
          <img height="38px" alt="CIB Common Frontend" :src="logoPath"/>
          <span class="d-none d-md-inline align-middle"></span>
        </b-navbar-brand>
        <div v-if="pageTitle" style="max-height: 38px;" class="d-flex align-items-center text-truncate">
          <span class="border-start border-secondary py-3 me-3"></span>
          <h3 style="line-height: normal"
              class="m-0 text-secondary text-truncate">{{ pageTitle }}</h3>
        </div>
      </div>

      <div>
        <b-button v-if="true" variant="outline-secondary" @click="console.log('report error')" class="border-0 py-0 d-none d-md-flex" title="Report Issue">
          <span class="mdi mdi-24px mdi-message-alert"></span>
        </b-button>
      </div>
    </CIBHeaderFlow>

    <router-view class="flex-grow-1 overflow-hidden" ref="down"></router-view>

    <!-- Footer -->
    <footer class="bg-light text-center text-muted py-3 border-top">
      <div class="container">
        <small>© {{ new Date().getFullYear() }} CIB Common Frontend Library</small>
      </div>
    </footer>
  </div>
</template>

<script>
import CIBHeaderFlow from '../components/common/CIBHeaderFlow.vue'
import logoSvg from '../assets/logo.svg'

export default {
  name: 'AppLayout',
  components: {
    CIBHeaderFlow
  },
  data() {
    return {
      logoPath: logoSvg,
      pageTitle: 'CIB Common Frontend'
    }
  },
  provide() {
    return {
      currentLanguage: this.currentLanguage
    }
  },
  methods: {
    currentLanguage(newLanguage) {
      if (newLanguage) {
        // Set new language
        this.$i18n.locale = newLanguage
        return newLanguage
      } else {
        // Get current language
        return this.$i18n.locale
      }
    }
  }
}
</script>
