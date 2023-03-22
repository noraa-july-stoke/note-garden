import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/Routes/HomePage";
import FeedPage from "./components/Routes/FeedPage";
import ImageUploadForm from './components/Forms/ImageUploadForm';
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
    <div className="app-container">
      <Navigation isLoaded={isLoaded} />
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              isLoaded && (
                <HomePage sessionUser={sessionUser} bgColor={bgColor} />
              )
            }
          />
          <Route
            path="feed"
            element={
              sessionUser && (
                <FeedPage sessionUser={sessionUser} bgColor={bgColor} />
              )
            }
          />
          <Route path="test" element={              isLoaded && (
                <ImageUploadForm />
              )}/>
        </Route>
      </Routes>
    </div>
  );
}
export default App;
