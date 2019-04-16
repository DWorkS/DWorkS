require('dotenv').config()
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const nodeExternals = require('webpack-node-externals')

const themeColor = '#2C2C2C'
const appName = 'DWorkS'

module.exports = {
  /*
  ** Headers of the page
  */

  head: {
    title: appName,
    titleTemplate: '%s - ' + appName,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,minimum-scale=1,user-scalable=0,viewport-fit=cover' },
      { name: 'application-name', content: appName },
      { hid: 'keywords', name: 'keywords', content: 'startups, microstartups, opensource, apps, websites' }
    ],
    link: [
      { hid: 'apple-touch-icon', rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'mask-icon', color: '#2C2C2C', href: '/safari-pinned-tab.svg' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'shortcut icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl',
    '@mdi/font/css/materialdesignicons.min.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    ['@nuxtjs/google-analytics', {
      id: process.env.ANALYTICS_ID,
      debug: { sendHitTask: process.env.ANALYTICS_ENABLED }
    }],
    '@nuxtjs/sentry',
    '@nuxtjs/redirect-module'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  /*
  ** Customize app manifest
  */
  manifest: {
    name: appName,
    short_name: appName,
    description: 'Bulding microstartups and opensource projects to make a small difference in the world.',
    author: 'Hari Krishna Dulipudi',
    background_color: themeColor,
    theme_color: themeColor,
    scope: '/'
  },
  meta: {
    nativeUI: true,
    mobileApp: false,
    mobileAppIOS: false
  },
  // redirect: [
  //   { from: '^/policies/terms.html', to: '/policies/terms', statusCode: 301 },
  //   { from: '^/policies/privacy.html', to: '/policies/privacy', statusCode: 301 }
  // ],
  render: {
    http2: {
      push: true
    },
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    },
    static: {
      maxAge: '1y',
      setHeaders (res, path) {
        if (path.includes('sw.js')) {
          res.setHeader('Cache-Control', `public, max-age=${15 * 60}`)
        }
      }
    }
  },
  generate: {
    dir: 'public'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    transpile: ['vuetify/lib'],
    plugins: [
      new VuetifyLoaderPlugin()
    ],
    extractCSS: true,
    optimization: {
      splitChunks: {
        name: false
      }
    },
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    }
  }
}
