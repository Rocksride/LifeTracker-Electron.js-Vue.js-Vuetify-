import TagsGrid from "./TagsGrid.vue";
import DetailedTag from "./DetailedTag.vue";


export const routes = [
    { path: '', component: TagsGrid},
    { path: ":id" , component: DetailedTag, props: true},
  ];