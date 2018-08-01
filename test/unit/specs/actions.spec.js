import * as types from "E:/Study/Study/7/Analyse and testing/projectRebuild/src/renderer/store/types.js";
import tagsModule from "../../../src/renderer/store/modules/tags.js";
import projectsModule from "../../../src/renderer/store/modules/projects.js";
import tasksModule from "../../../src/renderer/store/modules/tasks.js";

import { testAction } from "../helpers/index.js";
const toString = a => JSON.stringify(a);
describe("actions", () => {
  it("addTagAction", done => {
    const state = {
      tags: [
        { name: "tricking", index: 0, color: "#00caff" },
        { name: "training", index: 1, color: "#bada55" },
        { name: "js", index: 2, color: "#dd0048" },
        { name: "weight", index: 3, color: "#11dd99" },
        { name: "running", index: 4, color: "#99cdcd" }
      ]
    };
    //
    const newTag = {
      name: "randomName",
      color: "#bada55"
    };

    testAction(
      tagsModule.actions[types.ADD_TAG],
      newTag,
      state,
      [{ type: types.MUTATE_ADD_TAG, payload: newTag }],
      done
    );
  });
  it("deleteTagAction", done => {
    const state = {
      tags: [
        { name: "tricking", index: 0, color: "#00caff" },
        { name: "training", index: 1, color: "#bada55" },
        { name: "js", index: 2, color: "#dd0048" },
        { name: "weight", index: 3, color: "#11dd99" },
        { name: "running", index: 4, color: "#99cdcd" }
      ]
    };
    //
    const tag = { name: "tricking", index: 0, color: "#00caff" };

    testAction(
      tagsModule.actions[types.DELETE_TAG],
      tag,
      state,
      [{ type: types.MUTATE_DELETE_TAG, payload:tag }],
      done
    );
  });
  it("alterTagAction", done => {
    const state = {
      tags: [
        { name: "tricking", index: 0, color: "#00caff" },
        { name: "training", index: 1, color: "#bada55" },
        { name: "js", index: 2, color: "#dd0048" },
        { name: "weight", index: 3, color: "#11dd99" },
        { name: "running", index: 4, color: "#99cdcd" }
      ]
    };
    //
    const modifiedTag = {
      index: 1,
      name: "modifiedTrainingName",
      color: "#bada55"
    };

    testAction(
      tagsModule.actions[types.ALTER_TAG],
      modifiedTag,
      state,
      [{ type: types.MUTATE_ALTER_TAG, payload:modifiedTag }],
      done
    );
  });

  it("alterProjectAction", done => {
    const state = {
      projects: [
        {
          name: "Vue.js",
          description: "vue learning process",
          time: 0,
          index: 0,
          color: "#fcc600"
        },
        {
          name: "Rx.js",
          description: "reactive learning",
          time: 0,
          index: 1,
          color: "#09fccf"
        }
      ]
    };

    const modifiedProject = {
      name: "Vue.js modified",
      description: "vue learning process",
      time: 0,
      index: 0,
      color: "#fcc600"
    };

    testAction(
      projectsModule.actions[types.ALTER_PROJECT],
      modifiedProject,
      state,
      [{ type: types.MUTATE_ALTER_PROJECT, payload:modifiedProject }], done
    );
  });
  it("addNewProjectAction", done => {
    const state = {
      projects: [
        {
          name: "Vue.js",
          description: "vue learning process",
          time: 0,
          index: 0,
          color: "#fcc600"
        },
        {
          name: "Rx.js",
          description: "reactive learning",
          time: 0,
          index: 1,
          color: "#09fccf"
        }
      ]
    };

    const newProject = {
      name: "test name",
      description: "reactive learning",
      color: "#09fccf"
    };

    testAction(projectsModule.actions[types.ADD_PROJECT], newProject, state, [
      { type: types.MUTATE_ADD_PROJECT, payload: newProject},
      
    ], done);
  });
  it("deleteProjectAction", done => {
    const state = {
      projects: [
        {
          name: "Vue.js",
          description: "vue learning process",
          time: 0,
          index: 0,
          color: "#fcc600"
        },
        {
          name: "Rx.js",
          description: "reactive learning",
          time: 0,
          index: 1,
          color: "#09fccf"
        }
      ]
    };

    const project = {
      name: "Vue.js",
      description: "vue learning process",
      time: 0,
      index: 0,
      color: "#fcc600"
    };

    testAction(projectsModule.actions[types.DELETE_PROJECT], project, state, [
      { type: types.MUTATE_DELETE_PROJECT, payload:project}
    ], done);
  });

  it("addNewTaskAction", done => {
    const state = {
      tasks: [
        {
          index: 0,
          projectIndex: 0,
          description: "000",
          totalMinutes: 5,
          start: { date: "21.10.2017", time: "13:30" },
          end: { date: "21.10.2017", time: "14:30" },
          tagsIndexes: [0, 1, 2, 3]
        },
        {
          index: 1,
          projectIndex: 0,
          description: "111",
          totalMinutes: 5,
          start: { date: "21.10.2017", time: "13:30" },
          end: { date: "21.10.2017", time: "15:30" },
          tagsIndexes: [0, 1, 2, 3]
        },
        {
          index: 2,
          projectIndex: 1,
          description: "222",
          totalMinutes: 5,
          start: { date: "21.10.2017", time: "12:30" },
          end: { date: "21.10.2017", time: "13:30" },
          tagsIndexes: [0, 1, 2, 3]
        },
        {
          index: 3,
          projectIndex: 1,
          description: "333",
          totalMinutes: 5,
          start: { date: "21.10.2017", time: "13:30" },
          end: { date: "21.10.2017", time: "13:35" },
          tagsIndexes: [0, 1, 2, 3]
        }
      ]
    };
    //
    const newTask = {
      projectIndex: 0,
      description: "asdasdasd",
      start: { time: "22:45", date: "2017-12-12" },
      end: { time: "22:45", date: "2017-12-13" },
      tagsIndexes: [2, 3, 4],
      totalMinutes: 1440
    };
    var a = {
      projectIndex: 1,
      description: "asdasdsadasdds",
      start: { time: "20:34", date: "2017-12-21" },
      end: { time: "22:34", date: "2017-12-21" },
      tagsIndexes: [2, 3, 4],
      totalMinutes: 120
    };

    testAction(tasksModule.actions[types.ADD_TASK], newTask, state, [
      { type: types.MUTATE_ADD_TASK, payload:newTask  }
    ], done);
  });
  it("deleteTaskAction", done => {
    const state = {
      tasks: [
        {
          index: 0,
          projectIndex: 0,
          description: "000",
          totalMinutes: 5,
          start: { date: "21.10.2017", time: "13:30" },
          end: { date: "21.10.2017", time: "14:30" },
          tagsIndexes: [0, 1, 2, 3]
        },
        {
          index: 1,
          projectIndex: 0,
          description: "111",
          totalMinutes: 5,
          start: { date: "21.10.2017", time: "13:30" },
          end: { date: "21.10.2017", time: "15:30" },
          tagsIndexes: [0, 1, 2, 3]
        },
        {
          index: 2,
          projectIndex: 1,
          description: "222",
          totalMinutes: 5,
          start: { date: "21.10.2017", time: "12:30" },
          end: { date: "21.10.2017", time: "13:30" },
          tagsIndexes: [0, 1, 2, 3]
        },
        {
          index: 3,
          projectIndex: 1,
          description: "333",
          totalMinutes: 5,
          start: { date: "21.10.2017", time: "13:30" },
          end: { date: "21.10.2017", time: "13:35" },
          tagsIndexes: [0, 1, 2, 3]
        }
      ]
    };
    //
    const task = {
      index: 2,
      projectIndex: 1,
      description: "222",
      totalMinutes: 5,
      start: { date: "21.10.2017", time: "12:30" },
      end: { date: "21.10.2017", time: "13:30" },
      tagsIndexes: [0, 1, 2, 3]
    };

    testAction(tasksModule.actions[types.DELETE_TASK], task, state, [
      { type: types.MUTATE_DELETE_TASK, payload:task }
    ], done);
  });
  it("alterTaskAction", done => {
    const state = {
      tasks: [
        {
          index: 0,
          projectIndex: 0,
          description: "000",
          totalMinutes: 5,
          start: { date: "21.10.2017", time: "13:30" },
          end: { date: "21.10.2017", time: "14:30" },
          tagsIndexes: [0, 1, 2, 3]
        },
        {
          index: 1,
          projectIndex: 0,
          description: "111",
          totalMinutes: 5,
          start: { date: "21.10.2017", time: "13:30" },
          end: { date: "21.10.2017", time: "15:30" },
          tagsIndexes: [0, 1, 2, 3]
        },
        {
          index: 2,
          projectIndex: 1,
          description: "222",
          totalMinutes: 5,
          start: { date: "21.10.2017", time: "12:30" },
          end: { date: "21.10.2017", time: "13:30" },
          tagsIndexes: [0, 1, 2, 3]
        },
        {
          index: 3,
          projectIndex: 1,
          description: "333",
          totalMinutes: 5,
          start: { date: "21.10.2017", time: "13:30" },
          end: { date: "21.10.2017", time: "13:35" },
          tagsIndexes: [0, 1, 2, 3]
        }
      ]
    };
    //
    const task = {
      index: 1,
      projectIndex: 0,
      description: "11asdasddsadasdsadsa1",
      totalMinutes: 5,
      start: { date: "21.10.2017", time: "13:30" },
      end: { date: "21.10.2017", time: "15:30" },
      tagsIndexes: [0, 1, 2, 3]
    };

    testAction(tasksModule.actions[types.ALTER_TASK], task, state, [
      { type: types.MUTATE_ALTER_TASK , payload:task}
    ], done);
  });
});
