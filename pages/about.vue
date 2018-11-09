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
              <v-list-tile-title>{{this.$store.state.appName}}</v-list-tile-title>
            </a>
            <div class="pa-3">
            <span>
              DWorkS helps anyone who wants get support from experts for their jobs, projects or anything. 
              You can easily get the consistent support on daily basis easily now.
            </span>
            </div>
          </div>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm8 md6>
        <v-card class="pa-3">
          <div class="mb-3 text-xs-center">
            <v-btn large fab flat light href="https://twitter.com/1HaKr" title="1HaKr twitter profile" target="_blank">
              <v-avatar size="70">
                <img src="/photo.jpg" alt="laxman varma">
              </v-avatar>
            </v-btn>
          </div>  
          <span>My name is <strong>Laxman Varma</strong>. I made <strong>{{this.$store.state.appName}}</strong> along with my friend <strong>Hari</strong>. 
          We made this because we think a product like this needs to exist. </span>
          <h4 class="mt-4 title text-xs-center">Made with ❤️</h4>       
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm8 md6>
        <v-card class="pa-3">
          <div class="v-list">
            <list-item image="/dworks.png" title="Built by DWorkS organisation" id="Dworks" />
            <list-item icon="email" title="Feed us back and give suggestions" id="Email" />
            <list-item image="/twitter.svg" title="Follow us on Twitter" id="Twitter" />
            <list-item image="/facebook.svg" title="Follow us on Facebook" id="Facebook" />
            <list-item image="/gplus.svg" title="Follow us on Google+" id="Google+" />
          </div>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm8 md6>
        <v-card class="pa-4">
          <h2 class="title py-3"><b>Why {{this.$store.state.appName}}?</b></h2>
          <span>
            A year back i became one of my friends asked me to help him with his project. 
            So as a friend i did but soon he kept asking me for help and i quickly 
            found out that in the begining of their career lots of developers need 
            this kind of help. And {{this.$store.state.appName}} was born.
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
    data () {
      return {
        sheet: false
      }
    },
    asyncData ({ store }) {
      store.commit('SET_CURRENT_TITLE', `About Us`)
    },
    head () {
      return {
        title: `About Us`,
        titleTemplate: '%s - DWorkS',
        meta: [
          { name: 'description', hid: 'description', content: 'Bulding microstartups like acrypto and anexplorer and to make a small difference in the world' }
        ]
      }
    }
  }
</script>