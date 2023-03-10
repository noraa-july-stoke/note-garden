import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from './session';
import uploadReducer from "./uploads";
import notesReducer from "./notes";
import collaborationsReducer from "./collaborations";
import commentsReducer from "./comments";
import notebooksReducer from "./notebooks";
import palsReducer from "./pals";
import postsReducer from "./posts";
import reactionsReducer from "./reactions";

const rootReducer = combineReducers({
  session: sessionReducer,
  uploads: uploadReducer,
  notes: notesReducer,
  notebooks: notebooksReducer,
  collaborations: collaborationsReducer,
  comments: commentsReducer,
  pals: palsReducer,
  posts: postsReducer,
  reactions: reactionsReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
