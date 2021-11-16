import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const LoginView = () => {
  const [loginInfo, setLoginInfo] = useState({
    id: "",
    password: "",
  });

  const onChangeLoginInfo = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const history = useHistory();
  const requestLogin = async () => {
    var data = new Object();

    data.id = loginInfo.id;
    data.password = loginInfo.password;

    console.log(data);

    // const url = "http://118.67.154.134:9000/login";
    const url = "/login";
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const response = await axios.post(url, data, config);

      console.log(response);
      if (response.status === 200) {
        console.log(response);
        console.log("login success!");
        // window.localStorage.setItem("token", response.headers.token);
        // window.localStorage.setItem("userid", response.headers.userid);

        window.sessionStorage.setItem("token", response.headers.token);
        window.sessionStorage.setItem("userid", response.headers.userid);

        history.push("/dashboard");
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className="mdk-drawer-layout js-mdk-drawer-layout"
      data-push
      data-responsive-width="992px"
    >
      <div className="mdk-drawer-layout__content page-content">
        <div className="container-fluid page__container">
          <div className=" pt-32pt pt-sm-64pt pb-32pt">
            <div className="container-fluid page__container">
              <div className="col-md-5 p-0 mx-auto">
                <div className="form-group text-center">
                  <img src="" />
                </div>
                <div className="form-group text-center">
                  <h2>서초 문화포털 관리자 로그인</h2>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    아이디:
                  </label>
                  <input
                    type="text"
                    name="id"
                    className="form-control"
                    placeholder="아이디"
                    onChange={(e) => onChangeLoginInfo(e)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                    비밀번호:
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="비밀번호"
                    onChange={(e) => onChangeLoginInfo(e)}
                  />
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-accent"
                    onClick={() => requestLogin()}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
