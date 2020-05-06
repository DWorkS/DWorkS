<template>
  <v-container pa-2 fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 md4>
        <div class="ma-5 pt-5 text-center">
          <v-avatar size="125px" color="transparent">
            <v-img src="logo.png" alt="DWorkS logo" />
          </v-avatar>
          <div class="white--text display-1 font-weight-medium">
            DWorkS
          </div>
          <h1 class="subtitle-1  text-center white--text pt-1 pb-3">
            Build microstartups and open source projects to make a small
            difference
          </h1>
          <v-layout mt-5 justify-center row wrap>
            <v-btn v-for="item in this.$store.state.contactItems" :key="item.title" color="white" pa-0 :title="item.title"
                   :target="item.to.startsWith('https') ? `_blank` : ``" rounded text :href="item.to">
              <v-icon class="mr-2">
                {{ item.icon }}
              </v-icon>
              {{ item.title }}
            </v-btn>
          </v-layout>
        </div>
      </v-flex>
      <v-flex xs12 md8>
        <div class="scrollable">
          <v-container fluid grid-list-md>
            <div class="padequaldiv">
              <h2 class="ml-1 pt-3 pb-3 white--text headline font-weight-light">
                Microstartups
              </h2>
              <v-layout pb-3 row wrap>
                <v-flex v-for="project in this.$store.state.projects" :key="project.title" x12 sm6 md6>
                  <v-card class="ma-1" hover>
                    <v-img :src="project.imgUrl" aspect-ratio="2" class="grey lighten-1" />
                    <v-card-title primary-title class="halfway">
                      <h2 class="headline">
                        {{ project.title }}
                      </h2>
                      <v-btn absolute fab top right color="secondary" :title="project.tag" target="_blank"
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
              <h2 class="ml-1 pb-3 white--text headline font-weight-light">
                Opensource
              </h2>
              <v-layout pb-2 row wrap>
                <v-flex v-for="project in this.$store.state.opensource" :key="project.title" x12 sm6 md6>
                  <v-card class="ma-1" hover>
                    <v-img :src="project.imgUrl" aspect-ratio="2" class="grey lighten-4" />
                    <v-card-title primary-title class="halfway">
                      <h2 class="headline">
                        {{ project.title }}
                      </h2>
                      <v-btn absolute dark fab top right color="secondary" :title="project.tag" target="_blank"
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
  layout: 'home'
}

</script>
