import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import LoginView from "./components/common/LoginView";
import DashBoardView from "./components/dashboard/DashBoardView";
import AddEventView from "./components/event/AddEventView";
import ApplicationList from "./components/event/ApplicationList";
import ModifiableEventList from "./components/event/event-components/ModifiableEventList";
import EventDetailView from "./components/event/EventDetailView";
import EventListView from "./components/event/EventListView";
import EventManageView from "./components/event/EventManageView";
import ScEventListView from "./components/event/ScEventListView";
import RecommendedListView from "./components/main-design/RecommendedListView";
import SkinAndBannerDesignView from "./components/main-design/SkinAndBannerDesignView";
import AddPlaceView from "./components/place/AddPlaceView";
import ModifiablePlaceList from "./components/place/place-components/ModifiablePlaceList";
import PlaceListView from "./components/place/PlaceListView";
import PlaceManageView from "./components/place/PlaceManageView";
import ScPlaceView from "./components/place/ScPlaceView";

const addPostOptions = [
  { value: 1, name: "임시저장" },
  { value: 2, name: "게시" },
  { value: 3, name: "비공개" },
];

const waitingPostOptions = [
  { value: 1, name: "대기중" },
  { value: 2, name: "게시" },
  { value: 3, name: "기각" },
];

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

      {/* 문화행사 관리 > 문화행사 */}
      <Route path="/event/event-manage">
        <EventManageView />
      </Route>
      {/* 문화행사 관리 > 문화행사 > 전시 */}
      <Route path="/event/exhibit-list">
        <EventListView pageTitle="전시" />
      </Route>
      {/* 문화행사 관리 > 문화행사 > 공연 */}
      <Route path="/event/festival-list">
        <EventListView pageTitle="공연" />
      </Route>
      {/* 문화행사 관리 > 문화행사 > 기타 */}
      <Route path="/event/event-others-list">
        <EventListView pageTitle="기타" />
      </Route>
      {/* 문화행사 관리 > 서초구 축제 */}
      <Route path="/event/seocho-festival">
        <ScEventListView />
      </Route>
      {/* 문화행사 관리 > 문화행사 등록하기 */}
      <Route path="/event/add-event">
        <AddEventView options={addPostOptions} />
      </Route>
      {/* 문화행사 관리 > 등록 신청 리스트 */}
      <Route path="/event/event-application-list">
        <ApplicationList tableTitle="문화행사" Table={ModifiableEventList} />
      </Route>
      {/* 문화행사 관리 > 문화행사 상세조회 */}
      <Route path="/event/event-detail">
        <EventDetailView options={addPostOptions} isApproved={true} />
      </Route>
      {/* 문화행사 관리 > 등록신청 문화행사 상세조회 */}
      <Route path="/event/event-application-detail">
        <EventDetailView options={waitingPostOptions} isApproved={false} />
      </Route>

      {/* 문화공간 관리 > 문화공간 */}
      <Route path="/place/place-manage">
        <PlaceManageView />
      </Route>
      {/* 문화공간 관리 > 공연장 */}
      <Route path="/place/concert-hall-list">
        <PlaceListView pageTitle="공연장" />
      </Route>
      {/* 문화공간 관리 > 연습실 */}
      <Route path="/place/practice-list">
        <PlaceListView pageTitle="연습실" />
      </Route>
      {/* 문화공간 관리 > 악기상점 */}
      <Route path="/place/musical-instrument-shop">
        <PlaceListView pageTitle="악기상점" />
      </Route>
      {/* 문화공간 관리 > 갤러리 */}
      <Route path="/place/gallery-list">
        <PlaceListView pageTitle="갤러리" />
      </Route>

      {/* 문화공간 관리 > 서리풀 청년아트 센터 */}
      <Route path="/place/scplace-art-center">
        <ScPlaceView pageTitle="서리풀 청년아트 센터" />
      </Route>
      {/* 문화공간 관리 > 서리풀 청년아트 갤러리 */}
      <Route path="/place/scplace-art-gallery">
        <ScPlaceView pageTitle="서리풀 청년아트 갤러리" />
      </Route>
      {/* 문화공간 관리 > 문화공간 등록하기 */}
      <Route path="/place/add-place">
        <AddPlaceView options={addPostOptions} />
      </Route>

      {/* 문화공간 관리 > 등록 신청 리스트 */}
      <Route path="/place/place-application-list">
        <ApplicationList tableTitle="문화공간" Table={ModifiablePlaceList} />
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
