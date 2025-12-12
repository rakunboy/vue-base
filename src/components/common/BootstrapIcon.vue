<template>
  <i :class="iconClass" :style="iconStyle" aria-hidden="true"></i>
  <!-- <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    99+
  </span> -->
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  icon: string
  size?: number | string
  extraClass?: string
}>()

const iconClass = computed(() => {
  const classes = ['bi', `bi-${props.icon}`]
  if (props.extraClass) classes.push(props.extraClass)
  return classes
})

const iconStyle = computed(() => {
  const s = props.size
  if (s == null || s === '') return {}
  if (typeof s === 'number') {
    return { fontSize: `${s}px` } // number => px
  }
  // string: if it's only digits (e.g. "24") treat as px
  if (/^\d+$/.test(s)) return { fontSize: `${s}px` }
  // otherwise assume user passed a valid CSS size (e.g. "1.5rem", "24px", "2em")
  return { fontSize: s }
})
</script>
