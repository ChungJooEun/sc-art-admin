import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

const addDot = (string) => {
  if (string === null) {
    return "";
  }

  let result = "";
  return result.concat(
    string.slice(0, 4),
    ".",
    string.slice(4, 6),
    ".",
    string.slice(6)
  );
};

const convertDateFormat = (date) => {
  let str = "" + date.getFullYear();

  if (date.getMonth() < 9) {
    str += "0" + (date.getMonth() + 1);
  } else {
    str += date.getMonth() + 1;
  }

  if (date.getDate() < 10) {
    str += "0" + date.getDate();
  } else {
    str += date.getDate();
  }
  return str;
};

const CheckableScEventListItem = ({
  scInfo,
  no,
  addCheckedItem,
  removeCheckedItem,
}) => {
  const history = useHistory();

  const getState = () => {
    const today = convertDateFormat(new Date());

    if (today < scInfo.open_date) {
      return "대기중";
    } else if (scInfo.open_date <= today && today <= scInfo.close_date) {
      return "진행중";
    } else {
      return "종료";
    }
  };

  const [checked, setChecked] = useState(false);

  const checkBox = useRef();

  const onChangeCheckBox = () => {
    if (checked === false) {
      setChecked(!checked);
      checkBox.current.checked = true;
      addCheckedItem(scInfo.id);
    } else {
      setChecked(!checked);
      checkBox.current.checked = false;
      removeCheckedItem(scInfo.id);
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
                <span
                  onClick={() =>
                    history.push(`/event/seocho-festival-detail/${scInfo.id}`)
                  }
                >
                  <strong className="js-lists-values-cultural-seocho-festival-name">
                    {scInfo.name}
                  </strong>
                </span>
              </p>
              <small className="js-lists-values-employee-email text-50"></small>
            </div>
          </div>
        </div>
      </td>
      <td className="js-lists-values-registration-date small">
        {addDot(scInfo.create_date)}
      </td>
      <td className="js-lists-values-last-update-date small">
        {addDot(scInfo.last_event_added)}
      </td>
      <td className="js-lists-values-employer-name small">{scInfo.creator}</td>
      <td className="js-lists-values-status small">{getState()}</td>
      <td className="js-lists-values-public small">{scInfo.state_name}</td>
    </tr>
  );
};

export default CheckableScEventListItem;
