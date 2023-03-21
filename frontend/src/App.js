import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/Routes/HomePage";
import "./index.css";
import { ColorContext } from "./context/ColorContext";


function App() {
  const { bgColor } = useContext(ColorContext);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="app-container" style={{ backgroundColor: bgColor }}>
      <Switch>
        <Route path="/">
          <Navigation isLoaded={isLoaded} />
        </Route>
      </Switch>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage sessionUser={sessionUser} bgColor={bgColor} />
          </Route>
          <Route path="/feed">
            {/* <PostFeed /> */}
          </Route>
        </Switch>
      )}
    </div>
  );
}
export default App;
