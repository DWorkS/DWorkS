<template>
  <v-footer dark :color="plain ? 'transparent' : 'secondary'" height="auto" class="pa-8 mt-8">
    <v-layout ma-2 column>
      <v-layout justify-center row wrap>
        <v-btn
          v-for="item in $store.state.footerItems" :key="item.title" color="white" pa-0 :title="item.title"
          :target="item.to.startsWith('https') ? `_blank` : ``" text small rounded :href="item.to">
          {{ item.title }}
        </v-btn>
      </v-layout>
      <v-layout row justify-center wrap>
        <v-btn v-if="false" text target="_blank" title="dworks" href="https://dworks.io/">
          <img src="/dworks_app.svg" alt="dworks logo">
        </v-btn>
        <strong v-show="false" wrap justify-center class="subheading text-center">Dev Mentors just for you!</strong>
        <v-card-actions class="hidden-xs-only mx-5 justify-center">
          <div>
            &copy; {{ new Date().getFullYear() }} -
            <strong>{{ $store.state.appName }}</strong>
          </div>
        </v-card-actions>
        <v-btn
          v-for="icon in $store.state.footerSocialItems" :key="icon.title" icon dark :href="icon.url"
          :title="icon.title" target="_blank" class="mx-0">
          <v-avatar size="25px" tile>
            <img :src="`/${icon.img}`" :alt="icon.title">
          </v-avatar>
        </v-btn>
      </v-layout>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  props: ['plain']
}
</script>
