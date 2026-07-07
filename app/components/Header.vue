<template>
  <UHeader :ui="{ toggle: 'hidden' }">
    <template #left>
      <ULink :to="localePath('/')" aria-label="logo"
        class="shrink-0 font-bold text-xl text-gray-900 dark:text-white flex items-end gap-1.5">
        <Logo class="w-auto h-6" />
      </ULink>

    </template>
  </UHeader>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

</script>
