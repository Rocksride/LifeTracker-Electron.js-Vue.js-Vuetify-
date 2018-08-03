<template>
    <v-app dark>
      <transition-group tag='p' name='global-router-view' mode='out-in'>
        <router-view key='router'></router-view>
        <app-modals key='modals'></app-modals>
        </transition-group>
    </v-app>
</template>

<script>
import * as types from "./store/types.js";
import Modals from './components/modals/Modals.vue'
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
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
    appFooter: Footer,
    appModals: Modals
  },
  computed: {
    isUserSignedIn() {
      return this.$store.getters[types.IS_USER_SIGNED_IN];
    }
  },
  watch: {
    isUserSignedIn(bool) {
      if (bool) {
        this.$router.push("/home");
      }
      else {
        console.log('not auth forced to auth')
        this.$router.push('/auth');
      }
    }
  },
  methods: {
    ...mapGetters
  }
};
</script>

<style >
html {overflow-y: auto}
@keyframes slide-in {
  from{
    opacity: 0;
    /* transform: translateY(-10px); */
    transform: scale(1.2);
  }
  to {
    opacity: 1;
    transform: scale(1);
    /* transform: translateY(0px); */
    
  }
}
@keyframes slide-out {
  to{
    opacity: 0;
    /* transform: translateY(-10px); */
    transform: scale(1.2);
  }
  from {
    opacity: 1;
    /* transform: translateY(0); */
    transform: scale(1);
  }
}
.global-router-view-enter-active{
  animation: slide-in .1s ease forwards;
}
.global-router-view-leave-active{
  animation: slide-out .1s ease forwards;
}
.v--modal-overlay {
  background: transparent;
}

</style>
