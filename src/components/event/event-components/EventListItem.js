import React from "react";

const EventListItem = () => {
  return (
    <tr>
      <td className="js-lists-values-place small">55</td>
      <td className="text-aline-left">
        <div
          className="media flex-nowrap align-items-center"
          style={{ whiteSpace: "nowrap" }}
        >
          <div className="media-body">
            <div className="d-flex flex-column">
              <p className="mb-0 txt_line_table_title">
                <a href="../event/event-detail.html">
                  <strong className="js-lists-values-cultural-event">
                    행사이름
                  </strong>
                </a>
              </p>
              <small className="js-lists-values-employee-email text-50"></small>
            </div>
          </div>
        </div>
      </td>
      <td>
        <a href="" className="chip chip-outline-secondary js-lists-values-tag">
          기타
        </a>
      </td>
      <td className="js-lists-values-place small">장소1</td>
      <td className="js-lists-values-price small">₩12,402</td>
      <td className="js-lists-values-registration-date small">2021.07.12</td>
      <td className="js-lists-values-deadline small">2021.07.12</td>
      <td className="js-lists-values-employer-name small">관리자1</td>
      <td className="js-lists-values-status small">대기 중</td>
    </tr>
  );
};

export default EventListItem;
