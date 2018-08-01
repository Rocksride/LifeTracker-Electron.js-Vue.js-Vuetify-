<template>
    <v-container text-xs-center>
        <v-layout>
           
            <v-flex xs6 lg6 lg6 offset-sm3>
                <v-card>
                    <v-card-text>
                <v-form v-model="valid">
                    <v-text-field
                    label="Tag name"
                    v-model="name"
                    :rules="nameRules"
                    :counter="maxCharsInTagName"
                    required
                    ></v-text-field>
                        ChoseColor
                        <input style='width:100%' type="color" v-model='color'>
                    <v-flex xs3>
                        <v-btn @click.stop='alterTag' color='info' type='submit'>Save changes
                        </v-btn>
                    </v-flex>                    
                </v-form>    
                </v-card-text>
                </v-card>    
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import * as types from "../../../store/types.js";
import { mapActions } from "vuex";
export default {
  props: ["id"],
  data() {
    return {
      color: "#00dd48",
      maxCharsInTagName: 25,
      valid: false,
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
    }
  },
  created() {
    if (this.id) {

      const id = Number(this.id);
      const tag = this.$store.getters[types.TAGS].find(tag => tag.index === id);
      console.log(tag);
      this.color = tag.color;
      this.name = tag.name;
    }
  }
};
</script>

<style scoped>

</style>