import * as types from '../types.js';

const state = {
    tags: [
        {
            name: 'tricking',
            index: 0,
            color: '#00caff'
        },
        {
            name: 'training',
            index: 1,
            color: '#bada55'
        },
        {
            name: 'js',
            index: 2,
            color: '#dd0048'
        },
        {
            name: 'weight',
            index: 3,
            color: '#11dd99'
        },
        {
            name: 'running',
            index: 4,
            color: '#99cdcd'
        },
        //
    ],
};

const getters = {
    [types.TAGS]: ({tags}) => tags,
    [types.TAGS_CHECK_NAME_EXIST]: (state) => nameToCheck =>{
        return state.tags.reduce((acc, curr) => {
            console.log(`${curr.name} === ${nameToCheck}`);
            return acc || curr.name === nameToCheck;
        }, false);
    }
};

const mutations = {
    [types.MUTATE_SET_TAGS]: (state, payload) => {
        state.tags = payload;
    },
    [types.MUTATE_ALTER_TAG]: (state, {color, name, index}) => {
        const indexToInsert = state.tags.findIndex(tag => tag.index === index);
        state.tags.splice(indexToInsert, 1, { color, name, index });
         state.tags.sort((a, b) => a.index - b.index); 
    },
    [types.MUTATE_DELETE_TAG]: (state, payload) => {
        const index = state.tags.findIndex(({index}) =>  index === payload.index);
        state.tags.splice(index, 1);
        state.tags.sort((a, b) => a.index - b.index)
    },
    [types.MUTATE_ADD_TAG]: (state, payload) => {
        let index;
        try {
            index = state.tags.sort((a,b) => b.index - a.index)[0].index+1
        } catch (error) {
            index = 0;
        }
        console.log(index);
        state.tags.push({
            name: payload.name,
            index,
            times: 0,
            color: payload.color
        });
        state.tags.sort((a, b) => a.index - b.index)
    },

};

const actions = {
    [types.ADD_TAG]: ({commit} , payload) => {
        commit(types.MUTATE_ADD_TAG, payload);
    },
    [types.DELETE_TAG]: ({commit} , payload) => {
        commit(types.MUTATE_DELETE_TAG, payload);
    },
    [types.ALTER_TAG]: ({commit} , payload) => {
        commit(types.MUTATE_ALTER_TAG, payload);
    }

};
export default {state, mutations, getters, actions}