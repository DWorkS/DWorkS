<template v-bind="attrs">
  <UContainer>
    <div>
      <slot name="header" />

      <UPage>
        <template v-if="left" #left>
          <slot name="left" />
        </template>
        <UPageBody class="mt-8 pb-8">
          <slot />
          <div v-if="links" class="mt-6 mb-2">
            <UBreadcrumb :items="links" class="mb-6" />
          </div>
        </UPageBody>
        <template v-if="right" #right>

          <slot name="right" />
        </template>
      </UPage>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
defineOptions({
  inheritAttrs: false
})

defineProps({
  title: {
    type: String,
    default: undefined
  },
  description: {
    type: String,
    default: undefined
  },
  left: {
    type: Boolean,
    default: false
  },
  right: {
    type: Boolean,
    default: false
  },
  links: {
    type: Array as PropType<(any & { click?: Function })[]>,
    default: () => []
  }
})

</script>