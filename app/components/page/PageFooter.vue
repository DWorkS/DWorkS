<template>
  <div :as="as" data-slot="root" class="px-0 sm:px-6 lg:px-8 py-0">

    <UContainer class="pt-6 pb-4 mb-0 rounded-t-2xl dark bg-[#23272a]">
      <div v-if="!!slots.top" data-slot="top" class="py-2 lg:py-2">
        <slot name="top" />
      </div>
      <UContainer data-slot="container" class="py-8 lg:py-4 lg:flex lg:items-center lg:justify-between lg:gap-x-3">
        <div data-slot="right" class="lg:flex-1 flex items-center justify-center lg:justify-end gap-x-1.5 lg:order-3">
          <slot name="right" />
        </div>

        <div data-slot="center" class="mt-3 lg:mt-0 lg:order-2 flex items-center justify-center">
          <slot />
        </div>

        <div data-slot="left"
          class="flex items-center justify-center lg:justify-start lg:flex-1 gap-x-1.5 mt-3 lg:mt-0 lg:order-1">
          <slot name="left" />
        </div>
      </UContainer>
    </UContainer>

    <div v-if="!!slots.bottom" data-slot="bottom" class="py-8 lg:py-12">
      <slot name="bottom" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  as: { type: null, required: false, default: "footer" },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots()
</script>