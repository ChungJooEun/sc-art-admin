import React from "react";

const CulturalEventByLocation = () => {
  return (
    <div className="col-lg-6">
      <div className="page-separator">
        <div className="page-separator__text">장소 별 문화행사</div>
      </div>

      <div className="card card-group-row__card">
        <div className="card-header p-0 nav">
          <div className="row no-gutters flex" role="tablist">
            <div className="col-auto">
              <div className="p-card-header d-flex align-items-center">
                <div className="h2 mb-0 mr-3">103</div>
                <div className="flex">
                  <p className="mb-0">
                    <strong>전체 문화행사</strong>
                  </p>
                  <p className="text-50 mb-0 d-flex align-items-center"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body d-flex flex-column">
          <div className="d-flex flex flex-column align-items-center justify-content-center">
            <ul className="list-unstyled list-skills w-100">
              <li className="mb-8pt">
                <div className="text-50 border-right">
                  <small>장소1</small>
                </div>
                <div className="flex">
                  <div className="progress" style={{ height: "4px" }}>
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: "60%" }}
                      aria-valuenow="40"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <div className="text-70">
                  <small>60</small>
                </div>
              </li>
              <li className="mb-8pt">
                <div className="text-50 border-right">
                  <small>장소2</small>
                </div>
                <div className="flex">
                  <div className="progress" style={{ height: "4px" }}>
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: "50%" }}
                      aria-valuenow="50"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <div className="text-70">
                  <small>50</small>
                </div>
              </li>
              <li className="mb-8pt">
                <div className="text-50 border-right">
                  <small>장소3</small>
                </div>
                <div className="flex">
                  <div className="progress" style={{ height: "4px" }}>
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: "40%" }}
                      aria-valuenow="60"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <div className="text-70">
                  <small>40</small>
                </div>
              </li>
              <li className="mb-8pt">
                <div className="text-50 border-right">
                  <small>장소4</small>
                </div>
                <div className="flex">
                  <div className="progress" style={{ height: "4px" }}>
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: "30%" }}
                      aria-valuenow="90"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <div className="text-70">
                  <small>30</small>
                </div>
              </li>
              <li className="mb-0">
                <div className="text-50 border-right">
                  <small>장소5</small>
                </div>
                <div className="flex">
                  <div className="progress" style={{ height: "4px" }}>
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: "12%" }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <div className="text-70">
                  <small>12</small>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CulturalEventByLocation;
