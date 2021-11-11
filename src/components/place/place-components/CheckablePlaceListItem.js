import React from "react";

const replaceString = (string) => {
  return string.replace(/-/gi, ".");
};

const CheckablePlaceListItem = ({ placeInfo, no, isModal }) => {
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
                <a
                  onClick={() => (window.location.href = "/place/place-detail")}
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
        <a
          className={
            isModal
              ? "js-lists-values-employer-name small"
              : "chip chip-outline-secondary js-lists-values-tag"
          }
        >
          {placeInfo.space_type_name}
        </a>
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
        {placeInfo.state}
      </td>
    </tr>
  );
};

export default CheckablePlaceListItem;
