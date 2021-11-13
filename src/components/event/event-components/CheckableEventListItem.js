import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

const replaceString = (string) => {
  return string.replace(/-/gi, ".");
};

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

const CheckableEventListItem = ({
  eventInfo,
  no,
  isModal,
  addCheckedItem,
  removeCheckedItem,
}) => {
  const history = useHistory();
  const [checked, setChecked] = useState(false);

  const checkBox = useRef();

  const onChangeCheckBox = () => {
    if (checked === false) {
      setChecked(!checked);
      checkBox.current.checked = true;
      addCheckedItem(eventInfo);
    } else {
      setChecked(!checked);
      checkBox.current.checked = false;
      removeCheckedItem(eventInfo.id);
    }
  };
  return (
    <tr className={checked ? "selected" : ""}>
      <td className="pr-0">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input js-check-selected-row"
            ref={checkBox}
          />
          <label
            className="custom-control-label"
            htmlFor="customCheck1_1"
            onClick={() => onChangeCheckBox()}
          >
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
                  onClick={() =>
                    history.push(`/event/event-detail/${eventInfo.id}`)
                  }
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
      <td className="js-lists-values-place small">{eventInfo.address1}</td>
      <td className="js-lists-values-price small">
        {eventInfo.price === 0 ? "무료" : `${eventInfo.price}원`}
      </td>
      <td className="js-lists-values-registration-date small">
        {addDot(replaceString(eventInfo.create_date.slice(0, 10)))}
      </td>
      <td className="js-lists-values-deadline small">
        {addDot(eventInfo.close_date)}
      </td>
      <td className="js-lists-values-employer-name small">
        {eventInfo.creator}
      </td>
      <td className="js-lists-values-status small">{eventInfo.state_name}</td>
    </tr>
  );
};

export default CheckableEventListItem;
