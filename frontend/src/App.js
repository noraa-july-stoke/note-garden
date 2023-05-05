//============================================================================
//  ██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗
//  ██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝
//  ██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗
//  ██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝
//  ╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗
//   ╚══╝╚══╝ ╚═════████████╗╝██████╗╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝
//                  ╚══██╔══╝██╔═══██╗
//                     ██║   ██║   ██║
//                     ██║   ██║   ██║
//                     ██║   ╚██████╔╝
//      ███╗   ██╗ ██████╗ ████████╗███████╗
//      ████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝
//      ██╔██╗ ██║██║   ██║   ██║   █████╗█████╗
//      ██║╚██╗██║██║   ██║   ██║   ██╔══╝╚════╝
//      ██║ ╚████║╚██████╔╝   ██║   ███████╗
//      ╚═╝  ██████╗══█████╗ ██████╗╚██████╗ ███████╗███╗   ██╗
//          ██╔════╝ ██╔══██╗██╔══██╗██╔══██╗██╔════╝████╗  ██║
//          ██║  ███╗███████║██████╔╝██║  ██║█████╗  ██╔██╗ ██║
//          ██║   ██║██╔══██║██╔══██╗██║  ██║██╔══╝  ██║╚██╗██║
//          ╚██████╔╝██║  ██║██║  ██║██████╔╝███████╗██║ ╚████║
//           ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═══╝
//=============================================================================
//                                                                   ◎     ◎
//        ╔═╗┌─┐┌─┐  ╔╗ ┬ ┬  ╔╗╔┌─┐┬─┐┌─┐┌─┐  ╔═╗┌┬┐┌─┐┬┌─┌─┐         \   /
//        ╠═╣├─┘├─┘  ╠╩╗└┬┘  ║║║│ │├┬┘├─┤├─┤  ╚═╗ │ │ │├┴┐├┤        o(👁 👁)o
//        ╩ ╩┴  ┴    ╚═╝ ┴   ╝╚╝└─┘┴└─┴ ┴┴ ┴  ╚═╝ ┴ └─┘┴ ┴└─┘       🦾  🫦  🤳
//         React ^ 18.2.0,  React Router ^6.9.0, Dockerized           /  \
//                                                                   🛼   🛼
//=============================================================================

import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/Routes/HomePage";
import FeedPage from "./components/Routes/FeedPage";
import Dashboard from "./components/Routes/Dashboard";
import ImageUploadForm from "./components/Forms/ImageUploadForm";
import NewPost from "./components/NewPost";
import "./index.css";
import { ColorContext } from "./context/ColorContext";

function App() {
  //=============================================================================
  // Variable Declarations, state variable assignments;
  //=============================================================================
  const { bgColor } = useContext(ColorContext);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  //=============================================================================
  // Hooks
  //=============================================================================

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  //=============================================================================
  // Helpers
  //=============================================================================

  //=============================================================================
  //   __  __      __  __      ___   _____     __  ___     __  ___ __  ___ __
  //  /  `/  \|\/||__)/  \|\ ||__ |\ ||/__`   |__)|__ |\ ||  \|__ |__)|__ |  \
  //  \__,\__/|  ||   \__/| \||___| \||.__/   |  \|___| \||__/|___|  \|___|__/
  //             ___ __  ___                    __  ___
  //        |__||__ |__)|__    |  |||   |      |__)|__    ||\ |
  //        |  ||___|  \|___   |/\|||___|___   |__)|___   || \|
  //            __  __    ______ __     _____      __  ___ __
  //           |__)/  \|  |||__ /__`   |__/  \|   |  \|__ |__)
  //           |  \\__/\__/||___.__/   |  \__/|___|__/|___|  \
  //=============================================================================

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
          <Route path="test" element={isLoaded && <NewPost />} />
        </Route>
        <Route
          path="dashboard"
          element={
            sessionUser && (
              <Dashboard sessionUser={sessionUser} bgColor={bgColor} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
