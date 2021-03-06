import { createStore, applyMiddleware, combineReducers } from "redux";
import { defaultState } from "../../server/defaultState";
import { createLogger } from "redux-logger";
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
import * as sagas from "./sagas";
import * as mutations from "./mutations"

export const store = createStore(
    combineReducers({
        session(userSession = defaultState.session || {}, action) {
            let {type, authenticated, session} = action;
            console.info("Reducer for sessions: ", type, ", ", authenticated, ", ", session);
            switch (type) {
                case mutations.REQUEST_AUTH_USER:
                    return {...userSession, authenticated: mutations.AUTH_IN_PROGRESS};
                case mutations.AUTH_IN_PROGRESS:
                    return {...userSession, authenticated};
                default:
                    return userSession;
            }
        },
        tasks(tasks = defaultState.tasks, action) {
            switch(action.type) {
                case mutations.CREATE_TASK:
                    return [...tasks, {
                        id:action.taskId,
                        name:"New Task",
                        group:action.groupId,
                        owner:action.ownerId,
                        isComplete:false
                    }];
                case mutations.SET_TASK_COMPLETE:
                    return tasks.map(task=>{
                        return (task.id == action.taskId)
                            ? {...task, isComplete: action.isComplete}
                            : task;
                    });
                case mutations.SET_TASK_NAME:
                    return tasks.map(task=>{
                        return (task.id == action.taskId)
                            ? {...task, name: action.name}
                            : task;
                    });
                case mutations.SET_TASK_GROUP:
                    return tasks.map(task=>{
                        return (task.id == action.taskId)
                            ? {...task, group: action.groupId}
                            : task;
                    });
            }
            return tasks;
        },
        comments(comments = defaultState.comments) {
            return comments;
        },
        groups(groups = defaultState.groups) {
            return groups;
        },
        users(users = defaultState.users) {
            return users;
        }
    }),
    applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
    // Importing from mock sagas gives an object (or array?) holding
    // all sagas. Then iterating through those with for each loop
    // returns just a name of the saga, but not the saga itself?!
    // Gotta love javascript. 
    sagaMiddleware.run(sagas[saga])
}