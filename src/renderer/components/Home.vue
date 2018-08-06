<template>
  <div>
    <app-header></app-header>
    <app-alert v-if='error' @dismissed='onDismissed' :text='error.message'>

    </app-alert>
    <transition name='global-router-view' mode='out-in'>
      <router-view></router-view>
    </transition>
    <app-footer></app-footer>
  </div>
</template>

<script>
import * as types from "../store/types.js";
import Footer from "./Footer.vue";
import Header from "./Header.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "life-tracker-project",
  data() {
    return {
      drawer: true
    };
  },
  components: {
    appHeader: Header,
    appFooter: Footer
  },
  methods: {
      onDismissed() {
      this.$store.dispatch(types.CLEAR_ERROR);
    }
  },
  computed: {
    error() {
      return this.$store.getters[types.ERROR];
    },
  },
  watch: {
    error(v){
      setTimeout(() => {
        this.$store.dispatch(types.CLEAR_ERROR);
      }, 3000);
    }
  }
};
</script>

<style>
/* CSS */
</style>
