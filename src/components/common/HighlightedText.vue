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
  <span><template v-for="(part, index) in parts" :key="index"><mark v-if="part.highlighted" class="p-0">{{ part.text }}</mark><template v-else>{{ part.text }}</template></template></span>
</template>

<script>
import { escapeRegExp } from '../../utils/escape.js'

export default {
  name: 'HighlightedText',
  props: {
    text: {
      type: String,
      default: ''
    },
    keyword: {
      type: String,
      required: true
    }
  },
  computed: {
    /**
     * Splits the text into the segments that match the keyword and the segments
     * around them. The segments are rendered as text nodes, so the markup this
     * component emits is only the <mark> element in the template - the text
     * itself is never turned into HTML and so needs no escaping.
     */
    parts() {
      if (!this.text) return []

      if (!this.keyword) return [{ text: this.text, highlighted: false }]

      // The keyword is quoted so its regex metacharacters are matched
      // literally, instead of making the RegExp constructor throw.
      const regex = new RegExp(`(${escapeRegExp(this.keyword)})`, 'gi')

      // Splitting on a pattern with one capturing group keeps the matches in
      // the result, at the odd positions.
      return this.text.split(regex)
        .map((segment, index) => ({ text: segment, highlighted: index % 2 === 1 }))
        .filter(part => part.text !== '')
    }
  }
}
</script>
