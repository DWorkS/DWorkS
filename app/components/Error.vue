<template>
  <div class="min-h-[calc(100vh-var(--header-height))] flex flex-col items-center justify-center px-4">
    <div class="py-16">
      <img alt="" src="/images/error.gif" class="w-[596px]">
    </div>

    <p class="text-base font-semibold text-primary-500">
      {{ error?.statusCode || status }}
    </p>

    <h1 class="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mt-2">
      {{ error?.name || error?.statusMessage || name }}
    </h1>

    <p class="mt-6 text-base text-gray-500 dark:text-gray-400 text-center max-w-md">
      {{ error?.message && error.message !== (error.name || error.statusMessage || name) ? error.message : message }}
    </p>

    <div class="mt-10">
      <UButton @click="handleError" label="Go back home" color="primary" size="lg" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { NuxtError } from '#app'

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  error: {
    type: Object as PropType<Partial<NuxtError>>,
    default: undefined
  },
  status: {
    type: Number,
    default: 404
  },
  name: {
    type: String,
    default: 'An error occurred'
  },
  message: {
    type: String,
    default: 'This is not the page you\'re looking for.'
  }
})

const handleError = () => clearError({ redirect: '/' })
</script>
