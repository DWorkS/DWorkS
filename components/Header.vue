<template>
  <div>
    <v-navigation-drawer v-model="drawer" temporary app class="nav-drawer">
      <v-card color="primary white--text" flat tile class="flex inset-padding-top inset-padding-left">
        <v-container>
          <span>
            <v-btn v-if="!isUserLoggedIn" fab light small @click.native.stop="dialog = true">
              <v-icon x-large color="primary darken-2">face</v-icon>
            </v-btn>
            <v-avatar v-else>
              <img :src="userAvatar" alt="User">
            </v-avatar>
          </span>
          <h3 class="white--text body-1 mt-3">
            {{ userName }}
          </h3>
        </v-container>
      </v-card>
      <v-switch v-model="darkTheme" class="pl-3" pl-3 :label="`${darkTheme ? `Dark` : ` Light `} Theme`" />
    </v-navigation-drawer>
    <v-app-bar :color="toolbarColor" dark app fixed :height="!colored ? 64 : 0" :flat="!colored" class="toolbar-index">
      <v-toolbar-side-icon v-if="showHamburger" aria-label="drawer menu" @click.stop="drawer = !drawer" />
      <v-btn v-else icon @click.stop="handleBack()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title v-show="title" class="ml-0">
        <h1 v-show="title" class="title">
          {{ title }}
        </h1>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon aria-label="share" @click="share()">
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
      <v-bottom-sheet v-model="sheet" class="bottom-index">
        <v-list>
          <v-subheader>Share</v-subheader>
          <v-list-item v-for="tile in $store.state.shareItems" :key="tile.title" @click="shareUrl(tile.title)">
            <v-list-item-avatar>
              <v-avatar size="32px" tile>
                <img :src="`${tile.img}`" :alt="tile.title">
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-title>{{ tile.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-bottom-sheet>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  props: ['colored', 'items', 'title'],
  data: () => ({
    dialog: false,
    color: 'transparent',
    drawer: false,
    sheet: false,
    home: '/',
    shareText: 'I found this very useful website to get live coding help from expert developers'
  }),
  computed: {
    toolbarColor() {
      return this.colored ? 'primary' : 'transparent'
    },
    shareTitle() {
      return this.$store.state.appName
    },
    isUserLoggedIn() {
      return this.$store.state.user && this.$store.state.user.email
    },
    userName() {
      if (this.isUserLoggedIn) {
        return this.$store.state.user.name
      }
      return 'Hello! Developer'
    },
    userAvatar() {
      return this.$store.state.user.photo
    },
    darkTheme: {
      get() {
        return this.$store.state.darkTheme
      },
      set(value) {
        this.$store.commit('SET_DARK_THEME', value)
      }
    },
    showHamburger() {
      return ['/', '/about', '/contact'].includes(this.$route.path)
    }
  },
  methods: {
    share() {
      if (navigator.share) {
        const url = this.$getFullUrl(this.$route.path)
        navigator.share({
          title: this.shareTitle,
          text: this.shareText,
          url
        })
      } else {
        this.sheet = true
      }
    },
    shareUrl(social) {
      this.sheet = false
      const url = this.$getFullUrl(this.$route.path)

      let shareUrl
      switch (social) {
        case 'Facebook':
          shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + url
          break

        case 'Twitter':
          shareUrl =
              'http://twitter.com/share?text=' + this.shareText + '&url=' + url
          break

        case 'Google+':
          shareUrl = 'https://plus.google.com/share?url=' + url
          break

        case 'LinkedIn':
          shareUrl =
              'https://www.linkedin.com/shareArticle?mini=true&title=' +
              this.shareTitle +
              '&summary=' +
              this.shareText +
              '&url=' +
              url
          break
      }
      window.open(shareUrl, 'sharer', 'width=626,height=436')
    },
    handleNavigation(item) {
      switch (item.icon) {
        default:
          if (item.to) {
            this.$router.push(item.to)
          }
      }
    },
    handleBack() {
      if (window.history.length > 1) {
        this.$router.back()
      } else {
        this.$router.push('/')
      }
    }
  }
}

</script>
