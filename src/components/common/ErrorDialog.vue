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
  <b-modal ref="modal" :title="$t('error.title') || 'Error'" :ok-only="true" style="z-index: 1056">
    <div class="container-fluid">
      <div class="d-flex align-items-center">
        <div class="me-4">
          <span class="mdi-36px mdi mdi-alert-octagon-outline text-danger"></span>
        </div>
        <!-- min-width: auto leads to min-width: longest word so it will overflow the parent despite the overflow-wrap: break-word -->
        <div style="min-width: 0">
          <p v-for="(line, index) in message.split('\n')" :key="index" style="overflow-wrap: break-word">
            <!-- make strong each quoted word -->
            <span><template v-for="(part, i) in quotedParts(line)" :key="i"><strong v-if="part.strong">{{ part.text }}</strong><template v-else>{{ part.text }}</template></template></span>
          </p>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'ErrorDialog',
  data() { return { message: '' } },
  methods: {
    /**
     * Splits a line into the quoted words and the segments around them, keeping
     * the quotes themselves as text. The segments are rendered as text nodes,
     * so the markup this dialog emits is only the <strong> element in the
     * template - the message is never turned into HTML.
     */
    quotedParts(line) {
      const parts = []
      // Splitting on a pattern with one capturing group keeps the quoted
      // tokens in the result, at the odd positions.
      line.split(/("[^"]*")/g).forEach((segment, index) => {
        if (index % 2 === 0) {
          if (segment) parts.push({ text: segment, strong: false })
          return
        }
        parts.push({ text: '"', strong: false })
        parts.push({ text: segment.slice(1, -1), strong: true })
        parts.push({ text: '"', strong: false })
      })
      return parts
    },
    show(error) {
      this.message = error.type ? this.$t('errors.' + error.type, error.params) : error
      this.$refs.modal.show()
    }
  }
}
</script>
