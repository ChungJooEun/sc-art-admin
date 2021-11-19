import React from "react";

import CheckablePlaceListItem from "../place-components/CheckablePlaceListItem";

const CheckablePlaceList = ({
  list,
  pageNumber,
  count,
  isModal,
  sorting,
  addCheckedList,
  removeNoneCheckedList,
  disabledList,
}) => {
  let no = (pageNumber - 1) * count + 1;

  const isDisable = (id) => {
    if (disabledList) {
      for (let i = 0; i < disabledList.length; i++) {
        if (disabledList[i].id === id) {
          return true;
        }
      }
    }
    return false;
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
            <span className="sort" onClick={() => sorting("name")}>
              공간명
            </span>
          </th>
          <th style={{ width: "48px" }}>
            <span className="sort" onClick={() => sorting("space_type")}>
              종류
            </span>
          </th>
          <th style={{ width: "80px" }}>
            <span className="sort" onClick={() => sorting("address1")}>
              위치
            </span>
          </th>
          <th style={{ width: "64px" }}>
            <span className="sort" onClick={() => sorting("create_date")}>
              등록일
            </span>
          </th>
          <th style={{ width: "64px" }}>
            <span className="sort" onClick={() => sorting("create_uid")}>
              작성자
            </span>
          </th>
          <th style={{ width: "64px" }}>
            <span className="sort" onClick={() => sorting("state")}>
              상태
            </span>
          </th>
        </tr>
      </thead>
      <tbody className="list" id="staff">
        {list.map((placeInfo) => (
          <CheckablePlaceListItem
            key={placeInfo.id + no}
            placeInfo={placeInfo}
            no={no++}
            isModal={isModal}
            addCheckedItem={addCheckedList}
            removeCheckedItem={removeNoneCheckedList}
            isDisable={isDisable(placeInfo.id)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default CheckablePlaceList;
