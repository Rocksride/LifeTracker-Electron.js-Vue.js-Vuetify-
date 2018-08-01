import * as types from "../types.js";
import * as firebase from "firebase";

const state = {
  isLoggedIn: false,
  user: {
    email: 'ihavenonameTaras@gmail.com'
  }
};

const getters = {
  [types.IS_USER_SIGNED_IN]: state => {
    return state.isLoggedIn;
  },
  [types.USER]: state => {
    return state.user;
  }
};

const mutations = {
  [types.MUTATE_SET_USER]: (state, payload) => {
    state.user = payload;
  },
  [types.MUTATE_USER_SIGNED_IN]: (state, payload) => {
    state.isLoggedIn = true;
  },
  [types.MUTATE_USER_SIGNED_OUT]: (state, payload) => {
    state.isLoggedIn = false;
    state.user = null;
  }
};

const actions = {
  [types.SIGN_UP]: ({ commit, dispatch }, payload) => {
    dispatch(types.SET_LOADING_STATE, true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        dispatch(types.SET_LOADING_STATE, false);
        dispatch(types.CLEAR_ERROR);
        const newUser = { id: user.uid, email: user.email };
        commit(types.MUTATE_SET_USER, newUser);
        commit(types.MUTATE_USER_SIGNED_IN);
      })
      .catch(err => {
        dispatch(types.SET_LOADING_STATE, false);
        dispatch(types.SET_ERROR, err);
        console.error(err);
      });
  },
  [types.SIGN_IN]: ({ commit, dispatch }, payload) => {
    dispatch(types.SET_LOADING_STATE, true);
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        console.log(user);
        dispatch(types.SET_LOADING_STATE, false);
        commit(types.MUTATE_SET_USER, { id: user.uid, email: user.email });
        commit(types.MUTATE_USER_SIGNED_IN);
        dispatch(types.CLEAR_ERROR);
      })
      .catch(err => {
        dispatch(types.SET_LOADING_STATE, false);
        dispatch(types.SET_ERROR, err);
        console.error(err);
      });
  },
  [types.SIGN_OUT]: ({ commit, dispatch }) => {
    commit(types.MUTATE_USER_SIGNED_OUT);
  }
};

export default { state, getters, mutations, actions };
