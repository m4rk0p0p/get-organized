import { createStore, applyMiddleware } from "redux";
import { defaultState } from "../../server/defaultState";
import { createLogger } from "redux-logger";
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
import * as sagas from "./sagas.mock";

export const store = createStore(
    function reducer(state = defaultState, action) {
        return state;
    },
    applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
    // Importing from mock sagas gives an object (or array?) holding
    // all sagas. Then iterating through those with for each loop
    // returns just a name of the saga, but not the saga itself?!
    // Gotta love javascript.
    sagaMiddleware.run(sagas[saga])
}