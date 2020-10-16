<template>
  <v-container light full-height class="view" mt-2 fluid grid-list-md>
    <v-layout d-flex row wrap justify-center>
      <v-flex>
        <div class="ml-2">
          <b> ALauncher Bridge </b>
        </div>

        <div id="content">
          <div>
            <v-card rounded class="my-2">
              <div class="pa-8">
                <p>
                  To see the <b>Google Now Feed</b> on the left, and make full use
                  of <b>At A Glance</b>, installing the <b>Companion Bridge</b> is
                  necessary. This is due to restrictions set by Google.
                </p>
                <p class="line24">
                  <b>Installation instructions</b><br>
                  1. Go to this
                  <a class="blue--text"
                     href="https://raw.githubusercontent.com/1hakr/ALauncher/master/companion-bridge-debug.apk">LINK</a><br>
                  2. Under assets, click on "companion-bridge-debug.apk"<br>
                  3. Let your phone download the file<br>
                  4. Install the file as an application<br>
                  5. Go into the settings of the launcher<br>
                  6. ALauncher - Enable the "Display Google app" option<br><br>
                  <i>Optional</i><br>
                  7. Go into your phone's security settings<br>
                  8. Disable "installation from unknown sources" if you enabled it
                  for the installation<br>
                </p>
              </div>
            </v-card>
            <v-card rounded class="my-2">
              <div class="pa-8">
                <div class="text">
                  <b>Why do I need this?</b>
                </div>
                <p class="line24">
                  The technical details for why this additional app is necessary
                  are interesting. The Google App creates and shows the Google Now
                  Feed used by launchers. Launchers can request the feed to show
                  up and then the Google App acknowledges this request.
                  Unfortunately, it only does this for <b>system apps</b> and
                  <b>debug apps</b>. System apps require root to install, and
                  debug apps are not allowed to be published on the Play Store.
                  Therefore sideloading is the only solution. Previously my
                  launcher took care of this on its own, but this got it banned
                  from the Play Store by Google. Everything has been moved to this
                  website since then, to prevent another suspension.
                </p>
              </div>
            </v-card>
            <v-card rounded class="my-2">
              <div class="pa-8">
                <div class="text">
                  <b>Help, I am getting an error!</b>
                </div>
                <p class="line24">
                  Some people, like Pixel and Nokia users, might not be able to
                  install this. They will get an <b>"App not installed"</b> error.
                  This happens because these people have the real Pixel Launcher
                  installed as a system app. The Pixel Launcher conflicts with my
                  Companion Bridge, and cannot be installed at the same time. Make
                  sure all third party Pixel Launchers are removed from your
                  device before trying to install the Companion Bridge.
                </p>
              </div>
            </v-card>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'ALauncher',
  asyncData({
    store
  }) {
    store.commit('SET_CURRENT_TITLE', 'ALauncher Bridge')
  },
  data() {
    return {
      sheet: false
    }
  },
  head() {
    return {
      title: 'ALauncher Bridge',
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
