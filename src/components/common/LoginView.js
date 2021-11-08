import React, { useState } from "react";

const LoginView = () => {
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
              <form
                action="../dashboard/index.html"
                className="col-md-5 p-0 mx-auto"
              >
                <div className="form-group text-center">
                  <img src="" />
                </div>
                <div className="form-group text-center">
                  <h2>서초 문화포털 관리자 로그인</h2>
                </div>
                <div className="form-group">
                  <label className="form-label" for="email">
                    아이디:
                  </label>
                  <input
                    id="email"
                    type="text"
                    className="form-control"
                    placeholder=""
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" for="password">
                    비밀번호:
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder=""
                  />
                </div>
                <div className="text-center">
                  <button className="btn btn-accent">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
