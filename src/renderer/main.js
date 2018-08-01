import Vue from "vue";

import App from "./App";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";
import * as firebase from "firebase";
import vmodal from "vue-js-modal";
import AlertCmp from "./components/shared/Alert.vue";

Vue.filter("time", value => {
  return value + " time";
});

Vue.component("app-alert", AlertCmp);

Vue.use(Vuetify);
Vue.use(vmodal);

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: "<App/>",
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyAb5zE5zA2IiTBzWZxbJUJhBEm_dYvuJSQ",
      authDomain: "lifetracer-electorn.firebaseapp.com",
      databaseURL: "https://lifetracer-electorn.firebaseio.com",
      projectId: "lifetracer-electorn",
      storageBucket: "lifetracer-electorn.appspot.com"
    });
  }
}).$mount("#app");

import("../../node_modules/vuetify/dist/vuetify.min.css");
import("../../node_modules/material-icons/css/material-icons.min.css");
import("../../node_modules/mdi/css/materialdesignicons.min.css");
