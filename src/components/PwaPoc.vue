<template>
  <v-card class="mx-auto">
      <v-row dense>
        <v-col cols="12">
          <v-card
            color="#385F73"
            theme="dark"
          >
            <v-card-title class="text-h5">
              Get User Location
            </v-card-title>

            <v-card-subtitle v-if="errorStr">
              Sorry, but the following error occurred: {{errorStr}}
            </v-card-subtitle>
            <v-card-subtitle v-if="gettingLocation">
              Getting your location...
            </v-card-subtitle>
            <v-card-subtitle v-if="location">
              Your location data is {{ location.coords.latitude }}, {{ location.coords.longitude}}
            </v-card-subtitle>

            <v-card-actions>
              <v-btn
                class="ml-2"
                variant="outlined"
                size="small"
                @click="locateMe">
                Locate Me
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card
            color="#1F7087"
            theme="dark"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="text-h5">
                  Camera
                </v-card-title>

                <v-card-subtitle>PWA Camera</v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    class="ml-2"
                    variant="outlined"
                    size="small"
                    @click="takePicture"
                  >
                    Take Picture
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar
                class="ma-3"
                size="125"
                rounded="0"
              >
                <v-img :src="imgSrc"></v-img>
              </v-avatar>
              <p v-if="cameraErr != ''">Some error occurred - {{ cameraErr }} </p>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card
            color="#1F7087"
            theme="dark"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="text-h5">
                  Open Native Settings
                </v-card-title>
                <v-card-actions>
                  <v-btn
                    class="ml-2"
                    variant="outlined"
                    size="small"
                    @click="openSettings"
                  >
                    Open Settings
                  </v-btn>
                </v-card-actions>
              </div>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card
            color="#1F7087"
            theme="dark"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="text-h5">
                  Device Information
                </v-card-title>

                <v-card-subtitle>
                </v-card-subtitle>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
  </v-card>
</template>

<script>

export default {
  name: 'PwaPoc',
  props: {
    msg: String
  },
  data() {
    return {
      location: null,
      gettingLocation: false,
      errorStr: null,
      imgSrc: '',
      cameraErr: ''
    }
  },
  methods: {
    locateMe() {
      // eslint-disable-next-line
      console.log(device, '====device===');
      //do we support geolocation
      if(!("geolocation" in navigator)) {
        this.errorStr = 'Geolocation is not available.';
        return;
      }

      this.gettingLocation = true;
      // get position
      navigator.geolocation.getCurrentPosition(pos => {
        this.gettingLocation = false;
        this.location = pos;
      }, err => {
        this.gettingLocation = false;
        this.errorStr = err.message;
      })
    },
    takePicture(){
      console.log('takePicture');
      if (navigator.camera) {
          navigator.camera.getPicture(this.setPicture, this.onFail, {
              correctOrientation: true,
              // destinationType: Camera.DestinationType.FILE_URI
          });
      }
    },
    setPicture(imagePath) {
      this.imgSrc = imagePath;
    },
    onFail(message) {
      this.cameraErr = message;
    },
    openSettings() {
      if (window.cordova && window.cordova.plugins.settings) {
          console.log('openNativeSettingsTest is active');
          window.cordova.plugins.settings.open("wifi", function() {
                  console.log('opened settings');
              },
              function () {
                  console.log('failed to open settings');
              }
          );
      } else {
          console.log('openNativeSettingsTest is not active!');
      }
    }
  }
}
</script>
<style scoped></style>
