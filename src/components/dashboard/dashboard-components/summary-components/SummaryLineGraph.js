import React from "react";
import { Line } from "react-chartjs-2";

const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 50,
      },
    },
  },
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const SummaryLineGraph = ({ graphTitle, data }) => {
  return (
    <div className="col-md-6 card-group-row__col">
      <div className="card card-group-row__card">
        <div className="card-header p-0 nav">
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
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default SummaryLineGraph;
