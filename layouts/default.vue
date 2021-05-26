<template>
  <v-app :dark="false">
    <span itemscope itemtype="http://schema.org/Organization">
      <meta itemprop="name" content="DWorkS">
      <link itemprop="url" href="https://dworks.io/">
      <link itemprop="logo" src="https://dworks.io/images/logo.png">
      <link itemprop="sameAs" href="https://facebook.com/1hakr">
      <link itemprop="sameAs" href="https://twitter.com/1hakr">
      <link itemprop="sameAs" href="https://instagram.com/1hakr">
    </span>
    <div itemscope itemtype="http://schema.org/WebSite">
      <meta itemprop="name" content="Dev Mentor">
      <meta
        itemprop="alternateName"
        content="Get help from developer experts across the world"
      >
      <meta itemprop="url" content="https://devmento.co/">
    </div>
    <Header
      :colored="true"
      :items="$store.state.headerItems"
      :title="toolbarTile"
    />
    <v-main>
      <nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      sidebar: false,
      colored: false
    }
  },
  head() {
    const formattedTitle = 'DWorkS - Microstartup and Opensource apps'
    const description =
      'Bulding microstartups like acrypto and anexplorer and to make a small difference in the world'
    const head = {
      title: formattedTitle,
      meta: [
        { hid: 'description', name: 'description', content: description }
      ],
      link: [{ rel: 'canonical', href: this.getFullUrl(this.$route.path) }],
      script: [{ src: '/pwacompat.js', async: true }]
    }
    return head
  },
  computed: {
    toolbarTile() {
      return this.$store.state.currentTitle || this.$store.state.appName
    },
    toolbarColor() {
      return this.colored ? 'primary' : 'transparent'
    }
  },
  methods: {
    getFullUrl(path) {
      const host = process.server
        ? this.$store.state.appDomain
        : window.location.host
      const barehost = host.replace('www.', '')
      return `https://${barehost}${path}`
    }
  }
}
</script>
