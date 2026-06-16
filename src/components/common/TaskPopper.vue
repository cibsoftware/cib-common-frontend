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
  <div ref="targetRef">
    <slot :add="addTask" :download="triggerDownload" :busy="busy"></slot>
    <b-popover :manual="true" :placement="placement" ref="pop" @hidden="tasks = []"	:content="''">
      <template v-slot:title>
        <b-button-close style="margin-top: -0.25rem" @click="closePopover" :title="$t('task-popper.close')"></b-button-close>
        <span>{{ title }}</span>
      </template>
    </b-popover>
  </div>
</template>

<script>

function repeatWithTimeout(interval, fun) {
  setTimeout(function() {	if (fun()) repeatWithTimeout(interval, fun)	}, interval)
}

export default {
  name: 'TaskPopper',
  props: { placement: String, target: [Function, String], title: String, delayAt: Number },
  data() { return {	tasks: [], busy: false } },
  methods: {
    addTask(name, cancel, promiseFactory) {
      const length = this.tasks.push({ name, cancel, state: null, progress: 0 })
      this.$refs.pop.$emit('open')
      if (promiseFactory) {
        return promiseFactory(handleProgress, fakeProgress).then(function(res) {
          update(true)
          return res
        }, function(err) {
          update(false)
          throw err
        })
      } else return update

      function handleProgress(evt) { update(evt.loaded * (this.delayAt || 100) / evt.total) }
      function update(val) {
        this.tasks[length-1][typeof val === 'boolean' ? 'state' : 'progress'] = val
        this.busy = this.tasks.some(function(f) { return f.state == null })
        if (val === true && this.tasks.every(function(t) { return t.state }) && this.$refs.pop) // autoclose
        this.$refs.pop.$emit('close')
      }
      function fakeProgress() {
        const seq = [45, 66, 79, 87, 92, 95, 98, 99] // reverse fibonacci complement
        let i = 0
        repeatWithTimeout(1000, function() {
          update(seq[i++])
          return i < seq.length && this.tasks[length-1].state == null
        })
      }
    },
    triggerDownload(blob, filename) {
      if (navigator.msSaveBlob) navigator.msSaveBlob(blob, filename) // Internet Explorer
      else {
        let hiddenFile = document.createElement('a')
        hiddenFile.href = globalThis.URL.createObjectURL(blob)
        hiddenFile.download = filename
        document.body.appendChild(hiddenFile)
        hiddenFile.click()
        setTimeout(function() { // Workaround for Edge
          hiddenFile.remove()
          globalThis.URL.revokeObjectURL(hiddenFile.href)
        }, 500)
      }
    }
  }
}
</script>
