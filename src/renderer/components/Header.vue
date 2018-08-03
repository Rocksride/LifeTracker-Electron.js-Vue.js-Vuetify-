<template>
  <div>
    <v-toolbar>
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon large>menu</v-icon>
      </v-btn>
      <!-- <img @click.stop="drawer = !drawer" style='border-radius: 70px;  width: 50px;height: 50px' src='../../images/Logo.png' alt=""> -->
      <v-spacer></v-spacer>
      <!-- <v-toolbar-items class="hidden-sm-and-down">
         <v-btn icon>
        <v-icon large>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon large>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon large>mdi-refresh</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon large>mdi-dots-vertical</v-icon>
      </v-btn>
      </v-toolbar-items> -->
    </v-toolbar>
    <v-layout wrap>
  
  
      <v-navigation-drawer temporary v-model="drawer" :mini-variant="mini" dark absolute clipped>
        <v-list class="pa-1">
          <v-list-tile v-if="mini" @click.stop="mini = !mini">
            <v-list-tile-action>
              <v-icon>mdi-lock-open-outline</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img src="../../images/cat.jpg" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ getEmail }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.stop="mini = !mini">
                <v-icon large>mdi-lock</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
  
        <v-list class="pt-2" dense>
          <v-divider light></v-divider>
          <v-subheader>Main</v-subheader>
  
          <v-list-tile v-for="item in projectMenuItems" :key="item.title" @click="item.handler">
            <v-list-tile-action>
              <v-icon large>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider light></v-divider>
          <v-subheader>Configuration</v-subheader>
          <v-list-tile v-for="item in configMenuItems" :key="item.title" @click="item.handler">
            <v-list-tile-action>
              <v-icon large>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider light></v-divider>
          <v-subheader>Information</v-subheader>
          <v-list-tile v-for="item in bottomMenuItems" :key="item.title" @click="item.handler">
            <v-list-tile-action>
              <v-icon large>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
  
        </v-list>
      </v-navigation-drawer>
      <v-dialog v-model="dialog" persistent>
        <v-card style='overflow:hidden;'>
          <v-card-title class="headline">Exit?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialog = false">Cancel</v-btn>
            <v-btn color="red darken-1" @click='logOut' flat @click.native="dialog = false">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
  import * as types from "../store/types.js";
  export default {
    data() {
      return {
        drawer: false,
        dialog: false,
        projectMenuItems: [{
            title: "Timer",
            icon: "mdi-home",
            handler: () => {
              this.$router.push("/home");
            }
          },
          {
            title: "DatePicker",
            icon: "mdi-calendar-clock",
            handler: () => {
              this.$router.push("/home/datepicker");
            }
          },
          {
            title: "Projects",
            icon: "mdi-folder-multiple",
            handler: () => {
              this.$router.push("/home/projects");
            }
          },
          {
            title: "Tasks",
            icon: "mdi-format-list-bulleted",
            handler: () => {
              this.$router.push("/home/tasks");
            }
          },
          {
            title: "Tags",
            icon: "mdi-tag-multiple",
            handler: () => {
              this.$router.push("/home/tags");
            }
          }
        ],
        configMenuItems: [{
            title: "Settings",
            icon: "mdi-settings",
            handler: () => {
              this.$router.push("/home/settings");
            }
          },
          {
            title: "Account",
            icon: "mdi-account",
            handler: () => {
              this.$router.push("/home/account");
            }
          },
          {
            title: "Exit",
            icon: "mdi-logout",
            handler: this.ensure
          }
        ],
        bottomMenuItems: [{
            title: "Help",
            icon: "mdi-help",
            handler: () => {
              this.$router.push("/home/help");
            }
          },
          {
            title: "Get more information",
            icon: "mdi-information-outline",
            handler: () => {
              this.$router.push("/home/info");
            }
          }
        ],
        mini: false,
        right: null
      };
    },
    methods: {
      logOut() {
        this.$router.push("/auth/signIn");
        this.signOut();
      },
      ensure() {
        this.dialog = true;
      },
      signOut() {
        this.$store.dispatch(types.SIGN_OUT);
      }
    },
    computed: {
      getEmail() {
        return this.$store.getters[types.USER].email;
      },
      getTasks() {
        return this.$store.getters[types.TASKS];
      }
    }
  };
</script>

<style>
  
</style>
