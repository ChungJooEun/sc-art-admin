import React from "react";

import CheckableEventListItem from "../event-components/CheckableEventListItem";

const CheckableEventList = ({
  list,
  pageNumber,
  count,
  isModal,
  addCheckedList,
  removeNoneCheckedList,
  sorting,
}) => {
  let no = (pageNumber - 1) * count + 1;

  const addCheckedItem = (eventInfo) => {
    addCheckedList(eventInfo);
  };

  const removeCheckedItem = (rId) => {
    removeNoneCheckedList(rId);
  };

  return (
    <table className="table mb-0 thead-border-top-0 table-nowrap">
      <thead>
        <tr>
          <th style={{ width: "12px" }} className="pr-0">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input js-toggle-check-all"
                data-target="#staff"
                id="customCheckAllstaff"
              />
              <label
                className="custom-control-label"
                htmlFor="customCheckAllstaff"
              >
                <span className="text-hide">Toggle all</span>
              </label>
            </div>
          </th>
          <th style={{ width: "12px" }}>no.</th>
          <th style={{ width: "150px" }}>
            <span onClick={() => sorting("name")} className="sort">
              행사명
            </span>
          </th>
          <th style={{ width: "48px" }}>
            <span onClick={() => sorting("event_type")} className="sort">
              종류
            </span>
          </th>
          <th style={{ width: "80px" }}>
            <span onClick={() => sorting("address1")} className="sort">
              위치
            </span>
          </th>
          <th style={{ width: "48px" }}>
            <span onClick={() => sorting("price")} className="sort">
              비용
            </span>
          </th>
          <th style={{ width: "64px" }}>
            <span onClick={() => sorting("create_date")} className="sort">
              등록일
            </span>
          </th>
          <th style={{ width: "64px" }}>
            <span onClick={() => sorting("close_date")} className="sort">
              마감일
            </span>
          </th>
          <th style={{ width: "64px" }}>
            <span
              onClick={() => sorting("create_uid")}
              className="sort"
              data-sort="js-lists-values-employee-name"
            >
              작성자
            </span>
          </th>
          <th style={{ width: "64px" }}>
            <span onClick={() => sorting("state")} className="sort">
              상태
            </span>
          </th>
        </tr>
      </thead>
      <tbody className="list" id="staff">
        {list.map((eventInfo) => (
          <CheckableEventListItem
            eventInfo={eventInfo}
            key={eventInfo.id}
            no={no++}
            isModal={isModal}
            addCheckedItem={addCheckedItem}
            removeCheckedItem={removeCheckedItem}
          />
        ))}
      </tbody>
    </table>
  );
};

export default CheckableEventList;
