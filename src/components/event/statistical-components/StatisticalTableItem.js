import React from "react";

const StatisticalTableItem = () => {
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
      <td className="js-lists-values-place small">5</td>
      <td className="text-aline-left">
        <div
          className="media flex-nowrap align-items-center"
          style={{ whiteSpace: "nowrap" }}
        >
          <div className="media-body">
            <div className="d-flex flex-column">
              <p className="mb-0 txt_line_table_title">
                <a href="../event/event-detail.html">
                  <strong className="js-lists-values-cultural-event">
                    행사이름행사이름행사이름행사이름행사이름행사이름행사이름행사이름
                  </strong>
                </a>
              </p>
              <small className="js-lists-values-employee-email text-50"></small>
            </div>
          </div>
        </div>
      </td>
      <td>
        <a className="chip chip-outline-secondary js-lists-values-tag">기타</a>
      </td>
      <td className="js-lists-values-place small">장소1</td>
      <td className="js-lists-values-star small">
        <i className="material-icons material-icons-point icon-16pt">star</i>
        4.5
      </td>
      <td className="js-lists-values-review small">10</td>
      <td className="js-lists-values-heart small">10</td>
      <td className="js-lists-values-click small">1112</td>
    </tr>
  );
};

export default StatisticalTableItem;
