import React from "react";
import { Bar } from "react-chartjs-2";

const SummaryBarGraph = ({ graphTitle, totalCount, data, dateRange }) => {
  return (
    <div className="col-md-6 card-group-row__col">
      <div className="card card-group-row__card">
        <div className="card-header p-0 nav">
          <div className="row no-gutters flex" role="tablist">
            <div className="col-auto">
              <div className="p-card-header d-flex align-items-center">
                <div className="h2 mb-0 mr-3">{totalCount}</div>
                <div className="flex">
                  <p className="mb-0">
                    <strong>{graphTitle}</strong>
                  </p>
                  <p className="text-50 mb-0 d-flex align-items-center">
                    <small>{dateRange}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <Bar
              data={data}
              options={{
                scales: {
                  y: {
                    ticks: {
                      beginAtZero: true,
                      stepSize: 50,
                    },
                  },
                },
                plugins: {
                  legend : {
                    display : dateRange === "최근 일주일",
                  }
                }
              }}
          />
        </div>
      </div>
    </div>
  );
};

export default SummaryBarGraph;
