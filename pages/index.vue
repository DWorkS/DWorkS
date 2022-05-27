<template>
  <v-container pa-2 fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 md4>
        <div class="ma-5 pt-5 text-center">
          <v-avatar size="125px" color="transparent" class="mb-12">
            <v-img src="logo.png" alt="DWorkS logo" />
          </v-avatar>
          <div class="display-1 font-weight-medium">
            DWorkS
          </div>
          <h1 class="subtitle-1  text-center pt-1 pb-3">
            Build microstartups and open source projects to make a small
            difference
          </h1>
          <v-layout mt-5 justify-center row wrap>
            <v-btn
              v-for="item in $store.state.contactItems" :key="item.title" pa-0 :title="item.title"
              :target="item.to.startsWith('https') ? `_blank` : ``" rounded text :href="item.to">
              <v-icon class="mr-2">
                {{ item.icon }}
              </v-icon>
              {{ item.title }}
            </v-btn>
          </v-layout>
          <v-layout row wrap align-center justify-center mt-8>
            <v-flex shrink>
              <v-btn color="pink" :loading="progress" large @click="openDev()">
                Book 1-1 consultation
              </v-btn>
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
      <v-flex xs12 md8>
        <div class="scrollable">
          <v-container fluid grid-list-md>
            <div class="padequaldiv">
              <h2 class="ml-1 pt-3 pb-3 headline font-weight-light">
                Microstartups
              </h2>
              <v-layout pb-3 row wrap>
                <v-flex v-for="project in $store.state.projects" :key="project.title" x12 sm6 md6>
                  <v-card class="ma-1" hover>
                    <v-img :src="project.imgUrl" aspect-ratio="2" class="grey lighten-1" />
                    <v-card-title primary-title class="halfway">
                      <h2 class="headline">
                        {{ project.title }}
                      </h2>
                      <v-btn
                        absolute fab top right color="teritiary" :title="project.tag" target="_blank"
                        :href="project.url">
                        <v-icon>mdi-open-in-new</v-icon>
                      </v-btn>
                    </v-card-title>
                    <v-card-text class="pt-0">
                      {{ project.content }}
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
              <h2 class="ml-1 pb-3 headline font-weight-light">
                Opensource
              </h2>
              <v-layout pb-2 row wrap>
                <v-flex v-for="project in $store.state.opensource" :key="project.title" x12 sm6 md6>
                  <v-card class="ma-1" hover>
                    <v-img :src="project.imgUrl" aspect-ratio="2" class="grey lighten-4" />
                    <v-card-title primary-title class="halfway">
                      <h2 class="headline">
                        {{ project.title }}
                      </h2>
                      <v-btn
                        absolute dark fab top right color="accent" :title="project.tag" target="_blank"
                        :href="project.url">
                        <v-icon>mdi-open-in-new</v-icon>
                      </v-btn>
                    </v-card-title>
                    <v-card-text class="pt-0">
                      {{ project.content }}
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </div>
          </v-container>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: 'home',
  data: () => ({
    success: 'success',
    message: '',
    progress: false
  }),
  mounted() {
    const query = this.$route.query
    if (!this.isEmpty(query) && query.result) {
      if (query.result === this.success) {
        this.message = 'You will get details through a mail'
      } else {
        this.message = 'Your booking failed'
      }
    }
  },
  methods: {
    isEmpty (obj) {
      return !obj || Object.keys(obj).length === 0
    },
    openDev() {
      window.open('https://1hakr.com/?referrer=dworks', '_blank').focus()
    }
  }
}

</script>
