import React from "react";

const SummaryBarGraph = ({ graphTitle }) => {
  return (
    <div className="col-md-6 card-group-row__col">
      <div className="card card-group-row__card">
        <div className="card-header p-0 nav">
          <div className="row no-gutters flex" role="tablist">
            <div className="col-auto">
              <div className="p-card-header d-flex align-items-center">
                <div className="h2 mb-0 mr-3">417</div>
                <div className="flex">
                  <p className="mb-0">
                    <strong>{graphTitle}</strong>
                  </p>
                  <p className="text-50 mb-0 d-flex align-items-center">
                    <small>2021</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div
            id="legend"
            className="chart-legend mt-0 mb-24pt justify-content-start"
          ></div>
          <div className="chart" style={{ height: "182px" }}>
            <canvas
              id="earningsChart"
              className="chart-canvas js-update-chart-bar"
              data-chart-legend="#legend"
              data-chart-line-background-color="primary,gray"
              data-chart-prefix="$"
              data-chart-suffix="k"
            >
              <span style={{ fontSize: "1rem" }}>
                <strong>Views</strong> area chart goes here.
              </span>
            </canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryBarGraph;
