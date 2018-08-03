<template>
    <v-flex xs3>
        <v-card :style="{backgroundColor:task.color}" class="white--text">
            <v-card-title class='text-xs-center' :style='{backgroundColor:task.color,filter:"brightness(95%)"}' primary-title>
                <v-container >
                    <v-layout row>
                        <v-flex xs9 md9 lg9 sm9>
                        <h3 class="display-2 mb-0">{{task.name}}</h3>
                        </v-flex>
                        <v-flex xs3 md3 lg3 sm3>
                                <v-icon style='cursor:pointer' @click='editTask'    >edit</v-icon>
                        </v-flex >
                    </v-layout>
                </v-container>
            </v-card-title>
            <v-card-text align-center>
                <p  class='text--lighten-4 font-weight-bold mb-0 subheading'>{{task.start.date}}:{{ task.start.time }}</p>
                <p  class='text--lighten-4 font-weight-bold subheading'>{{task.end.date}}:{{ task.end.time }} </p>
            </v-card-text>
            <v-card-text primary-title>
                
                <h5 class='font-weight-thin font-italic'>note: {{task.description}}</h5>
                <div>
                    <v-chip v-for='tag in getTags' :key='tag.index' :style='{backgroundColor:tag.color}'>
                        <v-avatar :style='{backgroundColor:tag.color,filter:"brightness(85%)"}'>{{tag.name.slice(0,1)}}</v-avatar>
                        {{tag.name}}
                    </v-chip>
                </div>
    
            </v-card-text>
            <v-card-actions>
                <v-btn color='success'  block >Open</v-btn>
                <v-btn color='error'  block  @click='ensure'>Delete</v-btn>
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
        data: () => ({
            dialog: false
        }),
        methods: {
            ensure() {
                this.dialog = true;
            },
            deleteTask() {
                this.$store.dispatch(types.DELETE_TASK, this.task)
            },
            editTask() {
                console.log({
                    id: this.task.index
                });
                this.$modal.show(modalNames.NEW_TASK, {
                    id: this.task.index
                });
            },
            hideModa() {
                this.$modal.hide(modalNames.NEW_TASK);
            }
        },
        computed: {
            getTags() {
                return this.$store.getters[types.TAGS]
                    .filter(({
                        index
                    }) => this.task.tagsIndexes.includes(index));
            },
         
        }
    };
</script>

<style scoped>
    
</style>