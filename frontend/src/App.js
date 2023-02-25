import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ImageUploadForm from "./components/Forms";
import TextEditor from "./components/TextEditor";
import AllNotes from "./components/NotesComponents/AllNotes";
import MakeNote from "./components/NotesComponents/MakeNote";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory()
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>

      <Switch>
        <Route path="/">
      <Navigation isLoaded={isLoaded}/>
        </Route>
      </Switch>
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <ImageUploadForm/>
          </Route>
          <Route path='/all-notes'>
            <AllNotes />
            {/* <MakeNote/> */}
            <TextEditor/>
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
