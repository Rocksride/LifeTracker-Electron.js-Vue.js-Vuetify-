<template>
  <v-container>
      <v-layout>
          <v-flex xs12 sm6 offset-sm3> 
              <v-card>
                  <v-card-text>
                      <v-container>
                          <form @submit.prevent="onSignIn">
                              <v-layout row>
                                  <v-flex xs12>
                                      <v-text-field 
                                      name='email'
                                      label='Mail'
                                      id='email'
                                      v-model='email'
                                      type='email'
                                      required></v-text-field>
                                  </v-flex>
                              </v-layout>
                              <v-layout row>
                                  <v-flex xs12>
                                      <v-text-field 
                                      name='password'
                                      label='Password'
                                      id='password'
                                      v-model='password'
                                      type='password'
                                      required></v-text-field>
                                  </v-flex>
                              </v-layout>
                              <v-layout>
                                  <v-flex xs12>
                                      <v-btn color='error' type='submit' :disabled='isLoading' :loading='isLoading'>Sign in
                                                <span slot="loader" class="custom-loader">
                                                    <v-icon light>cached</v-icon>
                                                </span>
                                      </v-btn>
                                  </v-flex>
 
                              </v-layout>
                              <v-layout>

                                  <v-flex xs6>
                                      <v-btn  @click.native.stop='loadSignUpRoute'>Or register now</v-btn>
                                  </v-flex>
                              </v-layout>
                          </form>
                      </v-container>
                  </v-card-text>
              </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import * as types from "../store/types.js";
export default {
  props: ['isLoading'],
  data: () => ({
    email: "",
    password: "",
    confirmPassword: ""
  }),

  methods: {
    onSignIn() {
      // Vuex
      const authData = {
        email: this.email,
        password: this.password
      };
      console.log(authData);
      this.$store.dispatch(types.SIGN_IN, authData);
    },
    loadSignUpRoute() {
      console.log("going to sign UP");
      this.$store.dispatch(types.CLEAR_ERROR);
      this.$router.push("/auth/signUp");
    }
  },
  watch: {
      isLoading(value) {
          console.log('is loading = '+value);
      }
  }
};
</script>
