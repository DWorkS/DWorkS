<template>
  <img :src="src" :alt="alt" :width="width" :height="height" loading="auto" decoding="async" onerror="this.style.display='none'">
</template>

<script>
export default {
  name: 'SimpleImage',
  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: 'auto'
    },
    height: {
      type: String,
      default: 'auto'
    },
    lazyload: {
      type: Boolean,
      default: true
    }
  }
}
</script>
