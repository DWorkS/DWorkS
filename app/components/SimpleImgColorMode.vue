<template>
  <SimpleImg :src="imageSrc" v-bind="$attrs" class="dark:hidden" />
  <SimpleImg :src="imageSrc" v-bind="$attrs" class="hidden dark:block" />
</template>

<script setup lang="ts">
const colorMode = useColorMode()

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  dark: {
    type: String,
    required: true
  },
  light: {
    type: String,
    required: true
  }
})
const darkMode = computed(() => colorMode.value === 'dark')
const imageSrc = computed(() => darkMode.value ? props.dark : props.light)
</script>
