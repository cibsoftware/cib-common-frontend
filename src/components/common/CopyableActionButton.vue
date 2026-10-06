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
  <div
      v-if="valueToCopy"
      class="position-relative w-100"
      role="presentation"
      @mouseenter="hovered = true" @mouseleave="hovered = false"
      @focusin="handleFocusIn" @focusout="handleFocusOut" @keydown="handleKeydown"
  >
    <component
        :is="componentType"
        v-bind="{ ...$attrs, ...bindAttrs }"
        :class="containerClasses"
        :title="title || displayValue"
        @click="handleClick"
    >
      {{ displayValue }}
    </component>
    <button
        v-if="showCopyButton"
        type="button"
        @click.stop.prevent="handleCopy"
        @keydown.enter.stop.prevent="handleCopy"
        @keydown.space.stop.prevent="handleCopy"
        :title="$t('commons.copyValue') + ':\n' + valueToCopy"
        :aria-label="$t('commons.copyValue') + ': ' + valueToCopy"
        class="btn btn-link p-0 m-0 bg-transparent mdi mdi-18px position-absolute top-50 end-0 translate-middle-y text-secondary lh-sm"
        :class="copied ? 'mdi-check' : 'mdi-content-copy'"
    ></button>
    <span class="visually-hidden" aria-live="polite">{{ copied ? $t('commons.copied') : '' }}</span>
  </div>
</template>

<script>
const COPIED_FEEDBACK_MS = 1250

export default {
  name: 'CopyableActionButton',
  // The wrapper div only provides hover/focus handling and positioning. Attributes such as
  // target, class or data-* are meant for the interactive element (button, a, router-link).
  inheritAttrs: false,
  props: {
    /**
     * The value to display in the button
     */
    displayValue: {
      type: String,
      default: '',
    },
    /**
     * The value to copy to clipboard (defaults to displayValue)
     */
    copyValue: {
      type: String,
      default: null,
    },
    /**
     * Custom title attribute (defaults to displayValue)
     */
    title: {
      type: String,
      default: null,
    },
    /**
     * Whether the component should be clickable (button) or just text with copy
     */
    clickable: {
      type: Boolean,
      default: true,
    },
    /**
     * Router link destination - can be string, object, or route location
     */
    to: {
      type: [String, Object],
      default: null,
    },
    /**
     * Whether to open the link in a new tab
     */
    newTab: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click', 'copy'],
  data() {
    return {
      hovered: false,
      focused: false,
      copied: false,
    }
  },
  computed: {
    showCopyButton() {
      // stay visible while the "copied" feedback is shown, even if the pointer already left
      return this.hovered || this.focused || this.copied
    },
    componentType() {
      if (this.to) {
        return this.newTab ? 'a' : 'router-link'
      }
      return this.clickable ? 'button' : 'div'
    },
    valueToCopy() {
      return this.copyValue || this.displayValue
    },
    containerClasses() {
      const baseClasses = {
        'text-truncate': true,
        'pe-4': this.showCopyButton,
        'w-100': true,
      }
      if (this.to) {
        // Router link styling
        return {
          ...baseClasses,
          'd-block': true,
        }
      } else if (this.clickable) {
        // Button styling
        return {
          ...baseClasses,
          btn: true,
          'btn-link': true,
          'p-0': true,
          'text-start': true,
          'd-block': true,
        }
      } else {
        // Non-clickable div styling
        return {
          ...baseClasses,
        }
      }
    },
    bindAttrs() {
      if (this.componentType === 'router-link') {
        return { to: this.to }
      }
      if (this.componentType === 'a') {
        // For hash mode, we need to construct the full URL with hash
        let href
        if (typeof this.to === 'string') {
          // If it's already a full URL, use it as is, otherwise add hash
          href = this.to.startsWith('http') ? this.to : `#${this.to}`
        } else if (this.$router) {
          const resolved = this.$router.resolve(this.to)
          // Get the base URL from current location, ensuring we include the context path
          const baseUrl = globalThis.location.origin + globalThis.location.pathname.split('#')[0]
          const query = new URLSearchParams(resolved.query).toString()
          href = baseUrl + '#' + resolved.path + (query ? '?' + query : '')
        }
        return {
          href,
          target: '_blank',
          rel: 'noopener',
        }
      }
      return {}
    },
  },
  methods: {
    handleClick(event) {
      // Stop event propagation to prevent parent elements from handling the click
      if (event) {
        event.stopPropagation()
      }

      // For router links and anchor tags, let the browser handle the navigation
      if (this.to) {
        return // Let the default behavior happen
      }

      // Only emit click event for buttons or non-router links
      if (this.clickable) {
        this.$emit('click', event)
      }
    },
    handleFocusIn(event) {
      // Only keyboard focus keeps the copy button visible. A mouse click also focuses the button,
      // and that focus would keep it visible after the pointer has left.
      this.focused = this.isFocusVisible(event.target)
    },
    handleKeydown(event) {
      // An element focused with the mouse becomes :focus-visible once the user starts using the keyboard,
      // but no focusin is fired for that, so the copy button would be skipped by Tab.
      if (!this.focused && this.isFocusVisible(event.target)) {
        this.focused = true
      }
    },
    isFocusVisible(element) {
      try {
        return element.matches(':focus-visible')
      } catch {
        return true // browsers without :focus-visible support
      }
    },
    handleFocusOut(event) {
      // While focus moves between the main element and the copy button, the copy button must stay in the DOM:
      // Vue re-renders between focusout and focusin, and a removed button cannot receive the focus.
      if (!this.$el.contains(event.relatedTarget)) {
        this.focused = false
      }
    },
    handleCopy() {
      this.$emit('copy', this.valueToCopy)
      this.showCopiedFeedback()
    },
    showCopiedFeedback() {
      clearTimeout(this.copiedTimer)
      this.copied = true
      this.copiedTimer = setTimeout(this.resetCopiedFeedback, COPIED_FEEDBACK_MS)
    },
    resetCopiedFeedback() {
      clearTimeout(this.copiedTimer)
      this.copied = false
    },
  },
  watch: {
    valueToCopy() {
      // the instance may be reused for another row, so the feedback must not stick to the new value
      this.resetCopiedFeedback()
    },
  },
  beforeUnmount() {
    clearTimeout(this.copiedTimer)
  },
}
</script>
