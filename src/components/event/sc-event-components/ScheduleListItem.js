import React from "react";

const ScheduleListItem = () => {
  return (
    <tr>
      <td className="text-aline-left"></td>
      <td>
        <p className="chip chip-outline-secondary">18:00</p>
      </td>
      <td className="js-lists-values-place small">
        <p className="mb-0 event-list-title">행사제목</p>
        <small className="js-lists-values-email text-50"></small>
      </td>
    </tr>
  );
};
export default ScheduleListItem;
