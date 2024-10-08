// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxthq/studio',
    '@nuxtjs/i18n',
    '@nuxtjs/device',
    '@nuxtjs/fontaine',
    '@vueuse/nuxt',
    'nuxt-delay-hydration',
    'nuxt-build-cache',
    'nuxt-date-fns',
    'nuxt-gtag',
    'nuxt-og-image'
  ],
  delayHydration: { 
    mode: 'mount'
  },
  compatibilityDate: '2024-08-21',
  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    'components:extend': (components) => {
      const globals = components.filter((c) => ['UButton'].includes(c.pascalName))

      globals.forEach((c) => c.global = true)
    }
  },
   
  routeRules: {
    '/about.html': { redirect: { to: '/', statusCode: 301 } },
    '/policies/privacy': { redirect: { to: '/privacy', statusCode: 301 } },
    '/policies/terms': { redirect: { to: '/terms', statusCode: 301 } },
    '/policies/privacy.html': { redirect: { to: '/privacy', statusCode: 301 } },
    '/policies/terms.html': { redirect: { to: '/terms', statusCode: 301 } },
  },
  devtools: {
    enabled: true
  },
  i18n: {
    compilation: {
      // jit: false,
      strictMessage: false,
      escapeHtml: true
    },
    bundle: {
      // dropMessageCompiler: true
    },
    langDir: 'locales',
    lazy: true,
    strategy: 'prefix_except_default',
    baseUrl: 'https://dworks.io',
    defaultLocale: 'en',
    debug: false,
    dynamicRouteParams: true,
    skipSettingLocaleOnNavigate: true,
    detectBrowserLanguage: false,
    locales: [
      {
        code: 'en',
        iso: 'en',
        name: 'English',
        file: 'en.json'
      }
    ],
  },
  gtag: {
    id: 'G-JQ2311JC7Y'
  }
})
