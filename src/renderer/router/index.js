import Vue from "vue";
import Router from "vue-router";
//auth components
import SignUp from "../components/SignUp.vue";
import SignIn from "../components/SignIn.vue";
import Authenticate from "../components/Authenticate.vue";

//layout components
import Home from "../components/Home.vue";
import Timer from "../components/user/Timer.vue";
import DatePicker from "../components/user/DatePicker.vue";
import AccountInfo from "../components/user/AccountInfo.vue";
import Settings from "../components/user/Settings.vue";
import Help from "../components/user/Help.vue";
import MoreInformation from "../components/user/MoreInformation.vue";

import {routes as ProjectsRoutes} from "../components/user/projects/projectsRoutes.js";
import {routes as TasksRoutes} from "../components/user/tasks/tasksRoutes.js";
import {routes as TagsRoutes} from "../components/user/tags/tagsRoutes.js";
import ProjectsWrapper from "../components/user/projects/ProjectsWrapper.vue";
import TasksWrapper from "../components/user/tasks/TasksWrapper.vue";
import TagsWrapper from "../components/user/tags/TagsWrapper.vue";






//------------------

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/home",
      component: Home,
      children: [
        {
          path: "",
          component: Timer
        },
        {
          path: "datepicker",
          component: DatePicker
        },
        {
          path: "projects",
          component: ProjectsWrapper,
          children: ProjectsRoutes
        },
        {
          path: "tasks",
          component: TasksWrapper,
          children: TasksRoutes
        },
        {
          path: "tags",
          component: TagsWrapper,
          name: 'allTags',
          children: TagsRoutes
        },
        {
          path: "account",
          component: AccountInfo
        },
        {
          path: "help",
          component: Help
        },
        {
          path: "info",
          component: MoreInformation
        },
        {
          path: "settings",
          component: Settings
        }
      ]
    },
    {
      path: "/auth",
      name: "auth",
      component: Authenticate,
      children: [
        {
          path: "",
          component: SignIn
        },
        {
          path: "signUp",
          component: SignUp
        },
        {
          path: "signIn",
          component: SignIn
        }
      ]
    },
    {
      path: "*",
      redirect: "/auth"
    }
  ]
});
