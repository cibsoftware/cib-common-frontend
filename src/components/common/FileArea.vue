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
  <div class="file-area" :class="{ 'file-area-dragover': dragover, 'file-area-disabled': disabled }">
    <div class="file-area-backdrop"></div>

    <!-- The transparent input covers the whole area, so it receives the clicks and the dropped files -->
    <input type="file" :accept="accept" :disabled="disabled" :multiple="multiple" ref="input" :aria-label="title"
      class="file-area-input" @change="onChange($event.target.files)"
      @dragenter="dragover = true" @dragleave="dragover = false" @drop="dragover = false">

    <img :src="img || uploadIcon" alt="" class="file-area-icon"
      :style="{ height: (height || 43) + 'px', 'margin-top': (height || 100) / 4 + 'px' }">

    <div class="file-area-title" :style="{ 'margin-bottom': (height || 100) / 4 + 'px' }">
      {{ title }}
    </div>
  </div>
</template>

<script>
import uploadIcon from '@/assets/upload.svg'

// Drop zone / click area to select files. Emits 'select' with the accepted files.
// `accept` uses the syntax of <input type="file">: MIME types (image/png, image/*) or file endings (.pdf).
export default {
  name: 'FileArea',
  props: { accept: String, multiple: Boolean, disabled: Boolean, img: String, height: Number },
  emits: ['select'],
  data() { return { dragover: false, uploadIcon } },
  computed: {
    title() { return this.multiple ? this.$t('file-area.titleBelowMultiple') : this.$t('file-area.titleBelowSingle') }
  },
  methods: {
    // https://stackoverflow.com/questions/1703228/how-can-i-clear-an-html-file-input-with-javascript
    clear() { this.$refs.input.value = null },
    onChange(fileList) {
      if (!fileList || fileList.length === 0) return
      const accepted = Array.from(fileList).filter(file => this.isFileAcceptable(file))
      if (accepted.length) this.$emit('select', accepted)
      else this.clear()
    },
    isFileAcceptable(file) {
      return !this.accept || this.accept.split(',').map(type => type.trim()).some(allowedType => {
        // MIME type like image/png or image/*
        if (allowedType.includes('/')) return file.type.startsWith(allowedType.replace('*', ''))
        // file ending like .png
        return file.name.toLowerCase().endsWith(allowedType.toLowerCase())
      })
    }
  }
}
</script>

<style>
.file-area {
  position: relative;
  border: 2px dashed var(--bs-gray-500, #adb5bd);
  border-radius: 20px;
}
.file-area-backdrop {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.file-area-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.file-area-icon {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.file-area-title {
  text-align: center;
}
.file-area:not(.file-area-disabled):is(:hover, :focus-within, .file-area-dragover) {
  border-color: var(--bs-primary, #4781d9);
}
.file-area:not(.file-area-disabled):is(:hover, :focus-within, .file-area-dragover) .file-area-backdrop {
  background-color: var(--bs-primary, #4781d9);
  opacity: 0.05;
}
.file-area:not(.file-area-disabled):is(:hover, :focus-within, .file-area-dragover) .file-area-title {
  text-decoration: underline;
}
</style>
