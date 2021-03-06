export const REQUEST_TASK_CREATION = `REQUEST_TASK_CREATION`;
export const CREATE_TASK = `CREATE_TASK`;
export const SET_TASK_COMPLETE = `SET_TASK_COMPLETE`;
export const SET_TASK_GROUP = `SET_TASK_GROUP`;
export const SET_TASK_NAME = `SET_TASK_NAME`;
export const REQUEST_AUTH_USER = `REQUEST_AUTH_USER`;
export const PROCESSING_AUTH_USER = `PROCESSING_AUTH_USER`;
export const AUTH_IN_PROGRESS = `AUTH_IN_PROGRESS`;
export const AUTH_SUCCESS = `AUTH_SUCCESS`;
export const AUTH_FAILURE = `AUTH_FAILURE`;

export const requestTaskCreation = (groupId)=>({
    type:REQUEST_TASK_CREATION,
    groupId
});

export const createTask = (taskId, groupId, ownerId)=>({
    type:CREATE_TASK,
    taskId,
    groupId,
    ownerId
});

export const setTaskCompletion = (id, isComplete) => ({
    type: SET_TASK_COMPLETE,
    taskId: id,
    isComplete
});

export const setTaskName = (id, name) => ({
    type: SET_TASK_NAME,
    taskId: id,
    name
});

export const setTaskGroup = (id, groupId) => ({
    type: SET_TASK_GROUP,
    taskId: id,
    groupId
});

export const requestAuthenticateUser = (username, password) => ({
    type: REQUEST_AUTH_USER,
    username,
    password
});

export const processAuthenticateUser = (status = AUTH_IN_PROGRESS, session = null) => ({
    type: PROCESSING_AUTH_USER,
    session,
    authenticated: status
});
