import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import GlobalBar from "../basic-components/GlobalBar";
import PageTitle from "../basic-components/PageTitle";
import SideMenuBar from "../basic-components/SideMenuBar";

const pagePathList = [
  {
    pageUrl: "/dashboard",
    pageName: "홈",
  },
];

const AddAdminView = () => {
  const history = useHistory();

  const [adminInfo, setAdminInfo] = useState({
    id: "",
    password: "",
    admin_group: "",
    phone: "",
    memo: "",
  });

  const onChangeInfo = (e) => {
    setAdminInfo({
      ...adminInfo,
      [e.target.name]: e.target.value,
    });
  };

  const registAdmin = async () => {
    const url = "http://118.67.154.134:9000/api/admin/regist";
    // const url = "/api/admin/regist";
    const config = { headers: { "Content-Type": "application/json" } };

    var data = new Object();

    data.id = adminInfo.id;
    data.password = adminInfo.password;
    data.admin_group = adminInfo.admin_group;
    data.phone = adminInfo.phone;
    data.memo = adminInfo.memo;
    data.update_uid = window.sessionStorage.getItem("userid");

    try {
      const res = await axios.post(url, data, config);

      if (res.status === 201) {
        console.log(res.data);
        history.push("/admin/admin-manage");
      }
    } catch (e) {}
  };

  useEffect(() => {
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
      `${process.env.PUBLIC_URL}/assets/vendor/moment.min.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/moment-range.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/Chart.min.js`,
      `${process.env.PUBLIC_URL}/assets/js/chartjs.js`,
      `${process.env.PUBLIC_URL}/assets/js/chartjs-rounded-bar.js`,
      `${process.env.PUBLIC_URL}/assets/js/page.projects.js`,
      `${process.env.PUBLIC_URL}/assets/js/page.analytics-2-dashboard.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/list.min.js`,
      `${process.env.PUBLIC_URL}/assets/js/list.js`,
      `${process.env.PUBLIC_URL}/assets/js/toggle-check-all.js`,
      `${process.env.PUBLIC_URL}/assets/js/check-selected-row.js`,
      `${process.env.PUBLIC_URL}/assets/js/app-settings.js`,
    ];
    let scriptList = [];

    for (let i = 0; i < srcList.length; i++) {
      const script = document.createElement("script");
      script.src = process.env.PUBLIC_URL + srcList[i];
      scriptList.push(script);
      document.body.appendChild(script);
    }

    return () => {
      for (let i = 0; i < scriptList.length; i++) {
        document.body.removeChild(scriptList[i]);
      }
    };
  });
  return (
    <>
      <div
        className="mdk-drawer-layout js-mdk-drawer-layout"
        data-push
        data-responsive-width="992px"
      >
        <div className="mdk-drawer-layout__content page-content">
          <GlobalBar />
          <PageTitle pageTitle="관리자 관리" pagePathList={pagePathList} />

          <div className="container-fluid page__container">
            <div className="container-fluid page__container">
              <div className="page-section">
                <div className="page-separator">
                  <div className="page-separator__text">관리자 등록하기</div>
                </div>
                <div className="list-group">
                  <div className="list-group-item">
                    <div
                      role="group"
                      aria-labelledby="label-question"
                      className="m-0 form-group"
                    >
                      <div className="form-row align-items-center">
                        <label
                          id="label-question"
                          htmlFor="question"
                          className="col-md-2 col-form-label form-label"
                        >
                          *관리자 ID
                        </label>
                        <div className="col-md-10">
                          <input
                            id="title"
                            type="text"
                            placeholder=""
                            className="form-control"
                            name="id"
                            onChange={onChangeInfo}
                            value={adminInfo.id}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="list-group-item">
                    <div
                      role="group"
                      aria-labelledby="label-question"
                      className="m-0 form-group"
                    >
                      <div className="form-row align-items-center">
                        <label
                          id="label-question"
                          htmlFor="question"
                          className="col-md-2 col-form-label form-label"
                        >
                          *비밀번호
                        </label>
                        <div className="col-md-10">
                          <input
                            id="title"
                            type="text"
                            placeholder=""
                            className="form-control"
                            name="password"
                            onChange={onChangeInfo}
                            value={adminInfo.password}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="list-group-item">
                    <div
                      role="group"
                      aria-labelledby="label-question"
                      className="m-0 form-group"
                    >
                      <div className="form-row align-items-center">
                        <label
                          id="label-question"
                          htmlFor="question"
                          className="col-md-2 col-form-label form-label"
                        >
                          *그룹명
                        </label>
                        <div className="col-md-10">
                          <select
                            id="custom-select"
                            className="form-control custom-select"
                            defaultValue="NORMAL"
                            name="admin_group"
                            onChange={onChangeInfo}
                            value={adminInfo.admin_group}
                          >
                            <option value="NORMAL">일반 관리자</option>
                            <option value="COLLABORATOR">협업사 관리자</option>
                            <option value="SUPER">슈퍼 관리자</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="list-group-item">
                    <div
                      role="group"
                      aria-labelledby="label-question"
                      className="m-0 form-group"
                    >
                      <div className="form-row align-items-center">
                        <label
                          id="label-question"
                          htmlFor="question"
                          className="col-md-2 col-form-label form-label"
                        >
                          연락처
                        </label>
                        <div className="col-md-10">
                          <input
                            id="title"
                            type="tel"
                            placeholder="000-0000-0000"
                            className="form-control"
                            name="phone"
                            value={adminInfo.phone}
                            onChange={onChangeInfo}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="list-group-item">
                    <div
                      role="group"
                      aria-labelledby="label-question"
                      className="m-0 form-group"
                    >
                      <div className="form-row">
                        <label
                          id="label-question"
                          htmlFor="question"
                          className="col-md-2 col-form-label form-label"
                        >
                          메모
                        </label>
                        <div className="col-md-10">
                          <textarea
                            id="question"
                            placeholder="메모..."
                            rows="4"
                            className="form-control"
                            name="memo"
                            value={adminInfo.memo}
                            onChange={onChangeInfo}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn btn-secondary ml-16pt"
                  onClick={() => history.push("/admin/admin-manage")}
                >
                  취소
                </button>
                <button
                  className="btn btn-success"
                  data-toggle="swal"
                  data-swal-title="완료!"
                  data-swal-text="새로운 관리자가 등록되었습니다!"
                  data-swal-type="success"
                  onClick={registAdmin}
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
        <SideMenuBar />
      </div>
    </>
  );
};

export default AddAdminView;
