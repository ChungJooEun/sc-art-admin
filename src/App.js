import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import LoginView from "./components/common/LoginView";
import DashBoardView from "./components/dashboard/DashBoardView";
import RecommendedListView from "./components/main-design/RecommendedListView";
import SkinAndBannerDesignView from "./components/main-design/SkinAndBannerDesignView";

const App = () => {
  return (
    <Switch>
      {/* 대시보드 */}
      <Route path="/" exact={true}>
        <DashBoardView /> {/* 추후에 login page로 변경 */}
      </Route>
      <Route path="/dashboard">
        <DashBoardView />
      </Route>

      {/* 메인 디자인 관리 > 메인 배너&스킨 관리 */}
      <Route path="/main-design/skin-and-banner-design">
        <SkinAndBannerDesignView />
      </Route>

      {/* 메인 디자인 관리 > 추천 문화행사 리스트 */}
      <Route path="/main-design/recommend-event">
        <RecommendedListView />
      </Route>
      {/* 메인 디자인 관리 > 추천 문화행사 리스트 */}
      <Route path="/main-design/recommend-place">
        <RecommendedListView />
      </Route>

      {/* 로그인 */}
      <Route path="/common/login">
        <LoginView />
      </Route>

      <Route component={() => <h2>Page Not Found</h2>} />
    </Switch>
  );
};

export default App;
