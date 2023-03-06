import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ImageUploadForm from "./components/Forms";
import TextEditor from "./components/TextEditor";
import UserNotebooks from "./components/UserNotebooks";
import HomePage from "./components/HomePage";
import './index.css';
import { ColorContext } from "./context/ColorContext";

function App() {
  const { bgColor } = useContext(ColorContext)
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (!sessionUser && isLoaded) {
      history.push('/');
    }
  }, [sessionUser]);

  return (
    <div className="app-container" style={{ backgroundColor: bgColor }}>
      <Switch>
        <Route path="/">
          <Navigation isLoaded={isLoaded} />
        </Route>
      </Switch>
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <HomePage sessionUser={sessionUser} />
              {/* <ImageUploadForm /> */}
          </Route>
          <Route path='/new-note'>
            <TextEditor note={false} standalone={true} bgColor={bgColor} />
          </Route>
          <Route path='/notebooks'>
            <UserNotebooks />
          </Route>
        </Switch>
      )}
    </div>

  );
}
export default App;
