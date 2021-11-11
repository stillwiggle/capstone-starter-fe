import { applyMiddleware, createStore } from "redux";
import createRootReducer from "./reducers";

import { createBrowserHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();

export default function configureStore(initialState) {
  return createStore(
    createRootReducer(history),
    initialState,
    composeWithDevTools(
        applyMiddleware(
          routerMiddleware(history)
        )
    )
  );
}
