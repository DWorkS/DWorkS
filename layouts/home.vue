<template>
  <v-app :dark="false">
    <span itemscope itemtype="http://schema.org/Organization">
      <meta itemprop="name" content="DWorkS">
      <link itemprop="url" href="https://dworks.io/">
      <link itemprop="logo" src="https://dworks.io/logo.png">
      <link itemprop="sameAs" href="https://facebook.com/1hakr">
      <link itemprop="sameAs" href="https://twitter.com/1hakr">
      <link itemprop="sameAs" href="https://instagram.com/1hakr">
    </span>
    <div itemscope itemtype="http://schema.org/WebSite">
      <meta itemprop="name" content="DWorKS">
      <meta itemprop="alternateName" content="Get help from developer experts across the world">
      <meta itemprop="url" content="https://dworks.co/">
    </div>
    <v-main>
      <nuxt />
    </v-main>
    <v-snackbar v-model="snackbar" :timeout="-1" color="#ffffff" :top="true" :multi-line="true" class="black--text">
      <span>
        🏆😻 <b>VisaList</b> is Nominated at Golden Kitty Awards 2018 for Side
        Project!
      </span>
      <v-btn color="#DA552F" @click="openProductHunt()">
        &nbsp;&nbsp;&nbsp;Vote now&nbsp;&nbsp;&nbsp;
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sidebar: false,
      snackbar: false,
      colored: false,
      dialog: false,
      menuItems: [{ title: 'Login', path: 'login', icon: 'code' }]
    }
  },
  head() {
    const formattedTitle = 'DWorkS - Microstartup and Opensource apps'
    const description =
      'Bulding microstartups like acrypto and anexplorer and to make a small difference in the world'
    const head = {
      title: formattedTitle,
      titleTemplate: null,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { property: 'og:title', hid: 'og:title', content: formattedTitle },
        { property: 'og:site_name', hid: 'og:site_name', content: 'DWorKS' },
        { property: 'og:url', content: this.$getFullUrl(this.$route.path) },
        {
          property: 'og:image',
          content: this.$getFullUrl('/feature_graphic.jpg')
        },
        {
          property: 'og:description',
          hid: 'og:description',
          content: description
        },
        { property: 'twitter:title', content: formattedTitle },
        {
          property: 'twitter:site',
          content: this.$getFullUrl(this.$route.path)
        },
        {
          property: 'twitter:image',
          content: this.$getFullUrl('/feature_graphic.jpg')
        },
        { property: 'twitter:description', content: description }
      ],
      link: [{ rel: 'canonical', href: this.$getFullUrl(this.$route.path) }],
      script: [{ src: '/pwacompat.js', async: true }]
    }
    return head
  },
  computed: {
    toolbarColor() {
      return this.colored ? 'primary' : 'transparent'
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.snackbar = false
    })
  },
  methods: {
    onNavigation(section) {
      switch (section) {
        case 'login':
          this.dialog = true
          break
        default:
          this.$vuetify.goTo(section)
          break
      }
    },
    onScroll(e) {
      this.colored = window.scrollY > 100
    },
    openProductHunt() {
      this.snackbar = false
      window
        .open(
          'https://www.producthunt.com/golden-kitty-awards-2018#side-project',
          '_blank'
        )
        .focus()
    }
  }
}
</script>
