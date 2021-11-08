import React from "react";

const SummaryLineGraph = ({ graphTitle }) => {
  return (
    <div className="col-md-6 card-group-row__col">
      <div className="card card-group-row__card">
        <div className="card-header p-0 nav border-0">
          <div className="row no-gutters flex" role="tablist">
            <div className="col-auto">
              <div className="p-card-header d-flex align-items-center">
                <div className="h2 mb-0 mr-3">2,412</div>
                <div className="flex d-flex flex-column">
                  <p className="mb-0">
                    <strong>{graphTitle}</strong>
                  </p>
                  <small className="text-black-50">최근 일주일</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="chart" style={{ height: "128px" }}>
            <canvas
              id="viewsChart"
              className="chart-canvas js-update-chart-line js-update-chart-area"
              data-chart-points="true"
              data-chart-line-border-color="primary"
              data-chart-prefix="$"
              data-chart-suffix="k"
            ></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryLineGraph;
