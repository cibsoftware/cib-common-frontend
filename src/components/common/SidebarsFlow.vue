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
  <div class="row g-0 position-relative h-100 bg-light">
    <transition name="slide-left"> <!-- In a fixed component the margin-top must be applied right in the component -->
      <div v-show="leftOpen" class="position-absolute border-end bg-white" :class="colClasses(leftSize)" style="top: 0; left: 0; bottom: 0; z-index: 0">
        <!-- The header holds the heading and one toggle; a button may contain neither a heading nor
             other buttons. The toggle stretches over the header, so clicking anywhere still closes it -->
        <div v-if="leftCaption" class="sidebars-header btn btn-light rounded-0 border-bottom text-start d-flex align-items-center position-relative w-100" style="min-height: 40px; line-height: 20px;">
          <!-- First in the tab order, as the header was before; order-last and ms-auto keep it at the right end on screen -->
          <button ref="leftSidebar" type="button" :aria-label="leftCaption + (number != null ? ' ' + number + ' ' + $t('sidebars.tasks', number) : '')" :aria-expanded="String(leftOpen)"
            class="stretched-link order-last ms-auto border-0 p-0 bg-transparent text-reset" @click="$emit('update:leftOpen', false)">
            <!-- Decorative only, as it renders inside the toggle: controls go in leftActions -->
            <slot name="leftIcon">
              <span class="mdi mdi-18px mdi-chevron-left" aria-hidden="true"></span>
            </slot>
          </button>
          <!-- w-75 leaves the right of the header to controls a caller positions over it -->
          <h2 class="h5 m-0 w-75" style="word-wrap: break-word">{{ leftCaption }}<span v-if="number != null" class="h5 ps-2"><b-badge pill variant="light" :title="numberTooltip">{{ number }}</b-badge></span></h2>
          <!-- Controls of the caller sit next to the toggle, never inside it. They join the header row
               (order-first puts one before the heading), and absolutely positioned ones are placed
               against the header -->
          <div v-if="$slots.leftActions" class="sidebars-header-actions">
            <slot name="leftActions"></slot>
          </div>
        </div>
        <div :style="{ height: leftCaption ? 'calc(100% - ' + headerCalc + ')' : '100%' }">
          <slot name="left"></slot>
        </div>
      </div>
    </transition>

    <div class="sidebars-middle h-100 position-relative" :class="middleClasses"
         :style="{ 'padding-left': leftCaption && !leftOpen ? '40px' : '0', 'padding-right': rightCaption && !rightOpen ? '40px' : '0' }">
      <slot></slot>
    </div>
    <transition name="fade"> <!-- In a fixed component the margin-top must be applied right in the component -->
      <slot name="filter">
        <b-button v-if="!leftOpen && leftCaption" :aria-label="leftCaption" :aria-expanded="String(leftOpen)" variant="light" class="rounded-0 border-end-0 text-nowrap position-absolute w-auto" @click="$emit('update:leftOpen', true)"
                  style="right: 100%; transform: rotate(-90deg); transform-origin: right top">
          {{ leftCaption }} <span v-if="number != null"><b-badge pill variant="light">{{ number }}</b-badge></span>
          <i class="mdi mdi-18px mdi-chevron-down"></i>
        </b-button>
      </slot>
    </transition>

    <transition name="slide-right"> <!-- In a fixed component the margin-top must be applied right in the component -->
      <div v-show="rightOpen" class="border position-absolute border-top-0" :class="colClasses(rightSize)" style="top: 0; right: 0; bottom: 0">
        <div v-if="rightCaption" class="sidebars-header btn btn-light rounded-0 border-bottom border-end d-flex align-items-center position-relative w-100" style="min-height: 40px; line-height: 20px;">
          <button type="button" :aria-label="rightCaption" :aria-expanded="String(rightOpen)"
            class="stretched-link border-0 p-0 bg-transparent text-reset" @click="$emit('update:rightOpen', false)">
            <span class="mdi mdi-18px mdi-chevron-right" aria-hidden="true"></span>
          </button>
          <h2 class="h5 m-0 flex-fill">{{ rightCaption }}</h2>
        </div>
        <div :style="{ height: rightCaption ? 'calc(100% - ' + headerCalc + ')' : '100%' }">
          <slot name="right"></slot>
        </div>
      </div>
    </transition>
    <transition name="fade"> <!-- In a fixed component the margin-top must be applied right in the component -->
      <b-button v-if="!rightOpen && rightCaption" variant="light" class="rounded-0 border-start-0 text-nowrap position-absolute w-auto" @click="$emit('update:rightOpen', true)"
                style="left: 100%; transform: rotate(90deg); transform-origin: left top">
        <i class="mdi mdi-18px mdi-chevron-down"></i>
        {{ rightCaption }}
      </b-button>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarsFlow',
  props: {
    leftOpen: Boolean,
    rightOpen: Boolean,
    leftCaption: String,
    rightCaption: String,
    leftSize: { type: Array, default() { return [12, 6, 4, 3, 3] } },
    rightSize: { type: Array, default() { return [12, 6, 4, 2, 2] } },
    number: Number,
    numberTooltip: String,
    headerCalc: { type: String, default: '40px' }
  },
  emits: ['update:rightOpen', 'update:leftOpen'],
  computed: {
    middleClasses() {
      if (this.leftOpen) {
        const middleSize = this.leftSize.map((val, i) => { return 12 - val - (this.rightOpen ? this.rightSize[i] : 0) })
        const offset = this.leftSize.map((size, i) => { return 'offset-' + this.breakpoints[i] + size }).join(' ')
        return this.colClasses(middleSize) + ' ' + offset
      } else if (this.rightOpen) return this.colClasses(this.rightSize.map(val => { return 12 - val }))
      else return 'col-12'
    },
    breakpoints() {
      return ['', 'sm-', 'md-', 'lg-', 'xl-']
    }
  },
  methods: { // https://help.optimizely.com/Build_Campaigns_and_Experiments/Use_screen_measurements_to_design_for_responsive_breakpoints
    showMain(keepRight) {
      if (globalThis.innerWidth < 576) { // sm breakpoint
        this.$emit('update:leftOpen', false)
        this.$emit('update:rightOpen', false)
      } else if (globalThis.innerWidth < 768) { // md breakpoint
        if (this.rightOpen && keepRight) this.$emit('update:leftOpen', false)
        else if (this.leftOpen && !keepRight) this.$emit('update:rightOpen', false)
      }
    },
    showRight() {
      this.$emit('update:rightOpen', true)
      if (globalThis.innerWidth < 768) this.$emit('update:leftOpen', false)
    },
    colClasses(sizes) {
      return sizes.map((size, i) => {
        if (!size) return 'd-none'
        else if (size && i > 0 && !sizes[i-1]) return 'd-' + this.breakpoints[i] + 'block col-' + this.breakpoints[i] + size
        else return 'col-' + this.breakpoints[i] + size
      }).join(' ')
    }
  }
}
</script>

<style lang="css" scoped>
/* The focus ring of buttons (2px line, 2px gap) on the whole header, which the toggle's click area
   covers; inside its edge, as the header spans the sidebar. !important beats the theme's button rule */
.sidebars-header .stretched-link:focus-visible {
  outline: none !important;
}
.sidebars-header .stretched-link:focus-visible::after {
  outline: 2px solid var(--bs-body-color);
  outline-offset: -4px;
}
/* Below elements laid over the header, such as the task list's refresh button */
.sidebars-header .stretched-link::after {
  z-index: 0;
}
/* The caller's controls are items of the header row */
.sidebars-header-actions {
  display: contents;
}
/* Clickable above the toggle's click area */
.sidebars-header-actions :slotted(*) {
  position: relative;
  z-index: 1;
}
</style>
