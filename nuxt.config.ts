// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-07-07',
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxtjs/i18n',
    '@nuxtjs/device',
    '@vueuse/nuxt',
    'nuxt-gtag',
    'nuxt-og-image'
  ],
  css: ['~/assets/main.css'],
  routeRules: {
    '/about.html': { redirect: { to: '/', statusCode: 301 } },
    '/policies/privacy': { redirect: { to: '/privacy', statusCode: 301 } },
    '/policies/terms': { redirect: { to: '/terms', statusCode: 301 } },
    '/policies/privacy.html': { redirect: { to: '/privacy', statusCode: 301 } },
    '/policies/terms.html': { redirect: { to: '/terms', statusCode: 301 } },
  },
  i18n: {
    langDir: 'locales',
    strategy: 'prefix_except_default',
    baseUrl: 'https://dworks.io',
    defaultLocale: 'en',
    debug: false,
    skipSettingLocaleOnNavigate: true,
    detectBrowserLanguage: false,
    locales: [
      {
        code: 'en',
        iso: 'en',
        language: 'en',
        name: 'English',
        file: 'en.json'
      }
    ],
  },
  gtag: {
    id: 'G-JQ2311JC7Y'
  },
  ogImage: { 
    zeroRuntime: true
  },
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ]
    }
  }
})
