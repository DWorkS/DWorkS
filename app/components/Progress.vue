<template>
  <div class="mt-8">
    <svg aria-hidden="true" class="text-secondary-600 dark:text-secondary-200" xmlns="http://www.w3.org/2000/svg"
      fill="none" viewBox="0 0 24 24" :class="`${iconSize} ${spinStyle}`">
      <path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 12a8 8 0 018-8">
        <animateTransform attributeName="transform" type="rotate" :from="rotationStart" :to="rotationEnd" dur="5s"
          repeatCount="indefinite" />
      </path>
    </svg>
  </div>
</template>
<script setup lang="ts">
const isRtl = isLocaleRtl()
const props = defineProps({
  size: {
    type: String,
    default: 'lg'
  }
})

const spinStyle = computed(() => isRtl.value ? 'animate-[spin_1s_linear_infinite_reverse]' : 'animate-spin')
const rotationStart = computed(() => isRtl.value ? '360 12 12' : '0 12 12')
const rotationEnd = computed(() => isRtl.value ? '0 12 12' : '360 12 12')
const iconSize = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'w-6 h-6'
    case 'sm':
      return 'w-8 h-8'
    case 'md':
      return 'w-12 h-12'
    case 'lg':
      return 'w-14 h-14'
    case 'xl':
      return 'w-16 h-16'
    case '2xl':
      return 'w-20 h-20'
    default:
      return 'w-10 h-10'
  }
})
</script>