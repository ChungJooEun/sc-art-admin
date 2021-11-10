import React from "react";

const replaceString = (string) => {
  return string.replace(/-/gi, ".");
};

const CheckableEventListItem = ({ eventInfo, no, isModal }) => {
  return (
    <tr className="selected">
      <td className="pr-0">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input js-check-selected-row"
            checked=""
            id="customCheck1_1"
          />
          <label className="custom-control-label" for="customCheck1_1">
            <span className="text-hide">Check</span>
          </label>
        </div>
      </td>
      <td className="js-lists-values-place small">{no}</td>
      <td className="text-aline-left">
        <div
          className="media flex-nowrap align-items-center"
          style={{ whiteSpace: "nowrap" }}
        >
          <div className="media-body">
            <div className="d-flex flex-column">
              <p className="mb-0 txt_line_table_title">
                <a
                  onClick={() => (window.location.href = "/event/event-detail")}
                >
                  <strong className="js-lists-values-cultural-event">
                    {eventInfo.name}
                  </strong>
                </a>
              </p>
              <small className="js-lists-values-employee-email text-50"></small>
            </div>
          </div>
        </div>
      </td>
      <td>
        <a
          className={
            isModal
              ? "js-lists-values-employer-name small"
              : "chip chip-outline-secondary js-lists-values-tag"
          }
        >
          {eventInfo.event_type_name}
        </a>
      </td>
      <td className="js-lists-values-place small">{eventInfo.address}</td>
      <td className="js-lists-values-price small">
        {eventInfo.price === 0 ? "무료" : `${eventInfo.price}원`}
      </td>
      <td className="js-lists-values-registration-date small">
        {replaceString(eventInfo.create_date)}
      </td>
      <td className="js-lists-values-deadline small">
        {replaceString(eventInfo.close_date)}
      </td>
      <td className="js-lists-values-employer-name small">
        {eventInfo.writer}
      </td>
      <td className="js-lists-values-status small">{eventInfo.state}</td>
    </tr>
  );
};

export default CheckableEventListItem;
