import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ImageUploadForm from "./components/Forms";
import TextEditor from "./components/TextEditor";
import AllNotes from "./components/NotesComponents/AllNotes";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <ImageUploadForm/>
          </Route>
          <Route path='/all-notes'>
            <AllNotes />
            <TextEditor/>
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
