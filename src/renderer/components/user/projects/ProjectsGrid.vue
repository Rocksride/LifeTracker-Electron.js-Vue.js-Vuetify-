<template>
  <div>
    <v-btn @click='openNewProjectModal' class='add-btn' fab dark color="indigo">
      <v-icon dark>create_new_folder</v-icon>
    </v-btn>
    <v-container fluid style="min-height: 0;" grid-list-lg>
      <h2 class="text-xs-center">Projects</h2>
      <v-layout row wrap>
        <app-project v-for="project in allProjects" :key='project.index' :project='project'></app-project>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import * as modalNames from "../../modals/names.js";
import * as types from "../../../store/types.js";
import NewProjectModal from "./NewProjectModal.vue";
import Project from "./Project.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    openNewProjectModal() {
      this.$modal.show(modalNames.NEW_PROJECT);
    }
  },
  computed: {
    ...mapGetters({
      allProjects: types.PROJECTS
    }),
    toNewProject() {
      return `/home/projects/new`;
    }
  },
  components: {
    appProject: Project,
    appNewProjectModal: NewProjectModal
  }
};
</script>

<style scoped>
.add-btn {
  position: absolute;
  right: 10px;
}
</style>