import React from "react";

import SummaryLineGraph from "./summary-components/SummaryLineGraph";
import SummaryBarGraph from "./summary-components/SummaryBarGraph";

const barGraphData = {
  labels: ["11/15", "11/16", "11/17", "11/18", "11/19", "11/20", "11/21"],
  datasets: [
    {
      label: "지난주",
      data: [5, 25, 38, 50, 39, 110, 120],
      fill: true,
      backgroundColor: "rgb(220, 230, 244)",
      borderColor: "rgb(220, 230, 244)",
      borderWidth: 1,
      borderRadius: 7,
    },
    {
      label: "이번주",
      data: [12, 19, 35, 53, 29, 130, 99],
      fill: true,
      backgroundColor: "rgb(30, 128, 240)",
      borderColor: "rgb(30, 128, 240)",
      borderWidth: 1,
      borderRadius: 7,
    },
  ],
};

const data = {
  labels: ["11/15", "11/16", "11/17", "11/18", "11/19", "11/20", "11/21"],
  datasets: [
    {
      label: "",
      data: [12, 19, 35, 53, 29, 130, 99],
      fill: true,
      lineTension: 0.5,
      backgroundColor: "rgba(15, 107, 255, 0.1)",
      borderColor: "rgb(30, 128, 240)",
      borderWidth: 2,
    },
  ],
};

const Summary = () => {
  return (
    <div className="page-section">
      <div className="page-separator">
        <div className="page-separator__text">개요</div>
      </div>
      <div className="row mb-lg-8pt">
        <SummaryLineGraph graphTitle="사이트 방문" data={data} />
        <SummaryLineGraph graphTitle="신규 가입" data={data} />
      </div>
      <div className="row mb-lg-8pt">
        <SummaryLineGraph graphTitle="신규 리뷰" data={data} />
      </div>

      <div className="row card-group-row mb-lg-8pt">
        <SummaryBarGraph graphTitle="신규 등록 행사" data={barGraphData} />
        <SummaryBarGraph graphTitle="신규 등록 공간" data={barGraphData} />
      </div>
    </div>
  );
};

export default Summary;
