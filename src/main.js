import { createApp } from 'vue';
import App from "./App.vue";
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/dist/vuetify.min.css';

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(vuetify).mount('#app');


function onDeviceReady() {
    console.log(navigator.camera);
    // console.log(device);
}
document.addEventListener("deviceready", onDeviceReady, false);
