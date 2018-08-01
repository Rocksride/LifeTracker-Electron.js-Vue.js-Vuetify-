<template>
  <modal height='auto' :name='modalName' @before-open='beforeOpen'>
<div>
<v-card>
        <v-form v-model="valid">
          <v-text-field label="Project name" v-model="name" :rules="nameRules" :counter="lengthLimitations.maxCharsInName" required></v-text-field>
          <v-text-field label="description" v-model="description" :rules="descriptionRules" :counter="lengthLimitations.maxCharsInDescription"></v-text-field>
          <v-flex xs12 lg 12>
            <input type="color" v-model='color'>
          </v-flex>
          <v-flex xs3>
            <v-btn @click.stop='clickHandler' color='info' type='submit'>{{ buttonTxt}}
            </v-btn>
          </v-flex>
        </v-form>
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
      modalName: modalNames.NEW_PROJECT,
      color: "#00dd48",
      lengthLimitations: {
        maxCharsInName: 25,
        maxCharsInDescription: 50
      },
      id: null,
      clickHandler: '',
      buttonTxt: '',
      valid: false,
      name: "",
      description: "",
      nameRules: [
        v => !!v || "name is required",
        v =>
          v.length <= this.lengthLimitations.maxCharsInName ||
          `name must be less than ${this.lengthLimitations
            .maxCharsInTagName} characters`
      ],
      descriptionRules: [
        v =>
          v.length <= this.lengthLimitations.maxCharsInDescription ||
          `name must be less than ${this.lengthLimitations
            .maxCharsInDescription} characters`
      ]
    };
  },
  methods: {
    
    ...mapActions({
      addProjectToStore: types.ADD_PROJECT
    }),
    reinit() {
      this.name = '',
      this.color = '#111111';
      this.description = '';
      this.id = null;
      this.buttonTxt = 'Add project'
      this.clickHandler = this.addProject;
    },
    beforeOpen(e) {
      this.reinit();
      if (e.params.id || e.params.id === 0) {
        console.log('id provided');
        const id = Number(e.params.id);
        const project = this.$store.getters[types.PROJECTS].find( project => project.index === id );
        this.id = id;
        this.color = project.color;
        this.name = project.name;
        this.description = project.description;
        this.clickHandler = this.alterProject;
        this.buttonTxt = 'Save changes'
        this.time = project.time;
      }
    },
    alterProject() {
      const altered = {
        color: this.color,
        description: this.description,
        name: this.name,
        time: this.time,
        index: Number(this.id)
      };
      console.log('altered');
      console.log(altered);
      this.$store.dispatch(types.ALTER_PROJECT, altered);
      this.$modal.hide(this.modalName);
      // this.$router.push("/home/projects");
    },
    addProject() {
      const newProject = {
        color: this.color,
        description: this.description,
        name: this.name
      };
      console.log(newProject);
      const isExist = this.$store.getters[types.PROJECTS_CHECK_NAME_EXIST](
        newProject.name
      );
      if (isExist) {
        this.$store.dispatch(types.SET_ERROR, {
          message: `project with this name is already exist`
        });
      } else {
        this.addProjectToStore(newProject);
        this.$modal.hide(this.modalName);
        // this.$router.push("/home/projects");
      }
    }
  }
};
</script>

<style scoped>

</style>