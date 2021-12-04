import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";

import Paging from "../../basic-components/Paging";
import ModifiableEventList from "../../event/event-components/ModifiableEventList";
import ModifiablePlaceList from "../../place/place-components/ModifiablePlaceList";

const count = 5;

const TaskRequest = () => {
  const [eventList, setEventList] = useState([]);
  const [placeList, setPlaceList] = useState([]);
  const [pageNumber_Event, setPageNumber_Event] = useState(1);
  const [pageNumber_Place, setPageNumber_Place] = useState(1);
  const [totalNumEvent, setTotalNumEvent] = useState(0);
  const [totalNumPlace, setTotalNumPlace] = useState(0);

  const [tapMenu, setTapMenu] = useState(1);
  const [sortInfo, setSortInfo] = useState({
    sort_column: "create_date",
    sort_type: "desc",
  });

  const [adminGroup, setAdminGroup] = useState();

  const sorting = (columnName) => {
    if (columnName === sortInfo.sort_column) {
      setSortInfo({
        ...sortInfo,
        sort_type: sortInfo.sort_type === "desc" ? "asc" : "desc",
      });
    } else {
      setSortInfo({
        sort_column: columnName,
        sort_type: "desc",
      });
    }
  };

  const onChangeTapMenu = (menu) => {
    setTapMenu(menu);

    console.log(menu);

    if (menu === 1) {
      setPageNumber_Event(1);
    } else {
      setPageNumber_Place(1);
    }

    setSortInfo({
      sort_column: "create_date",
      sort_type: "desc",
    });
  };

  const modifyPlaceState = async (id, state) => {
    const url = `http://118.67.154.118:3000/api/admin/cultural-space/modify/state/${id}`;
    // const url = `/api/admin/cultural-space/modify/state/${id}`;

    var data = new Object();
    data.userid = window.sessionStorage.getItem("userid");
    data.state = state;

    try {
      const res = await axios.post(url, data);

      if (res.status === 200) {
        console.log("======== STATE 변경 성공 ========");
        getPlaceList();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const modifyEventState = async (id, state) => {
    const url = `http://118.67.154.118:3000/api/admin/cultural-event/modify/state/${id}`;
    // const url = `/api/admin/cultural-space/modify/state/${id}`;

    var data = new Object();
    data.userid = window.sessionStorage.getItem("userid");
    data.state = state;

    try {
      const res = await axios.post(url, data);

      if (res.status === 200) {
        console.log("======== STATE 변경 성공 ========");
        getEventList();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getEventList = useCallback(async () => {
    const url = "http://118.67.154.118:3000/api/admin/cultural-event/list";
    // const url = "/api/admin/cultural-event/list";

    try {
      const response = await axios.get(url, {
        params: {
          sort_type: sortInfo.sort_type,
          sort_column: sortInfo.sort_column,
          page: pageNumber_Event,
          count: count,
          is_dashboard: 1,
          userid:
            adminGroup === "PARTNER"
              ? window.sessionStorage.getItem("userid")
              : "",
        },
      });

      if (response.status === 200) {
        setEventList(response.data.list);
        setTotalNumEvent(response.data.total_count);
      }
    } catch (e) {
      console.log(e);
    }
  }, [pageNumber_Event, sortInfo, adminGroup]);

  const getPlaceList = useCallback(async () => {
    const url = "http://118.67.154.118:3000/api/admin/cultural-space/list";
    // const url = "/api/admin/cultural-space/list";

    try {
      const response = await axios.get(url, {
        params: {
          sort_type: sortInfo.sort_type,
          sort_column: sortInfo.sort_column,
          page: pageNumber_Place,
          count: count,
          is_dashboard: 1,
          userid:
            adminGroup === "PARTNER"
              ? window.sessionStorage.getItem("userid")
              : "",
        },
      });

      if (response.status === 200) {
        setPlaceList(response.data.list);
        setTotalNumPlace(response.data.total_count);
      }
    } catch (e) {
      console.log(e);
    }
  }, [pageNumber_Place, sortInfo, adminGroup]);

  const getPageNumber = (pickNumber) => {
    if (tapMenu === 1) {
      setPageNumber_Event(pickNumber);
    } else {
      setPageNumber_Place(pickNumber);
    }
  };

  useEffect(() => {
    const admingroup = window.sessionStorage.getItem("adminGroup");
    if (admingroup !== null || admingroup !== undefined) {
      setAdminGroup(admingroup);
    }

    getEventList();
    getPlaceList();
  }, [getEventList, getPlaceList]);

  if (
    eventList === null ||
    placeList === null ||
    totalNumEvent === null ||
    totalNumPlace === null
  ) {
    return <></>;
  }

  return (
    <div className="page-section">
      <div className="page-separator">
        <div className="page-separator__text">업무요청</div>
      </div>

      <div className="card dashboard-area-tabs mb-32pt">
        <div className="card-header p-0 nav">
          <div className="row no-gutters">
            <div className="col-auto">
              <div
                className={
                  tapMenu === 1
                    ? "dashboard-area-tabs__tab card-body d-flex flex-row align-items-center justify-content-start active"
                    : "dashboard-area-tabs__tab card-body d-flex flex-row align-items-center justify-content-start"
                }
                onClick={() => onChangeTapMenu(1)}
              >
                <span className="h2 mb-0 mr-3">{totalNumEvent}</span>
                <span className="flex d-flex flex-column">
                  <strong>문화행사</strong>
                  <small className="text-50">신규 등록 요청</small>
                </span>
              </div>
            </div>
            <div className="col-auto border-left border-right">
              <div
                className={
                  tapMenu === 2
                    ? "dashboard-area-tabs__tab card-body d-flex flex-row align-items-center justify-content-start active"
                    : "dashboard-area-tabs__tab card-body d-flex flex-row align-items-center justify-content-start"
                }
                onClick={() => onChangeTapMenu(2)}
              >
                <span className="h2 mb-0 mr-3">{totalNumPlace}</span>
                <span className="flex d-flex flex-column">
                  <strong>문화공간</strong>
                  <small className="text-50">신규 등록 요청</small>
                </span>
              </div>
            </div>
          </div>
        </div>
        {
          {
            1: (
              <ModifiableEventList
                list={eventList}
                pageNumber={pageNumber_Event}
                count={count}
                sorting={sorting}
                modifyState={modifyEventState}
              />
            ),
            2: (
              <ModifiablePlaceList
                list={placeList}
                pageNumber={pageNumber_Place}
                count={count}
                sorting={sorting}
                modifyState={modifyPlaceState}
              />
            ),
          }[tapMenu]
        }

        <Paging
          pageNumber={tapMenu === 1 ? pageNumber_Event : pageNumber_Place}
          getPageNumber={getPageNumber}
          totalNum={tapMenu === 1 ? totalNumEvent : totalNumPlace}
          count={count}
        />
      </div>
    </div>
  );
};

export default TaskRequest;
