import React from "react";
import { useHistory } from "react-router-dom";

const StatisticalTableItem = ({ eventInfo, no }) => {
  const history = useHistory();
  return (
    <tr>
      <td className="js-lists-values-place small">{no}</td>
      <td className="text-aline-left">
        <div
          className="media flex-nowrap align-items-center"
          style={{ whiteSpace: "nowrap" }}
        >
          <div className="media-body">
            <div className="d-flex flex-column">
              <p className="mb-0 txt_line_table_title">
                <span
                  onClick={() =>
                    history.push(`/event/event-detail/${eventInfo.id}`)
                  }
                >
                  <strong className="js-lists-values-cultural-event">
                    {eventInfo.title}
                  </strong>
                </span>
              </p>
              <small className="js-lists-values-employee-email text-50"></small>
            </div>
          </div>
        </div>
      </td>
      <td>
        <span className="chip chip-outline-secondary js-lists-values-tag">
          {
            {
              SHOW: "공연",
              EXHIBITION: "전시",
              OTHER: "기타",
            }[eventInfo.eventType]
          }
        </span>
      </td>
      <td className="js-lists-values-place small">{eventInfo.location}</td>
      <td className="js-lists-values-star small">
        <i className="material-icons material-icons-point icon-16pt">star</i>
        {eventInfo.averageScore}
      </td>
      <td className="js-lists-values-review small">
        {eventInfo.totalReviewRows}
      </td>
      <td className="js-lists-values-heart small">{eventInfo.totalLikeRows}</td>
      <td className="js-lists-values-click small">{eventInfo.viewCount}</td>
    </tr>
  );
};

export default StatisticalTableItem;
