<template>
  <v-container>
      <v-layout>
          <v-flex xs12 sm6 offset-sm3> 
              <v-card>
                  <v-card-text>
                      <v-container>
                          <form @submit.prevent="onSignUp">
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
                              <v-layout row>
                                  <v-flex xs12>
                                      <v-text-field 
                                      name='confirmPassword'
                                      label='Confirm Password'
                                      id='confirmPassword'
                                      v-model='confirmPassword'
                                      type='password'
                                      :rules='[comparePasswords]'
                                      ></v-text-field>
                                  </v-flex>
                              </v-layout>
                              <v-layout>
                                  <v-flex xs12>
                                 <v-btn color='error' type='submit' :disabled='isLoading' :loading='isLoading'>Sign up
                                                <span slot="loader" class="custom-loader">
                                                    <v-icon light>cached</v-icon>
                                                </span>
                                      </v-btn>
                                  </v-flex>
 
                              </v-layout>
                              <v-layout>

                                  <v-flex xs6>
                                      <v-btn @click='loadSignInRoute'>Already have account?</v-btn>
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
    onSignUp() {
      // Vuex
      const authData = {
        email: this.email,
        password: this.password
      };
      console.log(authData);
      this.$store.dispatch(types.SIGN_UP, authData);
    },
    loadSignInRoute() {
      console.log("going to sign IN");
      this.$store.dispatch(types.CLEAR_ERROR);
      this.$router.push("/auth/signIn");
    }
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "passwords do not match!"
        : "";
    }
  }
};
</script>
