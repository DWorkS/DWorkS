<template>
  <v-layout column>
    <v-container full-height mt-2 fluid grid-list-md>
      <v-layout wrap justify-center class="minheight">
        <v-flex xs12 sm8 md8>
          <span class="text-h5 bolder ml-2">📊 Micro Startup</span>
          <v-layout mt-2 pa-2 row wrap>
            <v-flex xs12 md6>
              <v-card class="pa-4 round-card card-padding">
                <span>
                  <nuxt-link title="DWorkS" to="/"><b>DWorkS</b></nuxt-link>
                  is a <a rel="noopener nofollow" target="_blank" class="main-link" title="Micro Startup" href="https://twitter.com/levelsio/status/1194192590309953537"><b>Micro Startup™</b></a> which means its not a startup or a company and is completely bootstrapped.
                  DWorkS is an <a class="main-link" target="_blank" title="Open Startup" href="https://www.openstartuplist.com" rel="nofollow noreferrer noopener"> <b>Open Startup™</b></a>, which means it operates fully transparent and shares its metrics, including revenue, users and traffic.
                  I'm  proud to share DWorkS stats as part of the Open Startups movement.
                  <br><br>
                  Revenue is partially through by <a rel="noopener nofollow" href="https://stripe.com">Stripe</a>, traffic by <a rel="noopener nofollow" href="https://google.com/analytics">Google Analytics</a>, uptime by <a href="https://simpleops.io?referrer=visalist">Simple Ops</a>.
                </span>
              </v-card>
            </v-flex>
            <v-flex xs12 md6>
              <subscribe-form :responsive="true" />
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm8 md8>
          <span class="title bolder ml-2">💰 Revenue</span>
          <v-card class="pa-2 ma-2 round-card">
            <div class="map-container">
              <v-responsive class="chart-big-iframe">
                <load-only>
                  <iframe
                    class="chart-big-iframe" width="100%" src="https://datastudio.google.com/embed/reporting/afc619e5-3f63-4f56-acb5-d9ec8d2755d3/page/v9aQ"
                    frameborder="0" style="border:0" allowfullscreen @load="load" />
                </load-only>
              </v-responsive>
              <div class="map-progress">
                <v-layout v-if="loading" class="fill-height ma-0" align-center justify-center>
                  <v-progress-circular indeterminate color="blue" class="center" />
                </v-layout>
              </div>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  name: 'Open',
  data() {
    return {
      loading: true
    }
  },
  fetch({ store }) {
    store.commit('SET_CURRENT_TITLE', 'Micro Startup')
  },
  head() {
    const formattedTitle = 'Micro Startup - DWorkS'
    const description = 'DWorkS is a Micro Startup™ which means its not a startup or a company and completely bootstrapped. Its also a Open Startup™ which means it operates fully transparent and shares its metrics, including revenue, users and traffic.'
    const backgroundImage = '/img/thumbnail/feature_graphic4.jpg'
    return {
      title: formattedTitle,
      titleTemplate: null,
      meta: [
        { name: 'description', hid: 'description', content: description },
        { property: 'og:title', hid: 'og:title', content: formattedTitle },
        { property: 'og:site_name', hid: 'og:site_name', content: 'DWorkS' },
        { property: 'og:url', content: this.$getFullUrl(this.$route.path) },
        { property: 'og:image', content: this.$getFullUrl(backgroundImage) },
        { property: 'og:description', hid: 'og:description', content: description },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: formattedTitle },
        { name: 'twitter:site', content: '@1HaKr' },
        { name: 'twitter:image', content: this.$getFullUrl(backgroundImage) },
        { name: 'twitter:description', content: description }
      ]
    }
  },
  methods: {
    load() {
      this.loading = false
    }
  }
}
</script>

<style>
.main-link {
  border-bottom: 3px solid #FF9800;
  color: #FF9800 !important;
}

.main-link:hover {
  background-color:#FFC107!important;
  border-color:#FFC107!important;
  color: white !important;
}

.status-iframe {
  height: 600px !important;
}

.chart-iframe {
  height: 600px !important;
}

.chart-big-iframe {
  height: 800px !important;
}

@media only screen and (max-width: 960px) {
  .chart-iframe {
    height: 200px !important;
  }
  .chart-big-iframe {
    height: 40px !important;
  }
}

.widget-iframe {
  height: 450px !important;
  min-width: 350px !important;
}
</style>
