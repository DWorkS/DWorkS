<template>
  <section class="prose dark:prose-invert max-w-full text-base" :class="padding">
    <article>
      <slot />
    </article>
  </section>
</template>

<script setup lang="ts">

const props = defineProps({
  padding: {
    type: Boolean,
    default: false
  }
})

const padding = computed(() => props.padding ? 'mt-4' : '')
</script>