import React from "react";

const CultrualEventByField = () => {
  return (
    <div className="col-lg-6">
      <div className="page-separator">
        <div className="page-separator__text">분야 별 문화행사</div>
      </div>
      <div className="card">
        <div className="card-body p-24pt">
          <div className="row">
            <div className="col-6">
              <div className="nav border-0">
                <div className="row no-gutters flex" role="tablist">
                  <div className="col-auto">
                    <div className="d-flex align-items-center">
                      <div className="h2 mb-0 mr-3">17</div>
                      <div className="flex">
                        <p className="mb-0">
                          <strong>전체 문화행사</strong>
                        </p>
                        <p className="text-50 mb-0 lh-1"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chart" style={{ height: "262px" }}>
                <div className="chartjs-size-monitor">
                  <div className="chartjs-size-monitor-expand">
                    <div className=""></div>
                  </div>
                  <div className="chartjs-size-monitor-shrink">
                    <div className=""></div>
                  </div>
                </div>
                <div className="text-center fullbleed d-flex align-items-center justify-content-center flex-column z-0">
                  <h2 className="m-0">76%</h2>
                  <strong>공연</strong>
                </div>
                <canvas
                  className="chart-canvas position-relative z-1 chartjs-render-monitor"
                  id="attendanceDoughnutChart"
                  data-chart-legend="#attendanceDoughnutChartLegend"
                  data-chart-line-background-color="primary;teal;gray.700;gray"
                  style={{ display: "block", height: "262px", width: "263px" }}
                  width="526"
                  height="524"
                  data-chart-line-background-opacity="1"
                >
                  <span style={{ fontSize: "1rem" }} className="text-muted">
                    <strong>Attendance</strong> doughnut chart goes here.
                  </span>
                </canvas>
              </div>
            </div>
            <div className="col-6">
              <div
                id="attendanceDoughnutChartLegend"
                className="chart-legend chart-legend--vertical mt-24pt"
              >
                <span className="chart-legend-item">
                  <i
                    className="chart-legend-indicator"
                    style={{ backgroundColor: "rgba(33, 150, 243, 1)" }}
                  ></i>
                  공연 76%
                </span>
                <span className="chart-legend-item">
                  <i
                    className="chart-legend-indicator"
                    style={{ backgroundColor: "rgb(0, 188, 194)" }}
                  ></i>
                  전시 12%
                </span>
                <span className="chart-legend-item">
                  <i
                    className="chart-legend-indicator"
                    style={{ backgroundColor: "#B1BBC9" }}
                  ></i>
                  기타 12%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CultrualEventByField;
