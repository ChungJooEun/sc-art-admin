import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import MenuContext from "../../context/menu";
// import axios from "axios";

const GlobalBar = React.memo(() => {
  const { actions, state } = useContext(MenuContext);

  const onToggleMenuBar = () => {
    actions.setHideMenu(!state.hideMenu);
  };

  const [userId, setUserId] = useState(null);
  const history = useHistory();

  // const logout = async () => {
  //   const url = "https://culture.seocho.go.kr:8443/admin-service/logout";

  //   try {
  //     const res = await axios.get(url, {
  //       params: {
  //         userId: userId,
  //       },
  //     });

  //     if (res.status === 302) {
  //       alert("로그아웃 되었습니다.");

  //       window.sessionStorage.removeItem("userid");
  //       window.sessionStorage.removeItem("token");
  //       window.sessionStorage.removeItem("adminGroup");

  //       history.push("/common/login");
  //     }
  //   } catch (e) {
  //     alert("로그아웃에 실패하였습니다.");
  //     console.log(e);
  //   }
  // };

  const logout = () => {
    alert("로그아웃 되었습니다.");

    window.sessionStorage.removeItem("userid");
    window.sessionStorage.removeItem("token");
    window.sessionStorage.removeItem("adminGroup");

    history.push("/common/login");
  };

  useEffect(() => {
    setUserId(window.sessionStorage.getItem("userid"));

    const srcList = [
      `${process.env.PUBLIC_URL}/assets/vendor/jquery.min.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/popper.min.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/bootstrap.min.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/perfect-scrollbar.min.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/dom-factory.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/material-design-kit.js`,
      `${process.env.PUBLIC_URL}/assets/js/app.js`,
      `${process.env.PUBLIC_URL}/assets/js/hljs.js`,
      `${process.env.PUBLIC_URL}/assets/js/settings.js`,
      `${process.env.PUBLIC_URL}/assets/js/app-settings.js`,
    ];
    let scriptList = [];

    for (let i = 0; i < srcList.length; i++) {
      const script = document.createElement("script");
      script.src = process.env.PUBLIC_URL + srcList[i];
      script.async = true;
      scriptList.push(script);
      document.body.appendChild(script);
    }

    return () => {
      for (let i = 0; i < scriptList.length; i++) {
        document.body.removeChild(scriptList[i]);
      }
    };
  }, []);

  if (!userId) {
    return <div></div>;
  }

  return (
    <div
      className="navbar navbar-expand navbar-shadow px-0 pl-lg-16pt navbar-light bg-body"
      id="default-navbar"
      data-primary
    >
      <button
        className="navbar-toggler d-block d-lg-none rounded-0"
        type="button"
        onClick={onToggleMenuBar}
      >
        <span className="material-icons">menu</span>
      </button>

      <Link to="/dashboard" className="navbar-brand mr-16pt d-lg-none">
        <img
          className="navbar-brand-icon mr-0 mr-lg-8pt"
          src={`${process.env.PUBLIC_URL}/assets/images/logo/accent-teal-100@2x.png`}
          width="32"
          alt="Huma"
        />
        <span className="d-none d-lg-block">seocho art</span>
      </Link>
      <div className="flex"></div>
      <div className="nav navbar-nav flex-nowrap d-flex ml-0 mr-16pt">
        <div className="nav-item dropdown d-none d-sm-flex">
          <a
            className="nav-link d-flex align-items-center dropdown-toggle"
            data-toggle="dropdown"
          >
            <span className="flex d-flex flex-column mr-8pt">
              <span className="navbar-text-100">
                <b className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                  person_pin
                </b>
                {userId}
              </span>
            </span>
          </a>
          {userId ? (
            <div className="dropdown-menu dropdown-menu-right">
              <div className="dropdown-header">
                <strong>계정</strong>
              </div>
              <a className="dropdown-item" onClick={() => logout()}>
                로그아웃
              </a>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
});

export default React.memo(GlobalBar);
