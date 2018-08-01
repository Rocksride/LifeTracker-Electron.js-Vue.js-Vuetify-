<template>
  <modal :name='modalName' @before-open='beforeOpen' height='auto' width='300'>
    <div>
      <v-card>
        <v-card-text>
          <v-form v-model="valid">
            <v-text-field label="Tag name" v-model="name" :rules="nameRules" :counter="maxCharsInTagName" required></v-text-field>
            ChoseColor
            <input style='width:100%' type="color" v-model='color'>
            <v-flex xs3>
              <v-btn @click.stop='clickHandler' color='info' type='submit'>{{buttonTxt}}
              </v-btn>
            </v-flex>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </modal>
</template>

<script>
import * as modalNames from "../../modals/names.js";
import * as types from "../../../store/types.js";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      modalName: modalNames.NEW_TAG,
      color: "#00dd48",
      buttonTxt: '',
      maxCharsInTagName: 25,
      valid: false,
      id: null,
      clickHandler: "",
      name: "",
      nameRules: [
        v => !!v || "Tag name is required",
        v =>
          v.length <= this.maxCharsInTagName ||
          `Tag name must be less than ${this.maxCharsInTagName} characters`
      ]
    };
  },
  methods: {
    ...mapActions({
      addTagToStore: types.ADD_TAG
    }),
    reinit() {
      this.name = "";
      this.color = "#00dd48";
      this.id = null;
      this.buttonTxt = 'Add'
      this.clickHandler = this.addTag;
    },
    beforeOpen(e) {
      this.reinit();
      console.log(e.params);
      if (e.params.tagName) {
        this.name = e.params.tagName;
      } else if (e.params.id || e.params.id === 0) {
        this.id = e.params.id;
        const tag = this.$store.getters[types.TAGS].find(
          tag => tag.index === e.params.id
        );
        console.log(tag);
        this.color = tag.color;
        this.name = tag.name;
        this.clickHandler = this.alterTag;
        this.buttonTxt = 'Save changes'
      }
    },
    alterTag() {
      if (this.name === "") {
        this.$store.dispatch(types.SET_ERROR, {
          message: `tag should have a name`
        });
      } else {
        const tag = {
          color: this.color,
          name: this.name,
          index: Number(this.id)
        };
        console.log(tag);
        this.$store.dispatch(types.ALTER_TAG, tag);
        // this.$router.push("/home/tags");
      }
      this.$modal.hide(modalNames.NEW_TAG);
    },
    addTag() {
      if (this.name === "") {
        this.$store.dispatch(types.SET_ERROR, {
          message: `tag should have a name`
        });
      } else {
        const tag = {
          color: this.color,
          name: this.name
        };
        const isExist = this.$store.getters[types.TAGS_CHECK_NAME_EXIST](
          tag.name
        );

        if (isExist) {
          this.$store.dispatch(types.SET_ERROR, {
            message: `tag with this name is already exist`
          });
        } else {
          this.addTagToStore(tag);
          this.$modal.hide(this.modalName);

          // this.$router.push("/home/tags");
        }
      }
    }
  }
};
</script>

<style scoped>

</style>