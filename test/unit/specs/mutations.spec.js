import * as types from "E:/Study/Study/7/Analyse and testing/projectRebuild/src/renderer/store/types.js";
import tagsModule from "../../../src/renderer/store/modules/tags.js";
import projectsModule from "../../../src/renderer/store/modules/projects.js";
import tasksModule from "../../../src/renderer/store/modules/tasks.js";
// import { MUTATE_ADD_PROJECT } from "./../../../src/renderer/store/types";
const toString = a => JSON.stringify(a);
describe("mutations", () => {
  it("addNewTag", () => {
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

    tagsModule.mutations[types.MUTATE_ADD_TAG](state, newTag);
    expect(state.tags.sort((a, b) => a.index - b.index)).to.deep.equal(
      [
        { name: "tricking", index: 0, color: "#00caff" },
        { name: "training", index: 1, color: "#bada55" },
        { name: "js", index: 2, color: "#dd0048" },
        { name: "weight", index: 3, color: "#11dd99" },
        { name: "running", index: 4, color: "#99cdcd" },
        { name: "randomName", index: 5, times: 0, color: "#bada55" }
      ].sort((a, b) => a.index - b.index)
    );
  });
  it("deleteTag", () => {
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

    tagsModule.mutations[types.MUTATE_DELETE_TAG](state, tag);
    expect(state.tags.sort((a, b) => a.index - b.index)).to.deep.equal(
      [
        { name: "training", index: 1, color: "#bada55" },
        { name: "js", index: 2, color: "#dd0048" },
        { name: "weight", index: 3, color: "#11dd99" },
        { name: "running", index: 4, color: "#99cdcd" }
      ].sort((a, b) => a.index - b.index)
    );
  });
  it("alterTag", () => {
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

    tagsModule.mutations[types.MUTATE_ALTER_TAG](state, modifiedTag);
    expect(state.tags.sort((a, b) => a.index - b.index)).to.deep.equal(
      [
        { name: "tricking", index: 0, color: "#00caff" },
        {
          index: 1,
          name: "modifiedTrainingName",
          color: "#bada55"
        },
        { name: "js", index: 2, color: "#dd0048" },
        { name: "weight", index: 3, color: "#11dd99" },
        { name: "running", index: 4, color: "#99cdcd" }
      ].sort((a, b) => a.index - b.index)
    );
  });

  it("alterProject", () => {
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

    projectsModule.mutations[types.MUTATE_ALTER_PROJECT](
      state,
      modifiedProject
    );
    expect(state.projects.sort((a, b) => a.index - b.index)).to.deep.equal(
      [
        {
          name: "Vue.js modified",
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
      ].sort((a, b) => a.index - b.index)
    );
  });
  it("addNewProject", () => {
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

    projectsModule.mutations[types.MUTATE_ADD_PROJECT](state, newProject);
    expect(state.projects.sort((a, b) => a.index - b.index)).to.deep.equal(
      [
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
        },
        {
          name: "test name",
          description: "reactive learning",
          color: "#09fccf",
          index: 2,
          time: 0
        }
      ].sort((a, b) => a.index - b.index)
    );
  });
  it("deleteProject", () => {
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

    projectsModule.mutations[types.MUTATE_DELETE_PROJECT](state, project);
    expect(state.projects.sort((a, b) => a.index - b.index)).to.deep.equal(
      [
        {
          name: "Rx.js",
          description: "reactive learning",
          time: 0,
          index: 1,
          color: "#09fccf"
        }
      ].sort((a, b) => a.index - b.index)
    );
  });

  it("addNewTask", () => {
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
    tasksModule.mutations[types.MUTATE_ADD_TASK](state, newTask);


    expect(state.tasks.sort((a, b) => a.index - b.index)).to.deep.equal(
      [
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
        },
        {
          index: 4,
          projectIndex: 0,
          description: "asdasdasd",
          start: { time: "22:45", date: "2017-12-12" },
          end: { time: "22:45", date: "2017-12-13" },
          tagsIndexes: [2, 3, 4],
          totalMinutes: 1440
        }
      ].sort((a, b) => a.index - b.index)
    );
  });
  it("deleteTask", () => {
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

    tasksModule.mutations[types.MUTATE_DELETE_TASK](state, task);
    expect(state.tasks.sort((a, b) => a.index - b.index)).to.deep.equal(
      [
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
          index: 3,
          projectIndex: 1,
          description: "333",
          totalMinutes: 5,
          start: { date: "21.10.2017", time: "13:30" },
          end: { date: "21.10.2017", time: "13:35" },
          tagsIndexes: [0, 1, 2, 3]
        }
      ].sort((a, b) => a.index - b.index)
    );
  });
  it("alterTask", () => {
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

    tasksModule.mutations[types.MUTATE_ALTER_TASK](state, task);
    expect(state.tasks.sort((a, b) => a.index - b.index)).to.deep.equal(
      [
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
          description: "11asdasddsadasdsadsa1",
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
      ].sort((a, b) => a.index - b.index)
    );
  });
});
