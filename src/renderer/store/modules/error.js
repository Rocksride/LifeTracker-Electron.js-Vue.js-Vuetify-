import * as types from "../types.js";

const state = {
  error: null,
  isLoading: false
};

const getters = {
    [types.ERROR]: (state) => {
        return state.error;
    },
    [types.LOADING_STATE]: (state) => {
        return state.isLoading;
    }
};

const mutations = {
    [types.MUTATE_SET_ERROR]: (state, payload) => {
        state.error = payload;
    },
    [types.MUTATE_CLEAR_ERROR]: (state) => {
        state.error = null;
    },
    [types.MUTATE_SET_LOADING_STATE]: (state, payload) => {
        console.info('from mutations Loading = '+payload);
        state.isLoading = payload;
    }
};

export const actions = {
    [types.SET_ERROR]: ({commit}, payload) => {
        commit(types.MUTATE_SET_ERROR, payload);
    },
    [types.CLEAR_ERROR]: ({commit}, payload) => {
        commit(types.MUTATE_CLEAR_ERROR, payload);
    },
    [types.SET_LOADING_STATE]: ({commit}, payload) => {
        commit(types.MUTATE_SET_LOADING_STATE, payload);
    }
}
export default {state, getters, mutations, actions};