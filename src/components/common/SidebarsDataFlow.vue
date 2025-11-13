<template>
  <div class="bg-light row g-0 position-relative h-100">
    <transition name="slide-left"> <!-- In a fixed component the margin-top must be applied right in the component -->
      <div v-show="leftOpen" class="border border-top-0" :class="colClasses(leftSize)" style="position: absolute; top: 0; left: 0; bottom: 0; z-index: 0">
        <button v-if="leftCaption" type="button" class="btn btn-light w-100 rounded-0 border border-top-0 border-end-0"
                style="min-height: 45px; font-size: 15px" @click="$emit('update:leftOpen', false)">
          <span class="mdi mdi-chevron-left float-end"></span>
          {{ leftCaption }}
        </button>
        <div class="bg-light" :style="{ height: leftCaption ? 'calc(100% - 50px)' : '100%' }">
          <slot name="left"></slot>
        </div>
      </div>
    </transition>

    <div class="sidebars-middle h-100 position-relative" :class="middleClasses"
         :style="{ 'padding-left': leftCaption && !leftOpen ? '40px' : '0', 'padding-right': rightCaption && !rightOpen ? '40px' : '0' }">
      <slot></slot>
    </div>
    <transition name="fade"> <!-- In a fixed component the margin-top must be applied right in the component -->
      <button v-if="!leftOpen && leftCaption" type="button" class="btn btn-light rounded-0 border border-end-0 text-nowrap position-absolute w-auto" @click="$emit('update:leftOpen', true)"
              style="right: 100%; transform: rotate(-90deg); transform-origin: right top">
        {{ leftCaption }}
        <i class="mdi mdi-chevron-down"></i>
      </button>
    </transition>

    <transition name="slide-right"> <!-- In a fixed component the margin-top must be applied right in the component -->
      <div v-show="rightOpen" class="border border-top-0" :class="colClasses(rightSize)" style="position: absolute; top: 0; right: 0; bottom: 0">
        <button v-if="rightCaption" type="button" class="btn btn-light w-100 rounded-0 border border-top-0 border-start-0"
                style="min-height: 45px; font-size: 15px" @click="$emit('update:rightOpen', false)">
          <span class="mdi mdi-chevron-right float-start"></span>
          {{ rightCaption }}
        </button>
        <div :style="{ height: rightCaption ? 'calc(100% - 50px)' : '100%' }">
          <slot name="right"></slot>
        </div>
      </div>
    </transition>
    <transition name="fade"> <!-- In a fixed component the margin-top must be applied right in the component -->
      <button v-if="!rightOpen && rightCaption" type="button" class="btn btn-light rounded-0 border border-start-0 text-nowrap" @click="$emit('update:rightOpen', true)"
              style="position: absolute; left: 100%; transform: rotate(90deg); transform-origin: left top">
        <i class="mdi mdi-chevron-down"></i>
        {{ rightCaption }}
      </button>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarsDataFlow',
  props: { leftOpen: Boolean, rightOpen: Boolean, leftCaption: String, rightCaption: String,
    leftSize: { type: Array, default: function() { return [12, 6, 4, 3, 3] } },
    rightSize: { type: Array, default: function() { return [12, 6, 4, 3, 3] } }
  },
  computed: {
    middleClasses: function() {
      if (this.leftOpen) {
        var middleSize = this.leftSize.map((val, i) => { return 12 - val - (this.rightOpen ? this.rightSize[i] : 0) })
        var offset = this.leftSize.map((size, i) => { return 'offset-' + this.breakpoints[i] + size }).join(' ')
        return this.colClasses(middleSize) + ' ' + offset
      } else if (this.rightOpen) return this.colClasses(this.rightSize.map(val => { return 12 - val }))
      else return 'col-12'
    },
    breakpoints: function() {
      return ['', 'sm-', 'md-', 'lg-', 'xl-']
    }
  },
  methods: { // https://help.optimizely.com/Build_Campaigns_and_Experiments/Use_screen_measurements_to_design_for_responsive_breakpoints
    showMain: function(keepRight) {
      if (window.innerWidth < 576) { // sm breakpoint
        this.$emit('update:leftOpen', false)
        this.$emit('update:rightOpen', false)
      } else if (window.innerWidth < 768) { // md breakpoint
        if (this.rightOpen && keepRight) this.$emit('update:leftOpen', false)
        else if (this.leftOpen && !keepRight) this.$emit('update:rightOpen', false)
      }
    },
    showRight: function() {
      this.$emit('update:rightOpen', true)
      if (window.innerWidth < 768) this.$emit('update:leftOpen', false)
    },
    colClasses: function(sizes) {
      return sizes.map((size, i) => {
        if (!size) return 'd-none'
        else if (size && i > 0 && !sizes[i-1]) return 'd-' + this.breakpoints[i] + 'block col-' + this.breakpoints[i] + size
        else return 'col-' + this.breakpoints[i] + size
      }).join(' ')
    }
  }
}
</script>
