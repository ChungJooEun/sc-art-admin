import React from "react";

import Paging from "../../basic-components/Paging";
import ModifiableEventList from "../../event/event-components/ModifiableEventList";
import ModifiablePlaceList from "../../place/place-components/ModifiablePlaceList";

const TaskRequest = () => {
  return (
    <div className="page-section">
      <div className="page-separator">
        <div className="page-separator__text">업무요청</div>
      </div>

      <div className="card dashboard-area-tabs mb-32pt">
        <div className="card-header p-0 nav">
          <div className="row no-gutters" role="tablist">
            <div className="col-auto">
              <a
                href="#"
                data-toggle="tab"
                role="tab"
                aria-selected="true"
                className="dashboard-area-tabs__tab card-body d-flex flex-row align-items-center justify-content-start active"
              >
                <span className="h2 mb-0 mr-3">3</span>
                <span className="flex d-flex flex-column">
                  <strong>문화행사</strong>
                  <small className="text-50">신규 등록 요청</small>
                </span>
              </a>
            </div>
            <div className="col-auto border-left border-right">
              <a
                href="#"
                data-toggle="tab"
                role="tab"
                aria-selected="false"
                className="dashboard-area-tabs__tab card-body d-flex flex-row align-items-center justify-content-start"
              >
                <span className="h2 mb-0 mr-3">2</span>
                <span className="flex d-flex flex-column">
                  <strong>문화공간</strong>
                  <small className="text-50">신규 등록 요청</small>
                </span>
              </a>
            </div>
          </div>
        </div>

        <ModifiableEventList />
        <Paging />

        <ModifiablePlaceList />
        <Paging />
      </div>
    </div>
  );
};

export default TaskRequest;
