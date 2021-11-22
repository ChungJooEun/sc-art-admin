import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginView from "./components/common/LoginView";
import AddRelatedSiteView from "./components/community/AddRelatedSiteView";
import BoardView from "./components/community/BoardView";
import PressReleaseBoard from "./components/community/PressReleaseBoard";
import RelatedSitesView from "./components/community/RelatedSitesView";
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
import PlaceDetailView from "./components/place/PlaceDetailView";
import PlaceListView from "./components/place/PlaceListView";
import PlaceManageView from "./components/place/PlaceManageView";
import ScPlaceView from "./components/place/ScPlaceView";
import UserListView from "./components/user/UserListView";
import UserDetailView from "./components/user/UserDetailView";
import UserDetailEditView from "./components/user/UserDetailEditView";
import AdminManageView from "./components/admin/AdminManageView";
import AdminDetailView from "./components/admin/AdminDetailView";
import AddAdminView from "./components/admin/AddAdminView";
import AddBoardView from "./components/community/AddBoardView";
import EditorTest from "./components/basic-components/editor-components/EditorTest";
import AddScFestivalView from "./components/event/AddScFestivalView";
import { MenuProvier } from "./context/menu";
import ScFestivalDetailView from "./components/event/ScFestivalDetailView";

const addPostOptions = [
  { value: "TEMP_SAVE", name: "임시저장" },
  { value: "POST", name: "게시" },
  { value: "PRIVATE", name: "비공개" },
];

const detailViewPostOptions = [
  { value: "TEMP_SAVE", name: "임시저장" },
  { value: "POST", name: "게시" },
  { value: "PRIVATE", name: "비공개" },
  { value: "REJECT", name: "기각" },
  { value: "WAIT", name: "대기중" },
];

const waitingPostOptions = [
  { value: "WAIT", name: "대기중" },
  { value: "POST", name: "게시" },
  { value: "REJECT", name: "기각" },
];

const noticeBoardPagePathList = [
  {
    pageUrl: "/dashboard",
    pageName: "홈",
  },
  {
    pageUrl: "/community/notice-board",
    pageName: "공지사항",
  },
];

const eventBoardPagePathList = [
  {
    pageUrl: "/dashboard",
    pageName: "이벤트",
  },
  {
    pageUrl: "/community/event-board",
    pageName: "문화계 소식",
  },
];

const newsBoardPagePathList = [
  {
    pageUrl: "/dashboard",
    pageName: "홈",
  },
  {
    pageUrl: "/community/news-board",
    pageName: "문화계 소식",
  },
];

const AppProvider = ({ contexts, children }) =>
  contexts.reduce(
    (prev, context) =>
      React.createElement(context, {
        children: prev,
      }),
    children
  );

const App = () => {
  return (
    <AppProvider contexts={[MenuProvier]}>
      <Switch>
        {/* 대시보드 */}
        <Route path="/" exact={true}>
          <LoginView /> {/* 추후에 login page로 변경 */}
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
          <EventListView pageTitle="전시" type="exhibition" />
        </Route>
        {/* 문화행사 관리 > 문화행사 > 공연 */}
        <Route path="/event/festival-list">
          <EventListView pageTitle="공연" type="show" />
        </Route>
        {/* 문화행사 관리 > 문화행사 > 기타 */}
        <Route path="/event/event-others-list">
          <EventListView pageTitle="기타" type="other" />
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
          <ApplicationList
            tableTitle="문화행사"
            Table={ModifiableEventList}
            type="event"
          />
        </Route>
        {/* 문화행사 관리 > 문화행사 상세조회 */}

        <Route
          path="/event/event-detail/:id"
          component={(props) => (
            <EventDetailView options={detailViewPostOptions} {...props} />
          )}
        />

        {/* 문화행사 관리 > 등록신청 문화행사 상세조회 */}
        <Route
          path="/event/event-application-detail/:id"
          component={(props) => (
            <EventDetailView options={waitingPostOptions} {...props} />
          )}
        />

        <Route
          path="/event/add-seocho-festival"
          component={(props) => <AddScFestivalView {...props} />}
        />

        <Route
          path="/event/seocho-festival-detail/:id"
          component={(props) => <ScFestivalDetailView {...props} />}
        />

        <Route path="/sc-modal">
          <AddScFestivalView />
        </Route>

        {/* 문화공간 관리 > 문화공간 */}
        <Route path="/place/place-manage">
          <PlaceManageView />
        </Route>
        {/* 문화공간 관리 > 공연장 */}
        <Route path="/place/concert-hall-list">
          <PlaceListView pageTitle="공연장" type="hall" />
        </Route>
        {/* 문화공간 관리 > 연습실 */}
        <Route path="/place/practice-list">
          <PlaceListView pageTitle="연습실" type="practice" />
        </Route>
        {/* 문화공간 관리 > 악기상점 */}
        <Route path="/place/musical-instrument-shop">
          <PlaceListView pageTitle="악기상점" type="instrument" />
        </Route>
        {/* 문화공간 관리 > 갤러리 */}
        <Route path="/place/gallery-list">
          <PlaceListView pageTitle="갤러리" type="gallery" />
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
          <ApplicationList
            tableTitle="문화공간"
            Table={ModifiablePlaceList}
            type="space"
          />
        </Route>

        {/* 문화공간 관리 > 문화공간 상세조회 */}
        <Route
          path="/place/place-detail/:id"
          component={(props) => (
            <PlaceDetailView options={detailViewPostOptions} {...props} />
          )}
        />
        {/* 문화공간 관리 > 등록 신청한 문화공간 상세조회 */}
        <Route
          path="/place/place-application-detail/:id"
          component={(props) => (
            <PlaceDetailView options={waitingPostOptions} {...props} />
          )}
        />

        {/* 커뮤니티 > 공지사항 */}
        <Route path="/community/notice-board">
          <BoardView
            pageTitle="공지사항"
            addPostUrl="/community/add-notice-board"
          />
        </Route>
        {/* 커뮤니티 > 이벤트 */}
        <Route path="/community/event-board">
          <BoardView
            pageTitle="이벤트"
            addPostUrl="/community/add-event-board"
          />
        </Route>
        {/* 커뮤니티 > 문화계 소식 */}
        <Route path="/community/news-board">
          <BoardView
            pageTitle="문화계 소식"
            addPostUrl="/community/add-news-board"
          />
        </Route>
        {/* 커뮤니티 > 보도자료 */}
        <Route path="/community/press-release">
          <PressReleaseBoard />
        </Route>

        {/* 커뮤니티 > 공지사항 소식 추가 */}
        <Route path="/community/add-notice-board">
          <AddBoardView pagePathList={noticeBoardPagePathList} />
        </Route>
        {/* 커뮤니티 > 이벤트 소식 추가 */}
        <Route path="/community/add-event-board">
          <AddBoardView pagePathList={eventBoardPagePathList} />
        </Route>
        {/* 커뮤니티 > 문화계 소식 추가 */}
        <Route path="/community/add-news-board">
          <AddBoardView pagePathList={newsBoardPagePathList} />
        </Route>

        {/* 커뮤니티 > 공지사항 상세조회 */}
        <Route path="/community/notice-board-detail">
          <AddBoardView pagePathList={noticeBoardPagePathList} />
        </Route>
        {/* 커뮤니티 > 이벤트 상세조회 */}
        <Route path="/community/event-board-detail">
          <AddBoardView pagePathList={eventBoardPagePathList} />
        </Route>
        {/* 커뮤니티 > 문화계 상세조회 */}
        <Route path="/community/news-board-detail">
          <AddBoardView pagePathList={newsBoardPagePathList} />
        </Route>

        {/* 문화 파트너스 > 문화 파트너스 */}
        <Route path="/related-sites/related-sites">
          <RelatedSitesView />
        </Route>
        {/* 문화 파트너스 > 문화 파트너스 추가 */}
        <Route path="/related-sites/add-related-sites">
          <AddRelatedSiteView />
        </Route>
        {/* 문화 파트너스 > 문화 파트너스 수정 */}
        <Route path="/related-sites/edit-related-sites">
          <AddRelatedSiteView />
        </Route>

        {/* 사용자 */}
        <Route path="/user/user-list">
          <UserListView />
        </Route>
        {/* 사용자 상세조회 */}
        <Route path="/user/user-detail">
          <UserDetailView />
        </Route>
        {/* 사용자 정보 수정 */}
        <Route path="/user/user-detail-edit">
          <UserDetailEditView />
        </Route>

        {/* 관리자 조회 */}
        <Route path="/admin/admin-manage">
          <AdminManageView />
        </Route>
        {/* 관리자 상세조회 */}
        <Route path="/admin/admin-account-detail">
          <AdminDetailView />
        </Route>
        {/* 관리자 추가 */}
        <Route path="/admin/add-admin-account">
          <AddAdminView />
        </Route>
        {/* 관리자 수정 */}
        <Route path="/admin/admin-account-edit">
          <AddAdminView />
        </Route>

        {/* 로그인 */}
        <Route
          path="/common/login"
          component={(props) => <LoginView {...props} />}
        />

        <Route path="/editor">
          <EditorTest />
        </Route>

        <Route component={() => <h2>Page Not Found</h2>} />
      </Switch>
    </AppProvider>
  );
};

export default App;
