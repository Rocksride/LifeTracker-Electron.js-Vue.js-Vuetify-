<template>
  <v-container fluid text-xs-center>
    <v-layout id='plate' column justify-space-around>
      <v-flex xs10 offset-xs1>
        <v-select :items="getProjects" label="Select project" v-model='selectedProjectName' editable item-value="text"></v-select>
      </v-flex>
      <v-flex xs10 offset-xs1>
        <v-btn v-if='!isStarted' @click='start' block color="success" large dark>
          Start timer
        </v-btn>
        <v-layout v-else>
          <v-flex xs6 class='mr-1'>
            <v-btn @click='pause' v-if='!isPaused' block color="warning" large dark>
              Pause
            </v-btn>
            <v-btn @click='unpause' v-else block color="success" large dark>
              Resume
            </v-btn>
          </v-flex>

          <v-flex xs6 class='ml-1'>
            <v-btn @click='stop' block color="error" large dark>
              Stop
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex v-if='isStarted' xs10 offset-xs1>
          <v-card-text class='display-2'>
            {{days ? `${days} days:`:null }}{{hours<10?`0${hours}`:hours}}:{{minutes<10? `0${minutes}`: minutes}}:{{seconds<10? `0${seconds}`:seconds}}
          </v-card-text>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { calculateMinutes } from '../../utils/functions'
import * as modalNames from '../modals/names.js'
import * as types from "../../store/types.js";
export default {
  data: () => ({
    selectedProjectName: "",
    isStarted: false,
    isPaused: false,
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    subscription: null,
    hours: 0,
    seconds: 0,
    minutes: 0,
    days: 0,
  }),
  methods: {
    clearTime() {
      this.startDate = null;
      this.startTime = null;
      this.hours = 0;
      this.seconds = 0;
      this.minutes = 0;
      this.days = 0;
    },
    start() {
      const date = new Date();
      this.startDate = date.toISOString().substr(0, 10);
      this.startTime = date.toLocaleTimeString()
      this.isStarted = true;
      this.startTimer();
    },
    pause() {
      this.dispose();
      this.isPaused = true;
    },
    stop() {
      this.dispose();
      const endDate = new Date();
      const startTime = this.startTime.split(':').filter((elem, i) => i<2).join(':');
      const [startHours, startMinutes ] = startTime.split(':').map(Number);
      let endHours = startHours + this.hours;
      let endMinutes = this.minutes + startMinutes;
      if (endMinutes > 60) {
        endHours += 1;
        endMinutes -= 60;
      }
      if (endHours === startHours && endMinutes === startMinutes) {
        endMinutes += 1;
      }
      this.isStarted = false;
      this.isPaused = false;
      const time = {
        startDate: this.startDate,
        startTime,
        endDate: endDate.toISOString().substr(0,10),
        endTime: `${endHours}:${endMinutes}`,
      };
      const obj = {
        ...time,
        project: this.selectedProjectName      };
      console.log(obj);
       this.$modal.show(modalNames.NEW_TASK, {dataFromTimer: obj})
      this.clearTime();
    },
    unpause() {
      this.isPaused = false;
      this.startTimer();
    },
    dispose() {
      clearInterval(this.subscription);
    },
    incStartTime() {
      this.seconds += 1;
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes += 1;
        if (this.minutes === 60) {
          this.hours += 1;
          this.minutes = 0;
        }
      }
    },
    startTimer() {
      this.subscription = setInterval(this.incStartTime, 1000);
    }
  },
  computed: {
    getProjects() {
      return this.$store.getters[types.PROJECTS].map(prj => prj.name);
    }
  }
};
</script>

<style scoped>
#plate {
  margin-top: 20%;
}
</style>