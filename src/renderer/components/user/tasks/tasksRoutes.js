import TasksGrid from "./TasksGrid.vue";
import DetailedTask from "./DetailedTask.vue";

export const routes = [
    { path: '', component: TasksGrid},
    { path: ":id" , component: DetailedTask, props:true},
  ]