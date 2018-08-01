<template>
    <section>
        <app-new-project-modal></app-new-project-modal>
        <app-new-task-modal></app-new-task-modal>
        <app-new-tag-modal></app-new-tag-modal>
    </section>
</template>

<script>
import NewProjectModal from '../user/projects/NewProjectModal.vue'
import NewTaskModal from '../user/tasks/NewTaskModal.vue'
import NewTagModal from '../user/tags/NewTagModal.vue'
export default {
    components: {
        appNewProjectModal: NewProjectModal,
        appNewTaskModal: NewTaskModal,
        appNewTagModal: NewTagModal
    }
}
</script>

<style scoped>

</style>