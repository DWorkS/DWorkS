<template>
  <v-container full-height mt-2 fluid grid-list-md>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="pa-3">
          <div class="v-list">
            <a class="v-list__tile v-list__tile--link">
              <div class="v-list__tile__avatar">
                <v-icon large color="primary">email</v-icon>
              </div>
              <h2 class="title"><b>Contact Us</b></h2>
            </a>
            <div class="pa-3">
              <h4 class="mt-2 body-3 text-xs-start">
                We’re happy to answer any questions you may have, just send us a
                message on mail.
              </h4>
              <h4 class="mt-2 body-1 text-xs-start">
                We can be reached at
                <b
                ><a
                  class="main-link"
                  href="mailto:support@dworks.io"
                  title="Support Email"
                >support@dworks.io</a
                >
                </b>
                Please preface your email subject line with any one of the
                following categories below, surrounded by brackets.
              </h4>
              <br>
              <b>Advertising/Sponsorship Inquiries</b>
              <h5 class="body-1 text-xs-start">
                Use this category if you wish to discuss financial partnerships
                including but not limited to the advertising and sponsorship
                space.
              </h5>

              <br>
              <b>Bug Reports</b>
              <h5 class="body-1 text-xs-start">
                Use this category if you want to report an error that you
                noticed in the functionality of this website.
              </h5>

              <br>
              <b>General</b>
              <h5 class="body-1 text-xs-start">
                Use this category for all other inquiries or if you just want to
                say hi.
              </h5>
            </div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      sheet: false
    }
  },
  asyncData({ store }) {
    store.commit('SET_CURRENT_TITLE', `Contact Us`)
  },
  head() {
    return {
      title: `Contact Us`,
      titleTemplate: '%s - DWorkS',
      meta: [
        {
          name: 'description',
          hid: 'description',
          content:
            'We’re happy to answer any questions you may have, just send us a message on mail or twitter'
        }
      ]
    }
  }
}
</script>
