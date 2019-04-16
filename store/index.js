export const state = () => ({
  homeMenuItems: [
    { title: 'Pricing', path: '#pricing', icon: 'card_giftcard' },
    { title: 'Experts', path: '#experts', icon: 'code' }
    // { title: 'Login', path: 'login', icon: 'person' },
  ],
  headerItems: [
    { icon: 'home', text: 'Home', to: '/' },
    { divider: true }
  ],
  contactItems: [
    { title: 'Email', icon: 'mdi-email', to: 'mailto:hello@dworks.io' },
    { title: 'Twitter', icon: 'mdi-twitter', to: 'https://twitter.com/1hakr/' },
    { title: 'Telegram', icon: 'mdi-telegram', to: 'http://t.me/dworks' },
    { title: 'Github', icon: 'mdi-github-circle', to: 'https://github.com/dworks' }
  ],
  footerItems: [
    { title: 'Home', to: '/' },
    { title: 'Terms', to: '/policies/terms.html' },
    { title: 'Privacy', to: '/policies/privacy.html' }
  ],
  footerSocialItems: [
    { img: 'facebook.svg', title: 'Facebook', url: 'https://www.facebook.com/1DWorkS' },
    { img: 'twitter.svg', title: 'Twitter', url: 'https://twitter.com/1hakr' },
    { img: 'gplus.svg', title: 'Google+', url: 'https://plus.google.com/+HariKrishnaDulipudi' }
  ],
  shareItems: [
    { img: 'facebook.svg', title: 'Facebook' },
    { img: 'twitter.svg', title: 'Twitter' },
    { img: 'linkedin.svg', title: 'LinkedIn' },
    { img: 'gplus.svg', title: 'Google+' }
  ],
  projects: [
    {
      title: 'Visa List',
      tag: 'visalist',
      content: 'Find all the countries you can visit on your passport and know the visa requirements',
      imgUrl: '/visalist-background.jpg',
      url: 'https://visalist.io'
    },
    {
      title: 'ACrypto: Cryptocurrency Tracker',
      tag: 'acrypto',
      content: 'Simple cryptocurrency Price, Arbitrage, News, Alerts and Portfolio Tracker',
      imgUrl: '/acrypto-background.jpg',
      url: 'https://acrypto.io'
    },
    {
      title: 'AnExplorer: All-in-one file manager',
      tag: 'anexplorer',
      content: 'Simple All-in-one file manager for phone, tablets, watches, chromebook and TV',
      imgUrl: '/anexplorer-background.jpg',
      url: 'https://anexplorer.co'
    },
    {
      title: 'ALauncher',
      tag: 'alauncher',
      content: 'Simple launcher with app lock, google feed, themes for phones, tablets and TV',
      imgUrl: '/alauncher-background.jpg',
      url: 'https://play.google.com/store/apps/details?id=dev.dworks.apps.alauncher'
    },
    {
      title: 'AWatch',
      tag: 'awatch',
      content: 'Elegant watch face for wear os watches and screensaver for phones, tablets and TV',
      imgUrl: '/awatch-background.jpg',
      url: 'https://play.google.com/store/apps/details?id=dev.dworks.apps.awatch'
    }
  ],
  opensource: [
    {
      title: 'Volley Plus',
      tag: 'volleyplus',
      content: 'Android library with improvements to Volley along with full image caching.',
      imgUrl: '/volleyplus-background.jpg',
      url: 'https://github.com/DWorkS/VolleyPlus'
    },
    {
      title: 'AWizard',
      tag: 'awizard',
      content: 'Android library which can be used for creating wizards very easily. It\'s based of Roman Nurik\'s wizard pager.',
      imgUrl: '/awizard-background.jpg',
      url: 'https://github.com/DWorkS/AWizard'
    },
    {
      title: 'AStickyHeader',
      tag: 'astickyheader',
      content: 'AStickyHeader is an android library for adding Sticky Headers to ListView or GridView. Usage is very simple, it supports all kinds of Adapters.',
      imgUrl: '/astickyheader-background.jpg',
      url: 'https://github.com/DWorkS/AStickyHeader'
    },
    {
      title: 'ATaxer',
      tag: 'ataxer',
      content: 'Another Taxer android app helps you calculate tax with ease.',
      imgUrl: '/ataxer-background.jpg',
      url: 'https://github.com/1hakr/ATaxer'
    }
  ],
  currentTitle: 'DWorkS',
  appName: 'DWorkS',
  appDomain: 'dworks.io',
  user: {},
  token: ''
})

export const mutations = {
  SET_CURRENT_TITLE (state, payload) {
    state.currentTitle = payload
  },
  SET_USER (state, payload) {
    state.user = payload
  },
  SET_TOKEN (state, payload) {
    state.token = payload
  }
}

export default {
  state: state,
  mutations: mutations
}
