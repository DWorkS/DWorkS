<template>
  <div>
    <img v-if="lazy" :data-src="path" :alt="alt" decoding="async"
      :style="`height: ${calculatedHeight}; width: ${calculatedWidth};`" class="lazyload"
      :class="`${styleClass} ${opacityClass}`" v-bind="$attrs" @error="onImgError" @load="onImgLoad">
    <img v-else :src="path" :alt="alt" :style="`height: ${calculatedHeight}; width: ${calculatedWidth};`"
      v-bind="$attrs" loading="eager" decoding="async" @error="onImgError">
  </div>
</template>

<script setup lang="ts">

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
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
  lazy: {
    type: Boolean,
    default: true
  }
})
const visible = ref(false)
const path = ref(props.src)
const styleClass = ref('transition-opacity duration-500 ease-linear delay-0')
const opacityClass = computed(() => visible.value ? 'opacity-100' : 'opacity-0')

let calculatedHeight = props.height
if (props.height && !isNaN(Number(props.height))) {
  calculatedHeight = `${props.height}px`
}

let calculatedWidth = props.width
if (props.width && !isNaN(Number(props.width))) {
  calculatedWidth = `${props.width}px`
}

function onImgError(event: any) {
  visible.value = false
}

function onImgLoad(event: any) {
  visible.value = true
}

watch(() => props.src, () => {
  path.value = props.src
})

</script>