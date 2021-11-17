import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const addDot = (string) => {
  let result = "";

  if (typeof string === "string") {
    return result.concat(
      string.slice(0, 4),
      ".",
      string.slice(4, 6),
      ".",
      string.slice(6)
    );
  } else {
    return string;
  }
};

const ModifiablePlaceListItem = ({ placeInfo, no, modifyPlaceState }) => {
  const history = useHistory();

  const onChangeState = (e) => {
    modifyPlaceState(placeInfo.id, e.target.value);
  };

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
                    history.push(
                      `/place/place-application-detail/${placeInfo.id}`
                    )
                  }
                >
                  <strong className="js-lists-values-cultural-event">
                    {placeInfo.name}
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
          {placeInfo.space_type_name}
        </span>
      </td>
      <td className="js-lists-values-place small">{placeInfo.address1}</td>
      <td className="js-lists-values-registration-date small">
        {addDot(placeInfo.create_date)}
      </td>
      <td className="js-lists-values-employer-name small">
        {placeInfo.userid}
      </td>
      <td className="js-lists-values-status small">
        <select
          id="select01"
          data-toggle="select"
          className="form-control"
          defaultValue={placeInfo.state}
          onChange={(e) => onChangeState(e)}
        >
          <option value="WAIT">대기중</option>
          <option value="POST">게시</option>
          <option value="REJECT">기각</option>
        </select>
      </td>
    </tr>
  );
};

export default ModifiablePlaceListItem;
