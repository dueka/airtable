import createSagaMiddleware from "@redux-saga/core";
import {
  Action,
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";
import studentReducer from "./ducks/students";
import { watcherSaga } from "./sagas/rootSaga";

const appReducer = combineReducers({
  students: studentReducer,
});

const LOGOUT = "LOGOUT";
export const logoutUser = () => ({ type: LOGOUT });

const rootReducer = (state: any, action: Action) => {
  if (action.type === "LOGOUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    typeof window === "object" &&
      typeof (window as any).__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      : (f: any) => f
  )
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(watcherSaga);

export default store;
