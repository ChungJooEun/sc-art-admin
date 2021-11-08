import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import LoginView from "./components/common/LoginView";
import DashBoardView from "./components/dashboard/DashBoardView";

const App = () => {
  return (
    <Switch>
      {/* 홈 */}
      <Route path="/" exact={true}>
        <DashBoardView />
      </Route>
      <Route path="/dashboard">
        <DashBoardView />
      </Route>

      {/* 로그인 */}
      <Route path="/common/login">
        <LoginView />
      </Route>
    </Switch>
  );
};

export default App;
