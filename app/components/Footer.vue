<template>
  <PageFooter>
    <template #left>
      <p class="text-sm text-muted">
        {{ t('footer.copyright') }} &copy; DWorkS {{ formatNumber(2009) }} &ndash; {{ formatNumber(2026) }} {{
          t('footer.rights') }}
      </p>
    </template>

    <UNavigationMenu :items="links" />

    <template #right>
      <div class="flex items-center gap-1">
        <UButton to="https://1hakr.com/?referrer=dworks" target="_blank" icon="i-heroicons-link" aria-label="GitHub"
          color="neutral" variant="ghost" />
        <UButton to="https://twitter.com/1hakr/" target="_blank" icon="i-simple-icons-twitter" aria-label="GitHub"
          color="neutral" variant="ghost" />
        <UButton to="http://t.me/OneHaKr" target="_blank" icon="i-simple-icons-telegram" aria-label="GitHub"
          color="neutral" variant="ghost" />
        <UButton to="https://github.com/dworks" target="_blank" icon="i-simple-icons-github" aria-label="GitHub"
          color="neutral" variant="ghost" />
      </div>
      <ThemeSwitcher />
    </template>
  </PageFooter>
</template>

<script setup lang="ts">

const { t } = useI18n()

const links = [
  { label: t('nav.about'), to: '/about' },
  { label: t('nav.open'), to: '/open' },
  { label: t('nav.terms'), to: '/terms' },
  { label: t('nav.privacy'), to: '/privacy' }
]
</script>
