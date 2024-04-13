<script setup lang="ts">
const commonData = useState('commonData')

const links = commonData.value['links']['company']
</script>

<template>
  <BaseFooter :links="links">
    <template #left>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Copyright © DWorkS - {{ new Date().getFullYear() }}. All rights reserved.
      </p>
    </template>

    <template #right>
      <ThemeSwitcher />
      <UButton to="https://1hakr.com/?referrer=dworks" target="_blank" icon="i-heroicons-link" aria-label="GitHub" color="gray" variant="ghost" />
      <UButton to="https://twitter.com/1hakr/" target="_blank" icon="i-simple-icons-twitter" aria-label="GitHub" color="gray" variant="ghost" />
      <UButton to="http://t.me/OneHaKr" target="_blank" icon="i-simple-icons-telegram" aria-label="GitHub" color="gray" variant="ghost" />
      <UButton to="https://github.com/dworks" target="_blank" icon="i-simple-icons-github" aria-label="GitHub" color="gray" variant="ghost" />
    </template>
  </BaseFooter>
</template>
