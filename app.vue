<template>
  <div>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#111827' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  },
  script: [{
    children: `
    const nuxtColorMode = localStorage.getItem('nuxt-color-mode')
    const isDarkMode = ['dark'].includes(nuxtColorMode) || (!(nuxtColorMode) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    if(isDarkMode){
      document.documentElement.setAttribute("class", "dark")
    }`}
  ]
})

useSeoMeta({
  titleTemplate: '%s - DWorkS',
  ogImage: '/feature_grpahic.png',
  twitterImage: '/feature_grpahic.png',
  twitterCard: 'summary_large_image'
})

const links = [{
  label: 'About',
  to: '/about'
}, {
  label: 'Open',
  to: '/open'
}, {
  label: 'Terms',
  to: '/terms'
}, {
  label: 'Privacy',
  to: '/privacy'
}]
const commonData = useState('commonData', () => shallowRef({
  links: {
    company: links
  }
}))
</script>
