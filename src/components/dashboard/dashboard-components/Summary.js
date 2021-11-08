import React from "react";

import SummaryLineGraph from "./summary-components/SummaryLineGraph";
import SummaryBarGraph from "./summary-components/SummaryBarGraph";

const Summary = () => {
  return (
    <div className="page-section">
      <div className="page-separator">
        <div className="page-separator__text">개요</div>
      </div>
      <div className="row mb-lg-8pt">
        <SummaryLineGraph graphTitle="사이트 방문" />
        <SummaryLineGraph graphTitle="신규 가입" />
      </div>
      <div className="row mb-lg-8pt">
        <SummaryLineGraph graphTitle="신규 리뷰" />
      </div>

      <div className="row card-group-row mb-lg-8pt">
        <SummaryBarGraph graphTitle="신규 등록 행사" />
        <SummaryBarGraph graphTitle="신규 등록 공간" />
      </div>
    </div>
  );
};

export default Summary;
