import React from "react";

const SideMenuBar = () => {
  return (
    <div className="mdk-drawer js-mdk-drawer" id="default-drawer">
      <div className="mdk-drawer__content">
        <div
          className="sidebar sidebar-dark sidebar-left"
          data-perfect-scrollbar
        >
          <a
            onClick={() => (window.location.href = "/dashboard")}
            className="sidebar-brand "
          >
            <img
              className="sidebar-brand-icon"
              src="../assets/images/logo-w.png"
              alt=""
            />
          </a>

          <div className="sidebar-heading">Seocho Admin</div>
          <ul className="sidebar-menu">
            <li className="sidebar-menu-item active">
              <a
                className="sidebar-menu-button"
                onClick={() => (window.location.href = "/dashboard")}
              >
                <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                  insert_chart_outlined
                </span>
                <span className="sidebar-menu-text">대시보드</span>
              </a>
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
                  <a
                    className="sidebar-menu-button"
                    onClick={() =>
                      (window.location.href =
                        "/main-design/skin-and-banner-design")
                    }
                  >
                    <span className="sidebar-menu-text">
                      메인 배너&스킨 관리
                    </span>
                  </a>
                </li>
                <li className="sidebar-menu-item">
                  <a
                    className="sidebar-menu-button"
                    onClick={() =>
                      (window.location.href = "/main-design/recommend-event")
                    }
                  >
                    <span className="sidebar-menu-text">
                      추천 문화행사 리스트
                    </span>
                  </a>
                </li>
                <li className="sidebar-menu-item">
                  <a
                    className="sidebar-menu-button"
                    onClick={() =>
                      (window.location.href = "/main-design/recommend-place")
                    }
                  >
                    <span className="sidebar-menu-text">
                      추천 문화공간 리스트
                    </span>
                  </a>
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
                  <a
                    className="sidebar-menu-button"
                    onClick={() =>
                      (window.location.href = "/event/event-manage")
                    }
                  >
                    <span className="sidebar-menu-text">문화행사</span>
                  </a>
                </li>

                <li className="sidebar-menu-item">
                  <a
                    className="sidebar-menu-button"
                    onClick={() =>
                      (window.location.href = "/event/exhibit-list")
                    }
                  >
                    <span className="sidebar-menu-text">- 전시</span>
                  </a>
                </li>
                <li className="sidebar-menu-item">
                  <a
                    className="sidebar-menu-button"
                    onClick={() =>
                      (window.location.href = "/event/festival-list")
                    }
                  >
                    <span className="sidebar-menu-text">- 공연</span>
                  </a>
                </li>
                <li className="sidebar-menu-item">
                  <a
                    className="sidebar-menu-button"
                    onClick={() =>
                      (window.location.href = "/event/event-others-list")
                    }
                  >
                    <span className="sidebar-menu-text">- 기타</span>
                  </a>
                </li>
                <li className="sidebar-menu-item">
                  <a
                    className="sidebar-menu-button"
                    onClick={() =>
                      (window.location.href = "/event/seocho-festival")
                    }
                  >
                    <span className="sidebar-menu-text">서초구 축제</span>
                  </a>
                </li>
                <li className="sidebar-menu-item">
                  <a
                    className="sidebar-menu-button"
                    onClick={() => (window.location.href = "/event/add-event")}
                  >
                    <span className="sidebar-menu-text">문화행사 등록하기</span>
                  </a>
                </li>
                <li className="sidebar-menu-item">
                  <a
                    className="sidebar-menu-button"
                    onClick={() =>
                      (window.location.href = "/event/event-application-list")
                    }
                  >
                    <span className="sidebar-menu-text">등록 신청 리스트</span>
                  </a>
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
                  <a
                    className="sidebar-menu-button"
                    onClick={() =>
                      (window.location.href = "/place/place-manage")
                    }
                  >
                    <span className="sidebar-menu-text">문화공간</span>
                  </a>
                </li>

                <li className="sidebar-menu-item">
                  <a
                    className="sidebar-menu-button"
                    href="../place/concert-hall-list.html"
                  >
                    <span className="sidebar-menu-text">공연장</span>
                  </a>
                </li>
                <li className="sidebar-menu-item">
                  <a
                    className="sidebar-menu-button"
                    href="../place/practice-list.html"
                  >
                    <span className="sidebar-menu-text">연습실</span>
                  </a>
                </li>
                <li className="sidebar-menu-item">
                  <a
                    className="sidebar-menu-button"
                    href="../place/musical-instrument-shop.html"
                  >
                    <span className="sidebar-menu-text">악기상점</span>
                  </a>
                </li>
                <li className="sidebar-menu-item">
                  <a
                    className="sidebar-menu-button"
                    href="../place/gallery-list.html"
                  >
                    <span className="sidebar-menu-text">갤러리</span>
                  </a>
                </li>
                <li className="sidebar-menu-item">
                  <a
                    className="sidebar-menu-button"
                    href="../place/scplace-art-center.html"
                  >
                    <span className="sidebar-menu-text">
                      서리풀 청년아트 센터
                    </span>
                  </a>
                </li>
                <li className="sidebar-menu-item">
                  <a
                    className="sidebar-menu-button"
                    href="../place/scplace-art-gallery.html"
                  >
                    <span className="sidebar-menu-text">
                      서리풀 청년아트 갤러리
                    </span>
                  </a>
                </li>
                <li className="sidebar-menu-item">
                  <a
                    className="sidebar-menu-button"
                    onClick={() =>
                      (window.location.href = "/place/place-application-detail")
                    }
                  >
                    <span className="sidebar-menu-text">문화공간 등록하기</span>
                  </a>
                </li>
                <li className="sidebar-menu-item">
                  <a
                    className="sidebar-menu-button"
                    onClick={() =>
                      (window.location.href = "/place/place-application")
                    }
                  >
                    <span className="sidebar-menu-text">등록 신청 리스트</span>
                  </a>
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
                  <a
                    className="sidebar-menu-button"
                    href="../community/notice-board.html"
                  >
                    <span className="sidebar-menu-text">공지사항</span>
                  </a>
                </li>
                <li className="sidebar-menu-item">
                  <a
                    className="sidebar-menu-button"
                    href="../community/event-board.html"
                  >
                    <span className="sidebar-menu-text">이벤트</span>
                  </a>
                </li>
                <li className="sidebar-menu-item">
                  <a
                    className="sidebar-menu-button"
                    href="../community/news-board.html"
                  >
                    <span className="sidebar-menu-text">문화계 소식</span>
                  </a>
                </li>
                <li className="sidebar-menu-item">
                  <a
                    className="sidebar-menu-button"
                    href="../community/press-release.html"
                  >
                    <span className="sidebar-menu-text">보도자료</span>
                  </a>
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
                  <a
                    className="sidebar-menu-button"
                    href="../related-sites/related-sites.html"
                  >
                    <span className="sidebar-menu-text">문화 파트너스</span>
                  </a>
                </li>
                <li className="sidebar-menu-item">
                  <a
                    className="sidebar-menu-button"
                    href="../related-sites/add-related-sites.html"
                  >
                    <span className="sidebar-menu-text">
                      문화 파트너스 추가
                    </span>
                  </a>
                </li>
              </ul>
            </li>
            <li className="sidebar-menu-item">
              <a className="sidebar-menu-button" href="../user/user-list.html">
                <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                  people
                </span>
                <span className="sidebar-menu-text">사용자</span>
              </a>
            </li>
            <li className="sidebar-menu-item">
              <a
                className="sidebar-menu-button"
                href="../admin/admin-manage.html"
              >
                <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                  assignment_ind
                </span>
                <span className="sidebar-menu-text">관리자 관리</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideMenuBar;
