import * as types from "../types.js";

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
  ],
  lastIndex: 1
};

const getters = {
  [types.PROJECTS]: state => {
    return state.projects;
  },
  [types.PROJECTS_CHECK_NAME_EXIST]: state => projectNameToCheck => {
    return state.projects.reduce((acc, curr) => {
      return acc || curr.name === projectNameToCheck;
    }, false);
  }
};

const mutations = {
  [types.MUTATE_SET_PROJECTS]: (state, payload) => {
    state.projects = payload;
  },
  [types.MUTATE_ADD_PROJECT]: (state, payload) => {
    let index;
    try {
      index = state.projects.sort((a, b) => b.index - a.index)[0].index + 1;
    } catch (error) {
      index = 0;
    }
    state.projects.push({
        ...payload,
        time: 0,
        index
    });
    state.projects.sort((a, b) => a.index - b.index)
  },
  [types.MUTATE_ALTER_PROJECT]: (state, payload) => {
    const indexToChange = state.projects.findIndex(project => project.index === payload.index);
    state.projects.splice(indexToChange, 1, payload);
    state.projects.sort((a, b) => a.index - b.index);
    
  },
  [types.MUTATE_DELETE_PROJECT]: (state, payload) => {
      const  index  = state.projects.findIndex(proj => proj.index === payload.index);
      state.projects.splice(index, 1);
    state.projects.sort((a, b) => a.index - b.index);
      
  }
};

const actions = {
    [types.ADD_PROJECT]: ({commit}, payload) => {
        commit(types.MUTATE_ADD_PROJECT, payload);
    },
    [types.DELETE_PROJECT]: ({commit, rootGetters, dispatch}, payload) => {
        commit(types.MUTATE_DELETE_PROJECT, payload);

        [...rootGetters[types.TASKS]].forEach((task, i) => {
          if (task.projectIndex === payload.index) {
            dispatch(types.DELETE_TASK, task, { root: true });
          }
        });
    },
    [types.DELETE_PROJECT_WITHOUT_TASKS]: ({commit}, payload) => {
        commit(types.MUTATE_DELETE_PROJECT, payload);
    },
    [types.ALTER_PROJECT]: ({commit}, payload) => {
        commit(types.MUTATE_ALTER_PROJECT, payload);
    }
};
export default { state, mutations, getters, actions };
