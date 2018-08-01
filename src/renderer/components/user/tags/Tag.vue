<template>
  <v-flex sm6 xs10 md3 lg3>
    <v-card :style='{backgroundColor:tag.color, borderRadius: "30px"}' class="white--text">
      <v-card-title primary-title>
        <div class="headline">
          <div>
            <p class="text-xs-center">{{tag.name}} </p>
          </div>
        </div>

      </v-card-title>
      <v-card-actions>
        <router-link tag='button' :to="toInfo">
          <v-btn flat dark>info</v-btn>
        </router-link>
        <button tag='button' @click='editTag'>
          <v-btn flat dark>edit</v-btn>
        </button>
        <v-btn flat dark @click='ensure'>Delete</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" persistent>
      <v-card style='overflow:hidden;'>
        <v-card-title class="headline">Delete tag?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Cancel</v-btn>
          <v-btn color="red darken-1" @click='deleteTag' flat @click.native="dialog = false">Yes</v-btn>
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