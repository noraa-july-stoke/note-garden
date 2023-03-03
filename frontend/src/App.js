import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ImageUploadForm from "./components/Forms";
import TextEditor from "./components/TextEditor";
import AllNotes from "./components/NotesComponents/AllNotes";
import SingleNotePage from "./components/NotesComponents/SingleNotePage";
import TestComponent from "./components/TestComponent/TestComponent";
import SinglePostPage from "./components/PostComponents/SinglePostPage";
import Dashboard from "./components/UserDashboard";
import UserNotebooks from "./components/UserNotebooks";
import './index.css';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="app-container">
      <Switch>
        <Route path="/">
          <Navigation isLoaded={isLoaded} />
        </Route>
      </Switch>
      {isLoaded && (
        <div className="app-body-container">
        <Switch>
          <Route exact path='/'>
            {/* landing page */}
            {/* <ImageUploadForm /> */}
          </Route>
          <Route path="/test">
            <TestComponent />
          </Route>
          <Route path="/post">
            <SinglePostPage />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path='/all-notes'>
            <AllNotes />
          </Route>
          <Route path='/text-notes/:noteId'>
            <SingleNotePage />
          </Route>
          <Route path='/new-note'>
            <TextEditor note={false} />
          </Route>
          <Route path='/notebooks'>
            <UserNotebooks />
          </Route>
        </Switch>
        </div>
      )}
    </div>
  );
}
export default App;
