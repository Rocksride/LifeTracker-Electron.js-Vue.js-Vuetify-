<template>

    <v-flex xs4>
        <v-card :style="{backgroundColor:getProject.color}" class="white--text">
            <v-card-title primary-title>
                <div class="headline">
                    <div>
                        <h3>{{task.project}}</h3>
                        <h6>{{task.start.date}}-{{task.end.date}}: {{ task.start.time }}- {{ task.end.time }}
                        </h6>
                        <h6>{{task.description}}</h6>
                        <div>
                            <v-chip v-for='tag in getTags' :key='tag.index' :style='{backgroundColor:tag.color}'>
                                <v-avatar :style='{backgroundColor:tag.color,filter:"brightness(85%)"}'>{{tag.name.slice(0,1)}}</v-avatar>
                                {{tag.name}}
                            </v-chip>
                        </div>
                    </div>
                </div>

            </v-card-title>
            <v-card-actions>
                <v-btn flat dark>Open</v-btn>
                <v-btn @click='editTask' flat dark>Edit</v-btn>
                <v-btn flat dark @click='ensure'>Delete</v-btn>
            </v-card-actions>
        </v-card>
        <v-dialog v-model="dialog" persistent>
            <v-card style='overflow:hidden;'>
                <v-card-title class="headline">Delete task?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">Cancel</v-btn>
                    <v-btn color="red darken-1" @click='deleteTask' flat @click.native="dialog = false">Yes</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-flex>
</template>

<script>
import * as modalNames from '../../modals/names.js'
import * as types from '../../../store/types.js';
export default {
  props: {
    task: Object
  },
  data: () => ({ dialog: false}),
  methods: {
      ensure() {
          this.dialog = true;
      },
      deleteTask() {
          this.$store.dispatch(types.DELETE_TASK, this.task)
      },
      editTask() {
          console.log({id: this.task.index});
          this.$modal.show(modalNames.NEW_TASK, {id: this.task.index});
      }
  },
  computed: {
      getTags() {
          return this.$store.getters[types.TAGS]
            .filter(({index}) => this.task.tagsIndexes.includes(index));
      },
      getProject() {
          return this.$store.getters[types.PROJECTS]
            .filter(({index}) => index===this.task.projectIndex)[0] || '#111';
      }
  }
};
</script>

<style scoped>

</style>