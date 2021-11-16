import React from "react";
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

const CheckableScEventListItem = ({ scInfo, no }) => {
  const history = useHistory();

  const getState = () => {
    const today = new Date();
    const startDate = new Date(
      parseInt(scInfo.open_date.slice(0, 4)),
      parseInt(scInfo.open_date.slice(4, 6)) - 1,
      parseInt(scInfo.open_date.slice(6))
    );
    const endDate = new Date(
      parseInt(scInfo.close_date.slice(0, 4)),
      parseInt(scInfo.close_date.slice(4, 6)) - 1,
      parseInt(scInfo.close_date.slice(6))
    );

    if (today < startDate) {
      return "대기중";
    } else if (startDate <= today && today <= endDate) {
      return "진행중";
    } else if (endDate < today) {
      return "종료";
    }
  };

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
          <label className="custom-control-label" htmlFor="customCheck1_1">
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
