import React from "react";

const replaceString = (string) => {
  return string.replace(/-/gi, ".");
};

const ModifiablePlaceListItem = ({ placeInfo, no }) => {
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
                    (window.location.href = "/place/place-application-detail")
                  }
                >
                  <strong className="js-lists-values-cultural-event">
                    {placeInfo.name}{" "}
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
      <td className="js-lists-values-place small">{placeInfo.address}</td>
      <td className="js-lists-values-registration-date small">
        {replaceString(placeInfo.create_date)}
      </td>
      <td className="js-lists-values-employer-name small">관리자1</td>
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
