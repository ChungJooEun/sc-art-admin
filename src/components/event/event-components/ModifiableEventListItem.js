import React from "react";
import { useHistory } from "react-router-dom";
// const replaceString = (string) => {
//   return string.replace(/-/gi, ".");
// };

const addDot = (string) => {
  let result = "";
  return result.concat(
    string.slice(0, 4),
    ".",
    string.slice(4, 6),
    ".",
    string.slice(6)
  );
};

const ModifiableEventListItem = ({ eventInfo, no }) => {
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
              <a
                onClick={() =>
                  history.push(
                    `/event/event-application-detail/${eventInfo.id}`
                  )
                }
                className="mb-0 txt_line_table_title"
              >
                <strong className="js-lists-values-cultural-event">
                  {eventInfo.name}
                </strong>
              </a>
              <small className="js-lists-values-employee-email text-50"></small>
            </div>
          </div>
        </div>
      </td>
      <td>
        <a className="chip chip-outline-secondary js-lists-values-tag">
          {eventInfo.event_type_name}
        </a>
      </td>
      <td className="js-lists-values-place small">{eventInfo.address1}</td>
      <td className="js-lists-values-price small">
        {" "}
        {eventInfo.price === 0 ? "무료" : `${eventInfo.price}원`}
      </td>
      <td className="js-lists-values-registration-date small">
        {addDot(eventInfo.create_date)}
      </td>
      <td className="js-lists-values-deadline small">
        {" "}
        {addDot(eventInfo.close_date)}
      </td>
      <td className="js-lists-values-employer-name small">
        {eventInfo.creator}
      </td>
      <td className="js-lists-values-status small">
        <select
          id="select01"
          data-toggle="select"
          className="form-control"
          value={eventInfo.state}
        >
          <option value="WAIT">대기중</option>
          <option value="POST">게시</option>
          <option value="TEMP_SAVE">기각</option>
        </select>
      </td>
    </tr>
  );
};

export default ModifiableEventListItem;
