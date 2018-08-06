<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>Enter to the system</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click="signIn">Sign in</v-btn>
        <v-btn flat @click="signUp">Sign up</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!-- <transition name='global-router-view' mode='out-in'> -->
      <app-alert v-if='error' @dismissed='onDismissed' :text='error.message'>
      </app-alert>
    <!-- </transition> -->
    <router-view :isLoading='isLoading'></router-view>
  </div>
</template>
<script>
import * as types from "../store/types.js";
export default {
  methods: {
    signIn() {
      console.log("sign in");
      this.$router.push("/auth/signIn");
    },
    signUp() {
      console.log("sign up");
      this.$router.push("/auth/signUp");
    },
    onDismissed() {
      console.log("dismissed");
      this.$store.dispatch(types.CLEAR_ERROR);
    }
  },
  computed: {
    error() {
      return this.$store.getters[types.ERROR];
    },
    isLoading() {
      return this.$store.getters[types.LOADING_STATE];
    }
  }
};
</script>


<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>