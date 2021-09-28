import { take, put, select } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import * as mutations from './mutations';

const url = "http://localhost:7777";

export function* taskCreationSaga() {
    while (true) {
        const {groupId} = yield take(mutations.REQUEST_TASK_CREATION);
        const ownerId = `U1`;
        const taskId = uuidv4();
        yield put(mutations.createTask(taskId, groupId, ownerId));
        
        const { res } = yield axios.post(url + "/task/new", {
            task:{
                id: taskId,
                group: groupId,
                owner: ownerId,
                isComplete: false,
                name: "New Task"
            }
        });

        console.info("Got response after creation:", res);
    }
}

export function* taskModificationSaga() {
    while (true) {
        const tsk = yield take([
            mutations.SET_TASK_GROUP,
            mutations.SET_TASK_NAME,
            mutations.SET_TASK_COMPLETE
        ]);
        console.info("Got task with ID:", tsk.taskId);
        const { res } = yield axios.post(url + "/task/update", {
            task:{
                id: tsk.taskId,
                group: tsk.groupId,
                isComplete: tsk.isComplete,
                name: tsk.name
            }
        });

        console.info("Got response after update:", res);
    }
}