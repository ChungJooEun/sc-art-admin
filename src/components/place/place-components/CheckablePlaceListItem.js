import React from "react";
import { useHistory } from "react-router-dom";

const replaceString = (string) => {
  return string.replace(/-/gi, ".");
};

const getStateName = (state) => {
  switch (state) {
    case "WAIT":
      return "대기중";
    case "POST":
      return "게시";
    case "PRIVATE":
      return "비공개";
    case "TEMP_SAVE":
      return "임시저장";
    case "REJECT":
      return "기각";
    default:
      return "비공개";
  }
};

const CheckablePlaceListItem = ({ placeInfo, no, isModal }) => {
  const history = useHistory();
  return (
    <tr className="selected">
      <td className="pr-0">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input js-check-selected-row"
            id="customCheck1_4"
          />
          <label className="custom-control-label" for="customCheck1_4">
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
                    history.push(`/place/place-detail/${placeInfo.id}`)
                  }
                >
                  <strong className="js-lists-values-cultural-event">
                    {placeInfo.name}{" "}
                  </strong>
                </span>
              </p>
              <small className="js-lists-values-employee-email text-50"></small>
            </div>
          </div>
        </div>
      </td>
      <td>
        <span
          className={
            isModal
              ? "js-lists-values-employer-name small"
              : "chip chip-outline-secondary js-lists-values-tag"
          }
        >
          {placeInfo.space_type_name}
        </span>
      </td>
      <td className="js-lists-values-place small">{placeInfo.address1}</td>
      <td className="js-lists-values-registration-date small">
        {replaceString(placeInfo.create_date.slice(0, 10))}
      </td>
      <td className="js-lists-values-employer-name small">
        {placeInfo.writer}
      </td>
      <td
        className={
          placeInfo.state === "임시저장"
            ? "js-lists-values-status small status-temporary"
            : "js-lists-values-status small"
        }
      >
        {getStateName(placeInfo.state)}
      </td>
    </tr>
  );
};

export default CheckablePlaceListItem;
