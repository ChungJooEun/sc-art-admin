import React from "react";
import { useHistory } from "react-router-dom";

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

const ModifiablePlaceListItem = ({ placeInfo, no }) => {
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
                <a
                  onClick={() =>
                    history.push("/place/place-application-detail")
                  }
                >
                  <strong className="js-lists-values-cultural-event">
                    {placeInfo.name}
                  </strong>
                </a>
              </p>
              <small className="js-lists-values-employee-email text-50"></small>
            </div>
          </div>
        </div>
      </td>
      <td>
        <a className="chip chip-outline-secondary js-lists-values-tag">
          {placeInfo.space_type_name}
        </a>
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
          value={placeInfo.state}
        >
          <option value="대기중">대기중</option>
          <option value="게시">게시</option>
          <option value="기각">기각</option>
        </select>
      </td>
    </tr>
  );
};

export default ModifiablePlaceListItem;
