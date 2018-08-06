<template>
  <v-flex sm6 xs10 md3 lg3>
    <v-card :style='{backgroundColor:tag.color, borderRadius: "30px"}' class="white--text">
      <v-card-title primary-title>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs9>
                  <p :style='{textTransform: "uppercase"}' class="headline text-xs-center">{{tag.name}} </p>
            </v-flex>
            <v-flex xs3 md3 lg3 sm3>
                    <v-icon style='cursor:pointer' @click='editTag'    >edit</v-icon>
            </v-flex >
          </v-layout>
        </v-container>
      </v-card-title>
      
      <v-card-actions>
              <router-link tag='span' :to="toInfo">
                <v-btn  round  color='success' >
                    Details
                </v-btn>
              </router-link>
              <v-btn  round color='error'  @click='ensure'>Delete</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" persistent>
      <v-card style='overflow:hidden;'>
        <v-card-title class="headline">Delete tag?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn round color="blue darken-1" flat @click.native="dialog = false">Cancel</v-btn>
          <v-btn round color="red darken-1" @click='deleteTag' flat @click.native="dialog = false">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
import * as modalNames from '../../modals/names.js'
import * as types from '../../../store/types.js'
export default {
  props: {
    tag: Object
  },
  data: () => ({
    dialog: false
  }),
  methods: {
    ensure() {
      this.dialog = true;
    },
    deleteTag() {
      this.$store.dispatch(types.DELETE_TAG, this.tag);
    },
    editTag() {
      console.log('asdasda')
      this.$modal.show(modalNames.NEW_TAG, {id: this.tag.index})
    }
  },
  computed: {
    toInfo(){ return `/home/tags/${this.tag.index}` },
    toDelete(){return `/home/${this.tag.index}/delete`},
    toEdit(){return `/home/tags/${this.tag.index}/edit`},
  },
  beforeRouteLeave(to, from, next) {
    console.log(to);
    next();
  }
};
</script>

<style scoped>

</style>