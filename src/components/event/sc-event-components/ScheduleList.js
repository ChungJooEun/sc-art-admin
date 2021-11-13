import React from "react";

import ScheduleListItem from "./ScheduleListItem";

const ScheduleList = () => {
  return (
    <table className="table mb-0 thead-border-top-0 table-nowrap">
      <tbody className="list" id="staff">
        <tr>
          <td className="text-aline-left">
            <div className="h2 mb-0 mr-3">01/01</div>
            <small className="text-20">2021 월요일</small>
          </td>
          <td>
            <p className="chip chip-outline-secondary">18:00</p>
          </td>
          <td className="js-lists-values-place small">
            <p className="mb-0 event-list-title">행사제목</p>
            <small className="js-lists-values-email text-50"></small>
          </td>
        </tr>
        <ScheduleListItem />
        <ScheduleListItem />
        <ScheduleListItem />
      </tbody>
    </table>
  );
};

export default ScheduleList;
