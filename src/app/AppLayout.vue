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
import logoSvg from '../assets/logo.svg'

export default {
  name: 'AppLayout',
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
