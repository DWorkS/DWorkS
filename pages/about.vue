<template>
  <v-container full-height class="view" mt-2 fluid grid-list-md>
    <v-layout d-flex row wrap justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="pa-3">
          <div class="v-list">
            <a class="v-list__tile v-list__tile--link">
              <div class="v-list__tile__avatar">
                <img src="/logo.png" height="40">
              </div>
              <v-list-tile-title>{{
                $store.state.appName
              }}</v-list-tile-title>
            </a>
            <div class="pa-3">
              <span>
                DWorkS helps anyone who wants get support from experts for their
                jobs, projects or anything. You can easily get the consistent
                support on daily basis easily now.
              </span>
            </div>
          </div>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm8 md6>
        <v-card class="pa-3">
          <div class="mb-3 text-center">
            <v-btn large fab text light href="https://twitter.com/1HaKr" title="1HaKr twitter profile" target="_blank">
              <v-avatar size="70">
                <img src="/photo.jpg" alt="Hari Krishna">
              </v-avatar>
            </v-btn>
          </div>
          <span>My name is <strong>Hari</strong>. I made
            <strong>{{ $store.state.appName }}</strong>. We made this because we think a product like this needs to
            exist.
          </span>
          <h4 class="mt-4 title text-center">
            Made with ❤️
          </h4>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm8 md6>
        <v-card class="pa-3">
          <div class="v-list">
            <list-item id="Email" icon="email" title="Feed us back and give suggestions" />
            <list-item id="Twitter" image="/twitter.svg" title="Follow us on Twitter" />
            <list-item id="Facebook" image="/facebook.svg" title="Follow us on Facebook" />
            <list-item id="Google+" image="/gplus.svg" title="Follow us on Google+" />
          </div>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm8 md6>
        <v-card class="pa-4">
          <h2 class="title py-3">
            <b>Why {{ $store.state.appName }}?</b>
          </h2>
          <span>
            A year back i became one of my friends asked me to help him with his
            project. So as a friend i did but soon he kept asking me for help
            and i quickly found out that in the begining of their career lots of
            developers need this kind of help. And
            {{ $store.state.appName }} was born.
          </span>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ListItem from '~/components/ListItem.vue'
export default {
  name: 'About',
  components: {
    ListItem
  },
  asyncData({
    store
  }) {
    store.commit('SET_CURRENT_TITLE', 'About Us')
  },
  data() {
    return {
      sheet: false
    }
  },
  head() {
    return {
      title: 'About Us',
      titleTemplate: '%s - DWorkS',
      meta: [{
        name: 'description',
        hid: 'description',
        content: 'Bulding microstartups like acrypto and anexplorer and to make a small difference in the world'
      }]
    }
  }
}

</script>
