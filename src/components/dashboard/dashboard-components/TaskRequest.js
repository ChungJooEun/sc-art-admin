import React, { useEffect, useState } from "react";

import Paging from "../../basic-components/Paging";
import ModifiableEventList from "../../event/event-components/ModifiableEventList";
import ModifiablePlaceList from "../../place/place-components/ModifiablePlaceList";

const dataEventList = [
  {
    id: 1,
    name: "행사이름 1",
    event_type_name: "전시",
    address: "주소 1",
    price: 12000, // 누락
    open_date: "2021-11-09", // 사용안함
    close_date: "2021-11-19",
    create_date: "2021-11-08",
    writer: "관리자1", // 누락
    state: "기각", // 누락
  },
  {
    id: 2,
    name: "행사이름 2",
    event_type_name: "공연",
    address: "주소 2",
    price: 0, // 누락
    open_date: "2021-11-09", // 사용안함
    close_date: "2021-11-19",
    create_date: "2021-11-08",
    writer: "관리자1", // 누락
    state: "대기중", // 누락
  },
  {
    id: 3,
    name: "행사이름 3",
    event_type_name: "기타",
    address: "주소 3",
    price: 12000, // 누락
    open_date: "2021-11-09", // 사용안함
    close_date: "2021-11-19",
    create_date: "2021-11-08",
    writer: "관리자1", // 누락
    state: "대기중", // 누락
  },
  {
    id: 4,
    name: "행사이름 4",
    event_type_name: "전시",
    address: "주소 4",
    price: 12000, // 누락
    open_date: "2021-11-09", // 사용안함
    close_date: "2021-11-19",
    create_date: "2021-11-08",
    writer: "관리자1", // 누락
    state: "대기중", // 누락
  },
  {
    id: 5,
    name: "행사이름 5",
    event_type_name: "기타",
    address: "주소 5",
    price: 0, // 누락
    open_date: "2021-11-09", // 사용안함
    close_date: "2021-11-19",
    create_date: "2021-11-08",
    writer: "관리자5", // 누락
    state: "대기중", // 누락
  },
];

const dataPlaceList = [
  {
    id: 1,
    name: "공간이름 1",
    space_type_name: "공연장",
    address: "주소 1",
    create_date: "2021-11-08",
    writer: "관리자1", // 누락
    state: "대기중", // 누락
  },
  {
    id: 2,
    name: "공간이름 2",
    space_type_name: "연습실",
    address: "주소 2",
    create_date: "2021-11-08",
    writer: "관리자2", // 누락
    state: "기각", // 누락
  },
  {
    id: 3,
    name: "공간이름 3",
    space_type_name: "연습실",
    address: "주소 3",
    create_date: "2021-11-08",
    writer: "관리자2", // 누락
    state: "기각", // 누락
  },
  {
    id: 4,
    name: "공간이름 4",
    space_type_name: "악기상점",
    address: "주소 4",
    create_date: "2021-11-08",
    writer: "관리자2", // 누락
    state: "게시", // 누락
  },
  {
    id: 5,
    name: "공간이름 5",
    space_type_name: "갤러리",
    address: "주소 4",
    create_date: "2021-11-08",
    writer: "관리자5", // 누락
    state: "기각", // 누락
  },
];

const count = 5;

const TaskRequest = () => {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const [tapMenu, setTapMenu] = useState(1);

  const onChangeTapMenu = (menu) => {
    setTapMenu(menu);
    setPageNumber(1);

    if (menu === 1) {
      getEventList();
    } else {
      getPlaceList();
    }
  };

  const getEventList = () => {
    // axios 코드 추가
    setList(dataEventList);
    setLoading(false);
  };

  const getPlaceList = () => {
    // axios 코드 추가
    setList(dataPlaceList);
    setLoading(false);
  };

  useEffect(() => {
    getEventList();
  }, []);

  if (loading) {
    return <p>loading..</p>;
  }

  if (!list) {
    return <p>fail to loading data</p>;
  }

  return (
    <div className="page-section">
      <div className="page-separator">
        <div className="page-separator__text">업무요청</div>
      </div>

      <div className="card dashboard-area-tabs mb-32pt">
        <div className="card-header p-0 nav">
          <div className="row no-gutters" role="tablist">
            <div className="col-auto">
              <div
                className={
                  tapMenu === 1
                    ? "dashboard-area-tabs__tab card-body d-flex flex-row align-items-center justify-content-start active"
                    : "dashboard-area-tabs__tab card-body d-flex flex-row align-items-center justify-content-start"
                }
                onClick={() => onChangeTapMenu(1)}
              >
                <span className="h2 mb-0 mr-3">3</span>
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
                <span className="h2 mb-0 mr-3">2</span>
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
                list={list}
                pageNumber={pageNumber}
                count={count}
              />
            ),
            2: (
              <ModifiablePlaceList
                list={list}
                pageNumber={pageNumber}
                count={count}
              />
            ),
          }[tapMenu]
        }

        <Paging />
      </div>
    </div>
  );
};

export default TaskRequest;
