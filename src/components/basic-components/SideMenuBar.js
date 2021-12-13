import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuContext from "../../context/menu";

const SideMenuBar = React.memo(() => {
  const { actions, state } = useContext(MenuContext);

  const onSelectMenu = (topM, subM) => {
    actions.setMenu({
      topMenu: topM,
      subMenu: subM,
    });
  };

  const openSubMenu = (e) => {
    actions.setSubMenu({
      ...state.subMenu,
      [e.target.name]: true,
    });
  };

  const closeSubMenu = (e) => {
    actions.setSubMenu({
      ...state.subMenu,
      [e.target.name]: false,
    });
  };

  const movingInPage = (url) => {
    window.location.assign(
      `${url}?token=${window.sessionStorage.getItem("token")}`
    );
  };

  const [adminGroup, setAdminGroup] = useState();

  useEffect(() => {
    setAdminGroup(window.sessionStorage.getItem("adminGroup"));
  }, []);

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
          <Link
            to="/dashboard"
            className="sidebar-brand"
            onClick={() => onSelectMenu(0, 0)}
          >
            <img
              className="sidebar-brand-icon"
              src="../assets/images/logo-w.png"
              alt=""
            />
          </Link>

          <div className="sidebar-heading">Seocho Admin</div>
          <ul className="sidebar-menu">
            <li
              className={
                state.menu.topMenu === 0
                  ? "sidebar-menu-item active"
                  : "sidebar-menu-item"
              }
              onClick={() => onSelectMenu(0, 0)}
            >
              <Link
                className="sidebar-menu-button"
                to="/dashboard"
                onClick={() => onSelectMenu(0, 0)}
              >
                <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                  insert_chart_outlined
                </span>
                <span className="sidebar-menu-text">대시보드</span>
              </Link>
            </li>
            {adminGroup === "PARTNER" ? (
              ""
            ) : (
              <li
                className={
                  state.subMenu.topMenu1
                    ? state.menu.topMenu === 1
                      ? "sidebar-menu-item active open"
                      : "sidebar-menu-item open"
                    : state.menu.topMenu === 1
                    ? "sidebar-menu-item active"
                    : "sidebar-menu-item"
                }
              >
                <a
                  className="sidebar-menu-button collapsed"
                  name="topMenu1"
                  onClick={(e) =>
                    state.subMenu.topMenu1 ? closeSubMenu(e) : openSubMenu(e)
                  }
                >
                  <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                    photo_size_select_large
                  </span>
                  메인 디자인 관리{" "}
                  <span className="ml-auto sidebar-menu-toggle-icon"></span>
                </a>

                <ul
                  className={
                    state.subMenu.topMenu1
                      ? "sidebar-submenu sm-indent collapse show"
                      : "sidebar-submenu collapse sm-indent"
                  }
                  id="dashboards_menu"
                >
                  <li
                    className={
                      state.menu.topMenu === 1 && state.menu.subMenu === 0
                        ? "sidebar-menu-item active"
                        : "sidebar-menu-item"
                    }
                    onClick={() => onSelectMenu(1, 0)}
                  >
                    <Link
                      className="sidebar-menu-button"
                      to="/main-design/skin-and-banner-design"
                    >
                      <span className="sidebar-menu-text">
                        메인 배너&스킨 관리
                      </span>
                    </Link>
                  </li>
                  <li
                    className={
                      state.menu.topMenu === 1 && state.menu.subMenu === 1
                        ? "sidebar-menu-item active"
                        : "sidebar-menu-item"
                    }
                    onClick={() => onSelectMenu(1, 1)}
                  >
                    <Link
                      className="sidebar-menu-button"
                      to="/main-design/recommend-event"
                    >
                      <span className="sidebar-menu-text">
                        추천 문화행사 리스트
                      </span>
                    </Link>
                  </li>
                  <li
                    className={
                      state.menu.topMenu === 1 && state.menu.subMenu === 2
                        ? "sidebar-menu-item active"
                        : "sidebar-menu-item"
                    }
                    onClick={() => onSelectMenu(1, 2)}
                  >
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
            )}
            <li
              className={
                state.subMenu.topMenu2
                  ? state.menu.topMenu === 2
                    ? "sidebar-menu-item active open"
                    : "sidebar-menu-item open"
                  : state.menu.topMenu === 2
                  ? "sidebar-menu-item active"
                  : "sidebar-menu-item"
              }
            >
              <a
                className="sidebar-menu-button js-sidebar-collapse"
                data-toggle="collapse"
                name="topMenu2"
                onClick={(e) =>
                  state.subMenu.topMenu2 ? closeSubMenu(e) : openSubMenu(e)
                }
              >
                <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                  event_note
                </span>
                문화행사 관리
                <span className="ml-auto sidebar-menu-toggle-icon"></span>
              </a>
              <ul
                className={
                  state.subMenu.topMenu2
                    ? "sidebar-submenu sm-indent collapse show"
                    : "sidebar-submenu collapse sm-indent"
                }
                id="enterprise_menu"
              >
                <li
                  className={
                    state.menu.topMenu === 2 && state.menu.subMenu === 0
                      ? "sidebar-menu-item active"
                      : "sidebar-menu-item"
                  }
                  onClick={() => onSelectMenu(2, 0)}
                >
                  <Link
                    className="sidebar-menu-button"
                    to="/event/event-manage"
                  >
                    <span className="sidebar-menu-text">문화행사</span>
                  </Link>
                </li>

                <li
                  className={
                    state.menu.topMenu === 2 && state.menu.subMenu === 1
                      ? "sidebar-menu-item active"
                      : "sidebar-menu-item"
                  }
                  onClick={() => onSelectMenu(2, 1)}
                >
                  <Link
                    className="sidebar-menu-button"
                    to="/event/exhibit-list"
                  >
                    <span className="sidebar-menu-text">- 전시</span>
                  </Link>
                </li>
                <li
                  className={
                    state.menu.topMenu === 2 && state.menu.subMenu === 2
                      ? "sidebar-menu-item active"
                      : "sidebar-menu-item"
                  }
                  onClick={() => onSelectMenu(2, 2)}
                >
                  <Link
                    className="sidebar-menu-button"
                    to="/event/festival-list"
                  >
                    <span className="sidebar-menu-text">- 공연</span>
                  </Link>
                </li>
                <li
                  className={
                    state.menu.topMenu === 2 && state.menu.subMenu === 3
                      ? "sidebar-menu-item active"
                      : "sidebar-menu-item"
                  }
                  onClick={() => onSelectMenu(2, 3)}
                >
                  <Link
                    className="sidebar-menu-button"
                    to="/event/event-others-list"
                  >
                    <span className="sidebar-menu-text">- 기타</span>
                  </Link>
                </li>
                <li
                  className={
                    state.menu.topMenu === 2 && state.menu.subMenu === 4
                      ? "sidebar-menu-item active"
                      : "sidebar-menu-item"
                  }
                  onClick={() => onSelectMenu(2, 4)}
                >
                  <Link
                    className="sidebar-menu-button"
                    to="/event/seocho-festival"
                  >
                    <span className="sidebar-menu-text">서초구 축제</span>
                  </Link>
                </li>
                <li
                  className={
                    state.menu.topMenu === 2 && state.menu.subMenu === 5
                      ? "sidebar-menu-item active"
                      : "sidebar-menu-item"
                  }
                  onClick={() => onSelectMenu(2, 5)}
                >
                  <Link className="sidebar-menu-button" to="/event/add-event">
                    <span className="sidebar-menu-text">문화행사 등록하기</span>
                  </Link>
                </li>
                <li
                  className={
                    state.menu.topMenu === 2 && state.menu.subMenu === 6
                      ? "sidebar-menu-item active"
                      : "sidebar-menu-item"
                  }
                  onClick={() => onSelectMenu(2, 6)}
                >
                  <Link
                    className="sidebar-menu-button"
                    to="/event/event-application-list"
                  >
                    <span className="sidebar-menu-text">등록 신청 리스트</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className={
                state.subMenu.topMenu3
                  ? state.menu.topMenu === 3
                    ? "sidebar-menu-item active open"
                    : "sidebar-menu-item open"
                  : state.menu.topMenu === 3
                  ? "sidebar-menu-item active"
                  : "sidebar-menu-item"
              }
            >
              <a
                className="sidebar-menu-button"
                data-toggle="collapse"
                name="topMenu3"
                onClick={(e) =>
                  state.subMenu.topMenu3 ? closeSubMenu(e) : openSubMenu(e)
                }
              >
                <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                  place
                </span>
                문화공간 관리
                <span className="ml-auto sidebar-menu-toggle-icon"></span>
              </a>
              <ul
                className={
                  state.subMenu.topMenu3
                    ? "sidebar-submenu sm-indent collapse show"
                    : "sidebar-submenu collapse sm-indent"
                }
                id="productivity_menu"
              >
                <li
                  className={
                    state.menu.topMenu === 3 && state.menu.subMenu === 0
                      ? "sidebar-menu-item active"
                      : "sidebar-menu-item"
                  }
                  onClick={() => onSelectMenu(3, 0)}
                >
                  <Link
                    className="sidebar-menu-button"
                    to="/place/place-manage"
                  >
                    <span className="sidebar-menu-text">문화공간</span>
                  </Link>
                </li>

                <li
                  className={
                    state.menu.topMenu === 3 && state.menu.subMenu === 1
                      ? "sidebar-menu-item active"
                      : "sidebar-menu-item"
                  }
                  onClick={() => onSelectMenu(3, 1)}
                >
                  <Link
                    className="sidebar-menu-button"
                    to="/place/concert-hall-list"
                  >
                    <span className="sidebar-menu-text">- 공연장</span>
                  </Link>
                </li>
                <li
                  className={
                    state.menu.topMenu === 3 && state.menu.subMenu === 2
                      ? "sidebar-menu-item active"
                      : "sidebar-menu-item"
                  }
                  onClick={() => onSelectMenu(3, 2)}
                >
                  <Link
                    className="sidebar-menu-button"
                    to="/place/practice-list"
                  >
                    <span className="sidebar-menu-text">- 연습실</span>
                  </Link>
                </li>
                <li
                  className={
                    state.menu.topMenu === 3 && state.menu.subMenu === 3
                      ? "sidebar-menu-item active"
                      : "sidebar-menu-item"
                  }
                  onClick={() => onSelectMenu(3, 3)}
                >
                  <Link
                    className="sidebar-menu-button"
                    to="/place/musical-instrument-shop"
                  >
                    <span className="sidebar-menu-text">- 악기상점</span>
                  </Link>
                </li>
                <li
                  className={
                    state.menu.topMenu === 3 && state.menu.subMenu === 4
                      ? "sidebar-menu-item active"
                      : "sidebar-menu-item"
                  }
                  onClick={() => onSelectMenu(3, 4)}
                >
                  <Link
                    className="sidebar-menu-button"
                    to="/place/gallery-list"
                  >
                    <span className="sidebar-menu-text">- 갤러리</span>
                  </Link>
                </li>
                {/* <li
                  className={
                    state.menu.topMenu === 3 && state.menu.subMenu === 5
                      ? "sidebar-menu-item active"
                      : "sidebar-menu-item"
                  }
                  onClick={() => onSelectMenu(3, 5)}
                >
                  <Link
                    className="sidebar-menu-button"
                    to="/place/scplace-art-center"
                  >
                    <span className="sidebar-menu-text">
                      서리풀 청년아트 센터
                    </span>
                  </Link>
                </li>
                <li
                  className={
                    state.menu.topMenu === 3 && state.menu.subMenu === 6
                      ? "sidebar-menu-item active"
                      : "sidebar-menu-item"
                  }
                  onClick={() => onSelectMenu(3, 6)}
                >
                  <Link
                    className="sidebar-menu-button"
                    to="/place/scplace-art-gallery"
                  >
                    <span className="sidebar-menu-text">
                      서리풀 청년아트 갤러리
                    </span>
                  </Link>
                </li> */}
                <li
                  className={
                    state.menu.topMenu === 3 && state.menu.subMenu === 7
                      ? "sidebar-menu-item active"
                      : "sidebar-menu-item"
                  }
                  onClick={() => onSelectMenu(3, 7)}
                >
                  <Link className="sidebar-menu-button" to="/place/add-place">
                    <span className="sidebar-menu-text">문화공간 등록하기</span>
                  </Link>
                </li>
                <li
                  className={
                    state.menu.topMenu === 3 && state.menu.subMenu === 8
                      ? "sidebar-menu-item active"
                      : "sidebar-menu-item"
                  }
                  onClick={() => onSelectMenu(3, 8)}
                >
                  <Link
                    className="sidebar-menu-button"
                    to="/place/place-application-list"
                  >
                    <span className="sidebar-menu-text">등록 신청 리스트</span>
                  </Link>
                </li>
              </ul>
            </li>
            {adminGroup === "PARTNER" ? (
              ""
            ) : (
              <li
                className={
                  state.subMenu.topMenu4
                    ? state.menu.topMenu === 4
                      ? "sidebar-menu-item active open"
                      : "sidebar-menu-item open"
                    : state.menu.topMenu === 4
                    ? "sidebar-menu-item active"
                    : "sidebar-menu-item"
                }
              >
                <a
                  className="sidebar-menu-button"
                  data-toggle="collapse"
                  name="topMenu4"
                  onClick={(e) =>
                    state.subMenu.topMenu4 ? closeSubMenu(e) : openSubMenu(e)
                  }
                >
                  <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                    comment
                  </span>
                  커뮤니티
                  <span className="ml-auto sidebar-menu-toggle-icon"></span>
                </a>
                <ul
                  className={
                    state.subMenu.topMenu4
                      ? "sidebar-submenu sm-indent collapse show"
                      : "sidebar-submenu collapse sm-indent"
                  }
                  id="community_menu"
                >
                  <li
                    className={
                      state.menu.topMenu === 4 && state.menu.subMenu === 0
                        ? "sidebar-menu-item active"
                        : "sidebar-menu-item"
                    }
                    onClick={() => onSelectMenu(4, 0)}
                  >
                    <span
                      className="sidebar-menu-button"
                      onClick={() =>
                        movingInPage(
                          "http://118.64.154.134:9000/community/notice-board"
                        )
                      }
                    >
                      <span className="sidebar-menu-text">공지사항</span>
                    </span>
                  </li>
                  <li
                    className={
                      state.menu.topMenu === 4 && state.menu.subMenu === 1
                        ? "sidebar-menu-item active"
                        : "sidebar-menu-item"
                    }
                    onClick={() => onSelectMenu(4, 1)}
                  >
                    <span
                      className="sidebar-menu-button"
                      onClick={() =>
                        movingInPage(
                          "http://118.64.154.134:9000/community/event-board"
                        )
                      }
                    >
                      <span className="sidebar-menu-text">이벤트</span>
                    </span>
                  </li>
                  <li
                    className={
                      state.menu.topMenu === 4 && state.menu.subMenu === 2
                        ? "sidebar-menu-item active"
                        : "sidebar-menu-item"
                    }
                    onClick={() => onSelectMenu(4, 2)}
                  >
                    <span
                      className="sidebar-menu-button"
                      onClick={() =>
                        movingInPage(
                          "http://118.64.154.134:9000/community/news-board"
                        )
                      }
                    >
                      <span className="sidebar-menu-text">문화계 소식</span>
                    </span>
                  </li>
                  <li
                    className={
                      state.menu.topMenu === 4 && state.menu.subMenu === 3
                        ? "sidebar-menu-item active"
                        : "sidebar-menu-item"
                    }
                    onClick={() => onSelectMenu(4, 3)}
                  >
                    <span
                      className="sidebar-menu-button"
                      onClick={() =>
                        movingInPage(
                          "http://118.64.154.134:9000/community/press-release"
                        )
                      }
                    >
                      <span className="sidebar-menu-text">보도자료</span>
                    </span>
                  </li>
                </ul>
              </li>
            )}
            {adminGroup === "PARTNER" ? (
              ""
            ) : (
              <li
                className={
                  state.subMenu.topMenu5
                    ? state.menu.topMenu === 5
                      ? "sidebar-menu-item active open"
                      : "sidebar-menu-item open"
                    : state.menu.topMenu === 5
                    ? "sidebar-menu-item active"
                    : "sidebar-menu-item"
                }
              >
                <a
                  className="sidebar-menu-button"
                  data-toggle="collapse"
                  name="topMenu5"
                  onClick={(e) =>
                    state.subMenu.topMenu5 ? closeSubMenu(e) : openSubMenu(e)
                  }
                >
                  <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                    people
                  </span>
                  문화 파트너스
                  <span className="ml-auto sidebar-menu-toggle-icon"></span>
                </a>
                <ul
                  className={
                    state.subMenu.topMenu5
                      ? "sidebar-submenu sm-indent collapse show"
                      : "sidebar-submenu collapse sm-indent"
                  }
                  id="related-sites"
                >
                  <li
                    className={
                      state.menu.topMenu === 5 && state.menu.subMenu === 0
                        ? "sidebar-menu-item active"
                        : "sidebar-menu-item"
                    }
                    onClick={() => onSelectMenu(5, 0)}
                  >
                    <span
                      className="sidebar-menu-button"
                      onClick={() =>
                        movingInPage(
                          "http://118.64.154.134:9000/related-sites/list"
                        )
                      }
                    >
                      <span className="sidebar-menu-text">문화 파트너스</span>
                    </span>
                  </li>
                  <li
                    className={
                      state.menu.topMenu === 5 && state.menu.subMenu === 1
                        ? "sidebar-menu-item active"
                        : "sidebar-menu-item"
                    }
                    onClick={() => onSelectMenu(5, 1)}
                  >
                    <span
                      className="sidebar-menu-button"
                      onClick={() =>
                        movingInPage(
                          "http://118.64.154.134:9000/related-sites/add"
                        )
                      }
                    >
                      <span className="sidebar-menu-text">
                        문화 파트너스 추가
                      </span>
                    </span>
                  </li>
                </ul>
              </li>
            )}
            {adminGroup === "PARTNER" ? (
              ""
            ) : (
              <li
                className={
                  state.menu.topMenu === 6 && state.menu.subMenu === 0
                    ? "sidebar-menu-item active"
                    : "sidebar-menu-item"
                }
                onClick={() => onSelectMenu(6, 0)}
              >
                <span
                  className="sidebar-menu-button"
                  onClick={() =>
                    movingInPage("http://118.64.154.134:9000/user/list")
                  }
                >
                  <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                    people
                  </span>
                  <span className="sidebar-menu-text">사용자</span>
                </span>
              </li>
            )}

            {adminGroup === "SUPER" ? (
              <li
                className={
                  state.menu.topMenu === 7 && state.menu.subMenu === 0
                    ? "sidebar-menu-item active"
                    : "sidebar-menu-item"
                }
                onClick={() => onSelectMenu(7, 0)}
              >
                <span
                  className="sidebar-menu-button"
                  onClick={() =>
                    movingInPage("http://118.64.154.134:9000/admin/list")
                  }
                >
                  <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                    assignment_ind
                  </span>
                  <span className="sidebar-menu-text">관리자 관리</span>
                </span>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </div>
  );
});

export default React.memo(SideMenuBar);
