import React from "react";
import "./App.css";

import MainContainer from "./Components/mainContainer.jsx";

import Login from "./Components/Login.jsx";
import { Route, Routes } from "react-router-dom";
import Welcome from "./Components/Welcome.jsx";
import ChatArea from "./Components/chatArea.jsx";
import Users from "./Components/Users.jsx";
import CreateGroups from "./Components/createGroups.jsx";
import Groups from "./Components/group.jsx";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);
  return (
    <div className={"App" + (lightTheme ? "" : "-dark")}>
      {/* <MainContainer /> */}
      {/* <Login /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="app" element={<MainContainer />}>
          <Route path="welcome" element={<Welcome />}></Route>
          <Route path="chat/:_id" element={<ChatArea />}></Route>
          <Route path="users" element={<Users />}></Route>
          <Route path="groups" element={<Groups />}></Route>
          <Route path="create-groups" element={<CreateGroups />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;