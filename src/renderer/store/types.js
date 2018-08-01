//         GETTERS

// users projects
export const PROJECTS = 'projects/PROJECTS'
//account
export const USER = 'account/USER'
export const IS_USER_SIGNED_IN = 'account/IS_USER_SIGNED_IN'
//tags
export const TAGS = 'tags/TAGS'

//tasks
export const TASKS = 'userTasks/TASKS'
//shared
export const ERROR = 'shared/ERROR'
export const LOADING_STATE = 'shared/LOADING_STATE'


//        MUTATIONS
//users projects
export const MUTATE_SET_PROJECTS = 'projects/MUTATE_SET_PROJECTS'
export const MUTATE_ADD_PROJECT = 'projects/MUTATE_ADD_PROJECT'
export const MUTATE_ALTER_PROJECT = 'projects/MUTATE_ALTER_PROJECT'
export const MUTATE_DELETE_PROJECT = 'projects/MUTATE_DELETE_PROJECT'

//acount
export const MUTATE_SET_USER = 'account/MUTATE_SET_USER'
export const MUTATE_ALTER_USER = 'account/MUTATE_ALTER_USER'
export const MUTATE_USER_SIGNED_IN = 'account/MUTATE_USER_SIGNED_IN'
export const MUTATE_USER_SIGNED_OUT = 'account/MUTATE_USER_SIGNED_OUT'

//tasks
export const MUTATE_SET_TASKS = 'tasks/MUTATE_SET_TASKS'
export const MUTATE_ADD_TASK = 'tasks/MUTATE_ADD_TASK'
export const MUTATE_ALTER_TASK = 'tasks/MUTATE_ALTER_TASK'
export const MUTATE_DELETE_TASK = 'tasks/MUTATE_DELETE_TASK'

// users tags
export const MUTATE_SET_TAGS = 'tags/MUTATE_SET_TAGS'
export const MUTATE_ALTER_TAG = 'tags/MUTATE_ALTER_TAG'
export const MUTATE_ADD_TAG = 'tags/MUTATE_ADD_TAG'
export const MUTATE_DELETE_TAG = 'tags/MUTATE_DELETE_TAG'

//shared
export const MUTATE_SET_LOADING_STATE = 'shared/MUTATE_SET_LOADING_STATE'
export const MUTATE_SET_ERROR = 'shared/MUTATE_SET_ERROR'
export const MUTATE_CLEAR_ERROR = 'shared/MUTATE_CLEAR_ERROR'


//          ACTIONS

//projects
export const PROJECTS_CHECK_NAME_EXIST = 'projects/PROJECTS_CHECK_NAME_EXIST'
export const SET_PROJECTS = 'projects/SET_PROJECTS'
export const ADD_PROJECT = 'projects/ADD_PROJECT'
export const ALTER_PROJECT = 'projects/ALTER_PROJECT'
export const DELETE_PROJECT = 'projects/DELETE_PROJECT'
export const DELETE_PROJECT_WITHOUT_TASKS = 'projects/DELETE_PROJECT_WITHOUT_TASKS'
export const INC_PROJECT_SUMMARY_TIME = 'projects/INC_PROJECT_SUMMARY_TIME'
export const DEC_PROJECT_SUMMARY_TIME = 'projects/DEC_PROJECT_SUMMARY_TIME'

//account
export const SIGN_UP = 'account/SIGN_UP'
export const SIGN_IN = 'account/SIGN_IN'
export const SIGN_OUT = 'account/SIGN_OUT'

//tasks
export const TASKS_CHECK_NAME_EXIST = 'tasks/TASKS_CHECK_NAME_EXIST'
export const SET_TASKS = 'tasks/SET_TASKS'
export const ADD_TASK = 'tasks/ADD_TASK'
export const ALTER_TASK = 'tasks/ALTER_TASK'
export const DELETE_TASK = 'tasks/DELETE_TASK'

//tags
export const TAGS_CHECK_NAME_EXIST = 'tags/TAGS_CHECK_NAME_EXIST'
export const SET_TAGS = 'tags/SET_TAGS'
export const ALTER_TAG = 'tags/ALTER_TAG'
export const ADD_TAG = 'tags/ADD_TAG'
export const DELETE_TAG = 'tags/DELETE_TAG'
export const INC_TAG_SUMMARY_TIME = 'projects/INC_TAG_SUMMARY_TIME'
export const DEC_TAG_SUMMARY_TIME = 'projects/DEC_TAG_SUMMARY_TIME'


//shared
export const SET_ERROR = 'shared/SET_ERROR'
export const CLEAR_ERROR = 'shared/CLEAR_ERROR'
export const SET_LOADING_STATE = 'shared/SET_LOADING_STATE'