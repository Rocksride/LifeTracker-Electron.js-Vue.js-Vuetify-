<template>
    <v-container text-xs-center>
        <v-layout>
           
            <v-flex xs10 lg10 >
                <v-form v-model="valid">
                    <v-text-field
                    label="Project name"
                    v-model="name"
                    :rules="nameRules"
                    :counter="lengthLimitations.maxCharsInName"
                    required
                    ></v-text-field>
                    <v-text-field
                    label="description"
                    v-model="description"
                    :rules="descriptionRules"
                    :counter="lengthLimitations.maxCharsInDescription"
                    ></v-text-field>
                    <v-flex xs12 lg 12>
                        <input type="color" v-model='color'>
                    </v-flex>
                    <v-flex xs3>
                        <v-btn @click.stop='alterProject' color='info' type='submit'>Save changes
                        </v-btn>
                    </v-flex>                    
                </v-form>        
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import * as types from "../../../store/types.js";
import { mapActions } from "vuex";
export default {
  props: ['id'],
  data() {
    return {
      color: "#00dd48",
      lengthLimitations: {
        maxCharsInName: 25,
        maxCharsInDescription: 50
      },

      valid: false,
      name: "",
      time:0,
      description: "",
      nameRules: [
        v => !!v || "name is required",
        v =>
          v.length <= this.lengthLimitations.maxCharsInName ||
          `name must be less than ${this.lengthLimitations.maxCharsInTagName} characters`
      ],
      descriptionRules: [
        v =>
          v.length <= this.lengthLimitations.maxCharsInDescription ||
          `name must be less than ${this.lengthLimitations.maxCharsInDescription} characters`
      ],
    };
  },
  methods: {

    alterProject() {
      const altered = {
        color: this.color,
        description: this.description,
        name: this.name,
        time: this.time,
        index: Number(this.id)
      };
      console.log(altered);
        this.$store.dispatch(types.ALTER_PROJECT, altered);
        this.$router.push("/home/projects");
    }
  },
  created() {
      const id = Number(this.id);
      const project = this.$store.getters[types.PROJECTS].find(project => project.index === id);
      this.color = project.color;
      this.name = project.name;
      this.description = project.description;
      this.time = project.time;

  }
};
</script>

<style scoped>

</style>