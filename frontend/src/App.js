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

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Switch>
        <Route path="/">
          <Navigation isLoaded={isLoaded} />
        </Route>
      </Switch>
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <ImageUploadForm />
          </Route>
          <Route path="/test">
            <TestComponent/>
          </Route>
          <Route path="/post">
            <SinglePostPage/>
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
            <TextEditor/>
          </Route>
          <Route path='/notebooks'>
            <UserNotebooks/>
          </Route>
          <Route path='/edit-note/:noteId'>
            <TextEditor/>
          </Route>
        </Switch>
      )}
    </>
  );
}
export default App;
