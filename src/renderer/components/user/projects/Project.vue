<template>
  <v-flex xs4>
    <v-card :style='{backgroundColor:project.color}' class="white--text">
      <v-card-title primary-title>
        <div class="headline">
          <h3>{{ project.name }}</h3>
        </div>
        <v-card-text>
          <h6>{{ project.description }} {{toDetailed()}}</h6>
          <h6>{{ totalTime | time }}</h6>
        </v-card-text>
      </v-card-title>
      <v-divider dark></v-divider>
      <v-card-actions>
        <v-btn flat dark :to='toDetailed()'>
          <v-icon>details</v-icon>Open</v-btn>
        <button @click='editProject'><v-btn flat dark>
          <v-icon>edit</v-icon>Edit</v-btn>
        </button>
        <v-btn flat dark @click='deletePrompt'>
          <v-icon>delete_forever</v-icon>Delete</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="ensureDialog" persistent>
      <v-card style='overflow:hidden;'>
        <v-card-title class="headline">Delete all related tasks?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="ensureDialog = false">Cancel</v-btn>
          <v-btn color="green darken-1" @click='deleteProjectWithoutTasks' flat @click.native="ensureDialog = false">No</v-btn>
          <v-btn color="green darken-1" @click='deleteProjectWithTasks' flat @click.native="ensureDialog = false">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" persistent>
      <v-card style='overflow:hidden;'>
        <v-card-title class="headline">Delete project?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialog = false">Cancel</v-btn>
          <v-btn color="green darken-1" @click='dialog = false; ensureDialog = true' flat >Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
import * as modalNames from '../../modals/names.js';
import * as types from "../../../store/types.js";
import ProjectStatistics from "./ProjectStatistics.vue";
import ProjectTasks from "./ProjectTasks.vue";
export default {
  props: ["project"],

  data: () => ({
    dialog: false,
    ensureDialog: false,
  }),
  methods: {
    toDetailed() {
      return `/home/projects/${this.project.index}`
    },
    deletePrompt() {
      this.dialog = true;
    },
    deleteProjectWithTasks() {
      this.$store.dispatch(types.DELETE_PROJECT, this.project);
    },
    deleteProjectWithoutTasks() {
      this.$store.dispatch(types.DELETE_PROJECT_WITHOUT_TASKS, this.project);
    },
    editProject() {
      console.log(this.project.index);
      this.$modal.show(modalNames.NEW_PROJECT, {id: this.project.index})
    }
  },
  computed: {
    toEditProject() {
      return `/home/projects/${this.project.index}/edit`;
    },
    totalTime() {
      return this.$store.getters[types.TASKS]
        .filter(task => task.projectIndex === this.project.index)
        .reduce((acc, curr) => acc+curr.totalMinutes, 0)
    }
  },
  components: {
    appProjectStatistics: ProjectStatistics,
    appProjectTasks: ProjectTasks
  }
};
</script>

<style >

</style>