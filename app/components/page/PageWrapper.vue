<template>
  <div>
    <div v-if="!showContent" class="flex justify-center text-center mx-auto min-h-[calc(100vh-var(--header-height))]"
      :class="positionClass">
      <Progress v-if="!error" size="xl" />
      <LazyPageEmpty v-else :online="false" />
    </div>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script setup lang="ts">
const onlineState = useOnline()
const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  showTop: {
    type: Boolean,
    default: false
  },
  showEmpty: {
    type: Boolean,
    default: true
  },
  error: {
    type: Object,
    default: undefined
  }
})

const error = ref(false)
const showContent = ref(!props.loading)
let timeout: any

const positionClass = computed(() => (props.showTop ? 'mt-[100px]' : 'items-center'))

watch(() => props.loading, (value) => {
  const timer = value ? 500 : 100
  showContentSlot(value, timer)
})

watch(() => onlineState.value, (value) => {
  if (!value && !showContent.value) {
    error.value = true
  }
})

watch(() => props.error, (value) => {
  if (value) {
    error.value = true
    throw createError({ statusCode: 404, statusMessage: 'errors.content_not_loaded', fatal: true })
    // throw createError({ ...props.error })
  }
})

onMounted(() => {
  showContentSlot(props.loading, 100)
  setError()
})

onUnmounted(() => {
  cancelError()
})

function setError() {
  timeout = setTimeout(() => {
    error.value = true
  }, 30 * 1000)
}

function cancelError() {
  clearTimeout(timeout)
}

function showContentSlot(value: boolean, timer: number = 100) {
  setTimeout(() => {
    showContent.value = !value
  }, timer)
}
</script>