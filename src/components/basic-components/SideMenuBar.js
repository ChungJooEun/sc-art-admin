import React from "react";
import { Link } from "react-router-dom";

const SideMenuBar = React.memo(() => {
  return (
    <div
      className="mdk-drawer js-mdk-drawer"
      id="default-drawer"
      style={{ width: "255px" }}
    >
      <div
        className=""
        style={{ height: "100%", position: "fixed", width: "inherit" }}
      >
        <div
          className="sidebar sidebar-dark sidebar-left"
          data-perfect-scrollbar
        >
          <Link to="/dashboard" className="sidebar-brand ">
            <img
              className="sidebar-brand-icon"
              src="../assets/images/logo-w.png"
              alt=""
            />
          </Link>

          <div className="sidebar-heading">Seocho Admin</div>
          <ul className="sidebar-menu">
            <li className="sidebar-menu-item active">
              <Link className="sidebar-menu-button" to="/dashboard">
                <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                  insert_chart_outlined
                </span>
                <span className="sidebar-menu-text">대시보드</span>
              </Link>
            </li>
            <li className="sidebar-menu-item">
              <a
                className="sidebar-menu-button"
                data-toggle="collapse"
                href="#dashboards_menu"
              >
                <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                  photo_size_select_large
                </span>
                메인 디자인 관리{" "}
                <span className="ml-auto sidebar-menu-toggle-icon"></span>
              </a>
              <ul
                className="sidebar-submenu collapse sm-indent"
                id="dashboards_menu"
              >
                <li className="sidebar-menu-item">
                  <Link
                    className="sidebar-menu-button"
                    to="/main-design/skin-and-banner-design"
                  >
                    <span className="sidebar-menu-text">
                      메인 배너&스킨 관리
                    </span>
                  </Link>
                </li>
                <li className="sidebar-menu-item">
                  <Link
                    className="sidebar-menu-button"
                    to="/main-design/recommend-event"
                  >
                    <span className="sidebar-menu-text">
                      추천 문화행사 리스트
                    </span>
                  </Link>
                </li>
                <li className="sidebar-menu-item">
                  <Link
                    className="sidebar-menu-button"
                    to="/main-design/recommend-place"
                  >
                    <span className="sidebar-menu-text">
                      추천 문화공간 리스트
                    </span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="sidebar-menu-item">
              <a
                className="sidebar-menu-button js-sidebar-collapse"
                data-toggle="collapse"
                href="#enterprise_menu"
              >
                <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                  event_note
                </span>
                문화행사 관리
                <span className="ml-auto sidebar-menu-toggle-icon"></span>
              </a>
              <ul
                className="sidebar-submenu collapse sm-indent"
                id="enterprise_menu"
              >
                <li className="sidebar-menu-item">
                  <Link
                    className="sidebar-menu-button"
                    to="/event/event-manage"
                  >
                    <span className="sidebar-menu-text">문화행사</span>
                  </Link>
                </li>

                <li className="sidebar-menu-item">
                  <Link
                    className="sidebar-menu-button"
                    to="/event/exhibit-list"
                  >
                    <span className="sidebar-menu-text">- 전시</span>
                  </Link>
                </li>
                <li className="sidebar-menu-item">
                  <Link
                    className="sidebar-menu-button"
                    to="/event/festival-list"
                  >
                    <span className="sidebar-menu-text">- 공연</span>
                  </Link>
                </li>
                <li className="sidebar-menu-item">
                  <Link
                    className="sidebar-menu-button"
                    to="/event/event-others-list"
                  >
                    <span className="sidebar-menu-text">- 기타</span>
                  </Link>
                </li>
                <li className="sidebar-menu-item">
                  <Link
                    className="sidebar-menu-button"
                    to="/event/seocho-festival"
                  >
                    <span className="sidebar-menu-text">서초구 축제</span>
                  </Link>
                </li>
                <li className="sidebar-menu-item">
                  <Link className="sidebar-menu-button" to="/event/add-event">
                    <span className="sidebar-menu-text">문화행사 등록하기</span>
                  </Link>
                </li>
                <li className="sidebar-menu-item">
                  <Link
                    className="sidebar-menu-button"
                    to="/event/event-application-list"
                  >
                    <span className="sidebar-menu-text">등록 신청 리스트</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="sidebar-menu-item">
              <a
                className="sidebar-menu-button"
                data-toggle="collapse"
                href="#productivity_menu"
              >
                <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                  place
                </span>
                문화공간 관리
                <span className="ml-auto sidebar-menu-toggle-icon"></span>
              </a>
              <ul
                className="sidebar-submenu collapse show sm-indent"
                id="productivity_menu"
              >
                <li className="sidebar-menu-item">
                  <Link
                    className="sidebar-menu-button"
                    to="/place/place-manage"
                  >
                    <span className="sidebar-menu-text">문화공간</span>
                  </Link>
                </li>

                <li className="sidebar-menu-item">
                  <Link
                    className="sidebar-menu-button"
                    to="/place/concert-hall-list"
                  >
                    <span className="sidebar-menu-text">- 공연장</span>
                  </Link>
                </li>
                <li className="sidebar-menu-item">
                  <Link
                    className="sidebar-menu-button"
                    to="/place/practice-list"
                  >
                    <span className="sidebar-menu-text">- 연습실</span>
                  </Link>
                </li>
                <li className="sidebar-menu-item">
                  <Link
                    className="sidebar-menu-button"
                    to="/place/musical-instrument-shop"
                  >
                    <span className="sidebar-menu-text">- 악기상점</span>
                  </Link>
                </li>
                <li className="sidebar-menu-item">
                  <Link
                    className="sidebar-menu-button"
                    to="/place/gallery-list"
                  >
                    <span className="sidebar-menu-text">- 갤러리</span>
                  </Link>
                </li>
                <li className="sidebar-menu-item">
                  <Link
                    className="sidebar-menu-button"
                    to="/place/scplace-art-center"
                  >
                    <span className="sidebar-menu-text">
                      서리풀 청년아트 센터
                    </span>
                  </Link>
                </li>
                <li className="sidebar-menu-item">
                  <Link
                    className="sidebar-menu-button"
                    to="/place/scplace-art-gallery"
                  >
                    <span className="sidebar-menu-text">
                      서리풀 청년아트 갤러리
                    </span>
                  </Link>
                </li>
                <li className="sidebar-menu-item">
                  <Link className="sidebar-menu-button" to="/place/add-place">
                    <span className="sidebar-menu-text">문화공간 등록하기</span>
                  </Link>
                </li>
                <li className="sidebar-menu-item">
                  <Link
                    className="sidebar-menu-button"
                    to="/place/place-application-list"
                  >
                    <span className="sidebar-menu-text">등록 신청 리스트</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="sidebar-menu-item">
              <a
                className="sidebar-menu-button"
                data-toggle="collapse"
                href="#community_menu"
              >
                <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                  comment
                </span>
                커뮤니티
                <span className="ml-auto sidebar-menu-toggle-icon"></span>
              </a>
              <ul
                className="sidebar-submenu collapse show sm-indent"
                id="community_menu"
              >
                <li className="sidebar-menu-item">
                  <Link
                    className="sidebar-menu-button"
                    to="/community/notice-board"
                  >
                    <span className="sidebar-menu-text">공지사항</span>
                  </Link>
                </li>
                <li className="sidebar-menu-item">
                  <Link
                    className="sidebar-menu-button"
                    to="/community/event-board"
                  >
                    <span className="sidebar-menu-text">이벤트</span>
                  </Link>
                </li>
                <li className="sidebar-menu-item">
                  <Link
                    className="sidebar-menu-button"
                    to="/community/news-board"
                  >
                    <span className="sidebar-menu-text">문화계 소식</span>
                  </Link>
                </li>
                <li className="sidebar-menu-item">
                  <Link
                    className="sidebar-menu-button"
                    to="/community/press-release"
                  >
                    <span className="sidebar-menu-text">보도자료</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="sidebar-menu-item">
              <a
                className="sidebar-menu-button"
                data-toggle="collapse"
                href="#related-sites"
              >
                <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                  people
                </span>
                문화 파트너스
                <span className="ml-auto sidebar-menu-toggle-icon"></span>
              </a>
              <ul
                className="sidebar-submenu collapse show sm-indent"
                id="related-sites"
              >
                <li className="sidebar-menu-item">
                  <Link
                    className="sidebar-menu-button"
                    to="/related-sites/related-sites"
                  >
                    <span className="sidebar-menu-text">문화 파트너스</span>
                  </Link>
                </li>
                <li className="sidebar-menu-item">
                  <Link
                    className="sidebar-menu-button"
                    to="/related-sites/add-related-sites"
                  >
                    <span className="sidebar-menu-text">
                      문화 파트너스 추가
                    </span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="sidebar-menu-item">
              <Link className="sidebar-menu-button" to="/user/user-list">
                <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                  people
                </span>
                <span className="sidebar-menu-text">사용자</span>
              </Link>
            </li>
            <li className="sidebar-menu-item">
              <Link className="sidebar-menu-button" to="/admin/admin-manage">
                <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                  assignment_ind
                </span>
                <span className="sidebar-menu-text">관리자 관리</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
});

export default React.memo(SideMenuBar);
