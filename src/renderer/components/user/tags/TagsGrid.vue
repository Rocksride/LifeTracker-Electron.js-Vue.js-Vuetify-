<template>

    <div>
        <v-btn @click='openNewTagModal' class='add-btn' fab dark color="indigo">
            <v-icon dark>add_box</v-icon>
        </v-btn>
        <v-container fluid style="min-height: 0;" grid-list-lg>
            <h2 class="text-xs-center">Tags</h2>
            <v-container>
                <v-layout row wrap>
                    <app-tag v-for='tag in allTags' :key='tag.counter' :tag='tag'></app-tag>
                </v-layout>
            </v-container>
        </v-container>
    </div>
</template>

<script>
import NewTagModal from './NewTagModal.vue';
import * as modalNames from '../../modals/names.js';
import * as types from '../../../store/types.js';
import Tag from './Tag.vue';
import {mapGetters, mapActions } from 'vuex';
    export default {
        methods: {
            openNewTagModal() {
                this.$modal.show(modalNames.NEW_TAG);
            }
        },
        components: {
            appTag: Tag,
            appNewTagModal: NewTagModal
        },
        computed: {
            ...mapGetters({
                allTags: types.TAGS
            }),
                toNewTag() { return `/home/tags/new`},

        }
    }
</script>

<style scoped>
.add-btn{
    position: absolute;
    right: 10px;
  }
</style>