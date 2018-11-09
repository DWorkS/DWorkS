<template>
  <a class="my-2 v-list__tile v-list__tile--link" @click="openLinks(id)" :title="title" target="_blank">
    <div v-if="image" class="v-list__tile__avatar">
      <v-avatar size="35">
        <img :src="image">
      </v-avatar>
    </div>
    <div v-else class="v-list__tile__avatar">
      <v-icon>{{icon}}</v-icon>
    </div>
    <v-list-tile-title>{{title}}</v-list-tile-title>
  </a>
</template>

<script>
export default {
  name: 'ListItem',
  props: ['icon', 'image', 'title', 'id'],
  methods: {
    openLinks (id) {
      switch (id) {
        case 'Email' :
          const email = 'support@dworks.io'
          const subject = 'DWorkS Feedback'
          document.location = 'mailto:' + email + '?subject=' + subject
          break
        case 'Dworks' :
          window.open('https://dworks.io/', '_blank').focus()
          break
        case 'Facebook' :
          window.open('https://www.facebook.com/1DWorkS', '_blank').focus()
          break
        case 'Twitter' :
          window.open('https://twitter.com/1hakr', '_blank').focus()
          break
        case 'Google+' :
          window.open('https://plus.google.com/+HariKrishnaDulipudi', '_blank').focus()
          break
      }
    }
  }
}
</script>