<template>
  <modal :name='modalName' @before-open='beforeOpen'
  height='auto'>
      <v-layout column>
        <v-form>
          <v-card>
            <v-container fluid>
              <v-layout row wrap>
                <v-flex class='pb-3' xs12>
                  <v-select class='display-2' v-bind:items="getProjects.projectsNames" v-model="chosenProject" label="Select project" single-line
                    auto prepend-icon="folder_open" hide-details required></v-select>
                </v-flex>
                <v-spacer></v-spacer>
                <!-- <v-flex xs6> -->
                <v-flex xs12 sm5 lg5>
                  <v-card>
                    <v-card-text>
                      <v-menu lazy :close-on-content-click="false" v-model="start.startDateToggle" :rules='dataRules' 
                        offset-y full-width :nudge-right="40" max-width="290px" min-width="290px">
                        <v-text-field slot="activator" :rules='dataRules' label="Start date" v-model="start.startDate" prepend-icon="event" readonly></v-text-field>
                        <v-date-picker :allowed-dates='isDateBeforeNow' v-model="start.startDate" no-title scrollable actions>
                          <template scope="{ save, cancel }">
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                              <v-btn flat color="primary" @click="()=>{
                          save();
                          dateValidate();
                          setEqualDates();
                          
                          start.startTimeToggle = true;
                          }">OK</v-btn>
                            </v-card-actions>
                          </template>
                        </v-date-picker>
                      </v-menu>
                      <v-menu lazy :close-on-content-click="false" v-model="start.startTimeToggle" :rules='dataRules' 
                        offset-y full-width :nudge-right="40" max-width="290px" min-width="290px">
                        <v-text-field slot="activator" :rules='dataRules' label="Start time" v-model="start.startTime" prepend-icon="access_time"
                          readonly></v-text-field>
                        <v-time-picker format='24hr' :allowed-hours='restrictHours' v-model="start.startTime" no-title scrollable actions>
                          <template scope="{ save, cancel }">
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                              <v-btn flat color="primary" @click="() => {
                                save();
                                timeValidate();
                                }">OK</v-btn>
                            </v-card-actions>
                          </template>
                        </v-time-picker>
                      </v-menu>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs12 sm5 lg5>
                  <v-card>
                    <v-card-text>
                      <v-menu lazy :close-on-content-click="false" v-model="end.endDateToggle" :rules='dataRules' 
                        offset-y full-width :nudge-right="40" max-width="290px" min-width="290px">
                        <v-text-field slot="activator" :rules='dataRules' label="End date" v-model="end.endDate" prepend-icon="event" readonly></v-text-field>
                        <v-date-picker :allowed-dates='restrictEndDate' v-model="end.endDate" no-title scrollable actions>
                          <template scope="{ save, cancel }">
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                              <v-btn flat color="primary" @click="()=>{
                      save();
                      dateValidate();
                      end.endTimeToggle = true;
                      }">OK</v-btn>
                            </v-card-actions>
                          </template>
                        </v-date-picker>
                      </v-menu>
  
                      <v-menu lazy :close-on-content-click="false" v-model="end.endTimeToggle" :rules='dataRules' 
                        offset-y full-width :nudge-right="40" max-width="290px" min-width="290px">
                        <v-text-field slot="activator" :rules='dataRules' label="End time" v-model="end.endTime" prepend-icon="access_time" readonly></v-text-field>
                        <v-time-picker :allowed-hours='restrictEndHours' format='24hr' v-model="end.endTime" no-title scrollable actions>
                          <template scope="{ save, cancel }">
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                              <v-btn flat color="primary" @click="() => {
                                save();
                                timeValidate();
                                }">OK</v-btn>
                            </v-card-actions>
                          </template>
                        </v-time-picker>
                      </v-menu>
                    </v-card-text>
                  </v-card>
                </v-flex>
  
              </v-layout>
            </v-container>
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-select v-model="tags" ref='tagsSelector'  prepend-icon="label" label="Chose tags" chips tags :items="getTags.tagNames">
                    <template slot="selection" scope="data">
  
                            <v-chip v-if='whetherAddNewTag(data.parent.items.includes(data.item), data.item)'
                             :style='{backgroundColor:getTags.defineColor(data.item)}'
                             @input="data.parent.selectItem(data.item)" 
                             class="chip--select-multi"
                             :selected="data.selected" :disabled="data.disabled" 
                             :key="JSON.stringify(data.item)">
                              <v-avatar :style='{backgroundColor:getTags.defineColor(data.item), filter:"brightness(85%)"}'>{{ data.item.slice(0,2) }}</v-avatar>
                              {{ data.item}}
                            </v-chip>
                          <template v-else>
                            
                          </template>
  
                    </template>
                  </v-select>
                </v-flex>
                <v-flex xs12>
                  <v-text-field name='description' label='description' id='description' prepend-icon="description" v-model='description' type='text'></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12 sm12 lg12>
                  <v-btn @click.native.stop='clickHandler' color='info'>{{clickTxt}}
                  </v-btn>
                </v-flex>
              </v-layout>
  
            </v-container>
          </v-card>
        </v-form>
      </v-layout>
  <app-new-tag-modal></app-new-tag-modal>
</modal>
</template>

<script>
import { calculateMinutes } from "../../../utils/functions";
import * as types from "../../../store/types.js";
import * as modalNames from "../../modals/names.js";
import NewTagModal from "../tags/NewTagModal.vue";
export default {
  data: () => ({
    modalName: modalNames.NEW_TASK,
    start: {
      startTime: null,
      startDate: new Date().toISOString().substr(0, 10),
      startTimeToggle: false,
      startDateToggle: false
    },
    index: null,
    end: {
      endTime: null,
      endDate: null,
      endTimeToggle: false,
      endDateToggle: false
    },
    allowedHours: [1, 2, 3, 23],
    allowedMinutes: [],
    description: "",
    isToday: false,
    isSameDay: false,
    tags: [],
    chosenProject: null,
    clickHandler: null,
    clickTxt: "Add task",
    items: ["Programming", "Design", "Vue", "Vuetify"],
    dataRules: [v => !!v || "date is required"]
  }),
  components: {
    appNewTagModal: NewTagModal
  },
  methods: {
    reinit() {
      this.start = {
        startTime: null,
        startDate: new Date().toISOString().substr(0, 10),
        startTimeToggle: false,
        startDateToggle: false
      },
      this.end ={
        endTime: null,
        endDate: null,
        endTimeToggle: false,
        endDateToggle: false
      }
      this.description = '';
      this.chosenProject = '';
      this.clickHandler = this.addTask;
      this.clickTxt = 'Add task';
      this.tags = [];
    },
    beforeOpen(e) {
      this.reinit();
      // try {

      if (e.params.id || e.params.id === 0) {
        const id = e.params.id;
        this.index = id;
        const task = this.$store.getters[types.TASKS].find( task => task.index === id );
        this.start.startDate = task.start.date;
        this.start.startTime = task.start.time;
        this.description = task.description;
        this.end.endDate = task.end.date;
        this.end.endTime = task.end.time;
        this.tags = this.$store.getters[types.TAGS]
          .filter(tag => task.tagsIndexes.includes(tag.index))
          .map(tag => tag.name);
          const project = this.$store.getters[types.PROJECTS].find( prj => prj.index === task.projectIndex )
          project ? this.chosenProject = project.name : this.chosenProject = '' ;
        this.clickHandler = this.alterTask;
        this.clickTxt = 'Save changes';
      }
      if (e.params.dataFromTimer) {
        const dataFromTimer = e.params.dataFromTimer;
        this.start.startTime = dataFromTimer.startTime;
        this.start.startDate = dataFromTimer.startDate;
        this.end.endTime = dataFromTimer.endTime;
        this.end.endDate = dataFromTimer.endDate;
        this.chosenProject = dataFromTimer.project;
      }
      // }catch(e) {
        
      // }
      
      // if (e.params.alterData) {
      //   this.start.startTime = dataFromTimer.startTime;
      //   this.start.startDate = dataFromTimer.startDate;
      //   this.end.endTime = dataFromTimer.endTime;
      //   this.end.endDate = dataFromTimer.endDate;
      //   this.chosenProject = dataFromTimer.project;
      //   this.clickTxt = "Save changes";
      //   this.clickHandler = this.alterTask;
      // }
    },
    calcMinutes() {
      return calculateMinutes(
        { startDate: this.start.startDate, startTime: this.start.startTime },
        { endDate: this.end.endDate, endTime: this.end.endTime }
      );
    },
    alterTask() {
       const task = {
        index: this.index,
        projectIndex: this.$store.getters[types.PROJECTS].filter( ({ name }) => name === this.chosenProject )[0].index,
        description: this.description,
        start: {
          time: this.start.startTime,
          date: this.start.startDate
        },
        end: {
          time: this.end.endTime,
          date: this.end.endDate
        },
        tagsIndexes: this.getTags.retrieveIndexThroughName(this.tags),
        totalMinutes: this.calcMinutes()
      };
      console.log(JSON.stringify(task));
      this.$store.dispatch(types.ALTER_TASK, task);
      this.$modal.hide(this.modalName);     
    },
    whetherAddNewTag(bool, name) {
      console.log();
      if (bool) {
        return true;
      } else {
        this.$refs.tagsSelector.disabled = true;
        this.$modal.show(modalNames.NEW_TAG, { tagName: name });
        return false;
      }
    },
    addTask() {
      const task = {
        projectIndex: this.$store.getters[types.PROJECTS].filter( ({ name }) => name === this.chosenProject )[0].index,
        description: this.description,
        start: {
          time: this.start.startTime,
          date: this.start.startDate
        },
        end: {
          time: this.end.endTime,
          date: this.end.endDate
        },
        tagsIndexes: this.getTags.retrieveIndexThroughName(this.tags),
        totalMinutes: this.calcMinutes()
      };
      console.log(JSON.stringify(task));
      this.$store.dispatch(types.ADD_TASK, task);
      this.$modal.hide(this.modalName);
      // this.$router.push("/home/tasks");
    },
    dateValidate() {
      //checking if start day actually goes before end day
      if (this.start.startDate && this.end.endDate) {
        const [yearStart, monthStart, dayStart] = this.start.startDate.split(
          "-"
        );
        const [yearEnd, monthEnd, dayEnd] = this.end.endDate.split("-");
        const [year, month, day] = new Date()
          .toISOString()
          .substr(0, 10)
          .split("-");
        this.isToday =
          yearEnd === year && monthEnd === month && dayEnd === day
            ? true
            : false;
        this.isSameDay =
          yearStart === yearEnd &&
          monthStart === monthEnd &&
          dayStart === dayEnd
            ? true
            : false;
        if (
          yearEnd < yearStart ||
          (yearEnd === yearStart && monthEnd < monthStart) ||
          (yearEnd === yearStart &&
            monthEnd === monthStart &&
            dayEnd < dayStart)
        ) {
          this.$store.dispatch(types.SET_ERROR, {
            message: `date of start should prepend ending date`
          });
          this.invalidMessage = `date of start should prepend ending date`;
        } else {
          this.invalidMessage = null;
        }
      }
      return true;
    },
    setEqualDates() {
      if (!this.end.endDate) this.end.endDate = this.start.startDate;
    },
    timeValidate() {
      //checking if start time actually goes before end time
      if (
        this.start.startDate &&
        this.end.endDate &&
        this.start.startTime &&
        this.end.endTime
      ) {
        const [startHours, startMinutes] = this.start.startTime.split(":");
        const [endHours, endMinutes] = this.end.endTime.split(":");
        if (
          startHours > endHours ||
          (startHours === endHours && startMinutes > endMinutes)
        ) {
          if (this.isSameDay) {
            this.$store.dispatch(types.SET_ERROR, {
              message: `time of start should prepend time of end`
            });
          }
        }
      }
    }
  },
  computed: {
    getProjects() {
      const projects = this.$store.getters[types.PROJECTS];
      return {
        projects: projects,
        projectsNames: projects.reduce(
          (acc, curr) => (acc.push(curr.name), acc),
          []
        )
      };
    },
    getTags: {
      get() {
        const tags = this.$store.getters[types.TAGS];
        return {
          tags: tags,
          tagNames: tags.reduce((acc, curr) => {
            acc.push(curr.name);
            return acc;
          }, []),
          defineColor: function(name) {
            return tags.filter(tag => tag.name === name)[0].color;
          },
          retrieveIndexThroughName: chosenTags => {
            return tags.reduce((acc, { name, index }) => {
              if (chosenTags.includes(name)) {
                console.log(index);
                acc.push(index);
              }
              return acc;
            }, []);
          }
        };
      },
      set() {}
    },
    isDateBeforeNow() {
      return date => {
        const dateNow = new Date();
        const dateToCheck = date.toISOString().substr(0, 10);
        const [yearNow, monthNow, dayNow] = dateNow
          .toISOString()
          .substr(0, 10)
          .split("-")
          .map(Number);
        const [yearToCheck, monthToCheck, dayToCheck] = dateToCheck
          .split("-")
          .map(Number);
        if (
          yearToCheck > yearNow ||
          (yearToCheck === yearNow && monthToCheck > monthNow) ||
          (yearToCheck === yearNow &&
            monthToCheck === monthNow &&
            dayToCheck >= dayNow)
        ) {
          return false;
        } else {
          return true;
        }
      };
    },
    isHoursBeforeNow() {
      return hours => {
        const [hoursNow] = new Date().toLocaleTimeString().split(":");
        // console.log(hours);
        // console.log(hoursNow);
        // const [hoursToCheck] = hours.split(':');
        // console.log(hoursToCheck);
        if (hours > hoursNow) {
          return false;
        } else {
          return true;
        }
      };
    },
    restrictEndHours() {
      return hour => {
        const [hourNow] = new Date()
          .toLocaleTimeString()
          .split(":")
          .map(Number);
        if (hour > hourNow) return false;

        if (this.start.startTime && this.isSameDay) {
          const startHour = this.start.startTime.split(":").map(Number)[0];
          return hour >= startHour ? true : false;
        }

        return true;
      };
    },
    restrictHours() {
      return hours => {
        const [yearNow, monthNow, dayNow] = new Date()
          .toISOString()
          .substr(0, 10)
          .split("-")
          .map(Number);
        const [
          yearToCheck,
          monthToCheck,
          dayToCheck
        ] = this.start.startDate.split("-").map(Number);
        if (
          yearNow === yearToCheck &&
          monthNow === monthToCheck &&
          dayNow === dayToCheck
        ) {
          const [hoursNow] = new Date()
            .toLocaleTimeString()
            .split(":")
            .map(Number);
          if (hours > hoursNow) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      };
    },
    restrictEndDate() {
      return date => {
        const dateToCheck = date.toISOString().substr(0, 10);
        if (this.start.startDate) {
          const [yearStart, monthStart, dayStart] = this.start.startDate
            .split("-")
            .map(Number);
          const [yearToCheck, monthToCheck, dayToCheck] = dateToCheck
            .split("-")
            .map(Number);
          if (
            yearToCheck > yearStart ||
            (yearToCheck === yearStart && monthToCheck > monthStart) ||
            (yearToCheck === yearStart &&
              monthToCheck === monthStart &&
              dayToCheck + 1 >= dayStart)
          ) {
            return this.isDateBeforeNow(date) ? true : false;
          } else {
            return false;
          }
        } else {
          return this.isDateBeforeNow(date) ? true : false;
        }
      };
    },
    restrictEndMinutes() {
      return minutes => {
        if (this.start.startTime) {
          const [startHour, startMinutes] = this.start.startTime.split(":");
          const [endHour] = this.end.endTime.split(":")[0];
          if (startHour <= endHour) {
            if (minutes >= startMinutes) {
              return true;
            } else {
              return false;
            }
          }
        } else {
          return true;
        }
      };
    }
  }
};
</script>