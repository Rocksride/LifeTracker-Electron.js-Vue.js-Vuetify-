import ProjectsGrid from "./ProjectsGrid.vue";
import DetailedProject from "./DetailedProject.vue";

export const routes =  [
    { path: '', component: ProjectsGrid},
    { path: ":id" , component: DetailedProject, props:true},
  ]