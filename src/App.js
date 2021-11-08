import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import LoginView from "./components/common/LoginView";

const App = () => {
  return (
    <Switch>
      {/* 로그인 */}
      <Route path="/" exact={true}>
        <LoginView />
      </Route>
      <Route path="/common/login">
        <LoginView />
      </Route>

      <Route path="/dashboard"></Route>
    </Switch>
  );
};

export default App;
