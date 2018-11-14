<template>
  <v-app dark class="primary">
    <span itemscope itemtype="http://schema.org/Organization">
      <meta itemprop="name" content="DWorkS"/>
      <link itemprop="url" href="https://dworks.io/"/>
      <link itemprop="logo" src="https://dworks.io/logo.png"/>  
      <link itemprop="sameAs" href="https://facebook.com/1hakr"/>  
      <link itemprop="sameAs" href="https://twitter.com/1hakr" />  
      <link itemprop="sameAs" href="https://instagram.com/1hakr" />
    </span>
    <div itemscope itemtype="http://schema.org/WebSite">
      <meta itemprop="name" content="DWorKS"/>
      <meta itemprop="alternateName" content="Get help from developer experts across the world"/>
      <meta itemprop="url" content="https://dworks.co/"/>
    </div>
    <v-content>
      <nuxt />
    </v-content>
    <!-- <Footer /> -->
  </v-app>
</template>

<script>
  import Footer from '~/components/Footer.vue'
  export default {
    components: {
      Footer
    },
    data() {
      return {
        sidebar: false,
        colored: false,
        dialog: false,
        menuItems: [
          { title: 'Login', path: 'login', icon: 'code' },
        ],
      }
    },
    computed: {
      toolbarColor: function () {
        return this.colored ? 'primary' : 'transparent'
      }
    },
    methods: {
      onNavigation(section){
        switch (section) {
          case 'login' :
            this.dialog = true
            break
          default:
            this.$vuetify.goTo(section)
            break

        }
      },
      onScroll (e) {
        this.colored = window.scrollY > 100
      },
      getFullUrl (path) {
        const host = process.server ? this.$store.state.appDomain : window.location.host
        const barehost = host.replace('www.', '')
        return `https://${barehost}${path}`
      }
    },
    head () {
      const formattedTitle = `DWorkS - Microstartup and Opensource apps`
      const description = 'Bulding microstartups like acrypto and anexplorer and to make a small difference in the world'
      var head = {
        title: formattedTitle,
        titleTemplate: null,
        meta: [
          { hid: 'description', name: 'description', content: description },
          { property: 'og:title', hid: 'og:title', content: formattedTitle },
          { property: 'og:site_name', hid: 'og:site_name', content: 'DWorKS' },
          { property: 'og:url', content: this.getFullUrl(this.$route.path) },
          { property: 'og:image', content: this.getFullUrl('/feature_graphic.jpg') },
          { property: 'og:description', hid: 'og:description', content: description },
          { property: 'twitter:title', content: formattedTitle },
          { property: 'twitter:site', content: this.getFullUrl(this.$route.path) },
          { property: 'twitter:image', content: this.getFullUrl('/feature_graphic.jpg') },
          { property: 'twitter:description', content: description }
        ],
        link: [
          { rel: 'canonical', href: this.getFullUrl(this.$route.path) }
        ],
        script: [
          { src: '/pwacompat.js', async: true }
        ]
      }
      return head
    }
  }

</script>
