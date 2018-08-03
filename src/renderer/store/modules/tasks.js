import * as types from "../types.js";
import * as R from 'ramda';

const state = {
  tasks: [{
      index: 0,
      projectIndex: 0,
      description: "000",
      totalMinutes: 5,
      start: {
        date: "21.10.2017",
        time: "13:30"
      },
      end: {
        date: "21.10.2017",
        time: "14:30"
      },
      tagsIndexes: [0, 1, 2, 3]
    },
    {
      index: 1,
      projectIndex: 0,
      description: "111",
      totalMinutes: 5,
      start: {
        date: "21.10.2017",
        time: "13:30"
      },
      end: {
        date: "21.10.2017",
        time: "15:30"
      },
      tagsIndexes: [0, 1, 2, 3]
    },
    {
      index: 2,
      projectIndex: 1,
      description: "222",
      totalMinutes: 5,
      start: {
        date: "21.10.2017",
        time: "12:30"
      },
      end: {
        date: "21.10.2017",
        time: "13:30"
      },
      tagsIndexes: [0, 1, 2, 3]
    },
    {
      index: 3,
      projectIndex: 1,
      description: "333",
      totalMinutes: 5,
      start: {
        date: "21.10.2017",
        time: "13:30"
      },
      end: {
        date: "21.10.2017",
        time: "13:35"
      },
      tagsIndexes: [0, 1, 2, 3],
    }
  ]
};
const getters = {
  [types.TASKS]: (state, getters) => {
    const allProjects = getters[types.PROJECTS];
    const tasks = state.tasks;

    const findProject = task => R.find(R.propEq('index', task.projectIndex), allProjects);
    const pickProjectName = R.pipe(findProject, R.pick(['name','color']));
    return R.map(t => R.merge(t, pickProjectName(t)), tasks)
  }
  // [types.TASKS_CHECK_NAME_EXIST]: (state) => taskNameTo => {
  //     return state.tasks.reduce((acc, curr) => {
  //         return acc || curr;
  //     }, false)
  // }
};
const mutations = {
  [types.MUTATE_SET_TASKS]: (state, payload) => {
    state.tasks = payload;
  },
  [types.MUTATE_ADD_TASK]: (state, payload) => {
    try {
      payload.index = state.tasks.sort((a, b) => b.index - a.index)[0].index + 1;
    } catch (e) {
      payload.index = 0;
    }
    state.tasks.push(payload);
    state.tasks.sort((a, b) => a.index - b.index)
  },
  [types.MUTATE_ALTER_TASK]: (state, payload) => {
    const taskToReplace = state.tasks.findIndex(task => task.index === payload.index);
    state.tasks.splice(taskToReplace, 1, payload);
    state.tasks.sort((a, b) => a.index - b.index)
  },
  [types.MUTATE_DELETE_TASK]: (state, payload) => {
    const index = state.tasks.findIndex(({
      index
    }) => index === payload.index);
    state.tasks.splice(index, 1);
    state.tasks.sort((a, b) => a.index - b.index)
  }
};

const actions = {
  [types.ADD_TASK]: ({
    commit
  }, payload) => {
    commit(types.MUTATE_ADD_TASK, payload);
  },
  [types.DELETE_TASK]: ({
    commit
  }, payload) => {
    commit(types.MUTATE_DELETE_TASK, payload);
  },
  [types.ALTER_TASK]: ({
    commit
  }, payload) => {
    commit(types.MUTATE_ALTER_TASK, payload);
  }
};
export default {
  state,
  mutations,
  getters,
  actions
};