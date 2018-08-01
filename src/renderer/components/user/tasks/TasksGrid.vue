<template>
  <div>
      <v-btn 
      @click='openNewTaskModal'
      class='add-btn' fab dark color="indigo">
        <v-icon dark>note_add</v-icon>
      </v-btn>
    <v-container fluid style="min-height: 0;" grid-list-lg>
      <h2 class="text-xs-center">Tasks</h2>
      <v-layout row wrap>
        <app-task v-for='task in allTasks' :key='task.index' :task='task'></app-task>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import NewTaskModal from "./NewTaskModal.vue";
import * as modalNames from "../../modals/names.js";
import * as types from "../../../store/types.js";
import Task from "./Task.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    toNewTask: `/home/tasks/new`
  }),
  methods: {
    openNewTaskModal() {
      this.$modal.show(modalNames.NEW_TASK);
    }
  },
  components: {
    appTask: Task,
    appNewTaskModal: NewTaskModal
  },
  computed: {
    ...mapGetters({
      allTasks: types.TASKS
    })
  }
};
</script>

<style scoped>
.add-btn {
  position: absolute;
  right: 10px;
}
</style>