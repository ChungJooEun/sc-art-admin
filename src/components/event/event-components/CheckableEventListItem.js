import React from "react";

const CheckableEventListItem = () => {
  return (
    <tr class="selected">
      <td class="pr-0">
        <div class="custom-control custom-checkbox">
          <input
            type="checkbox"
            class="custom-control-input js-check-selected-row"
            checked=""
            id="customCheck1_1"
          />
          <label class="custom-control-label" for="customCheck1_1">
            <span class="text-hide">Check</span>
          </label>
        </div>
      </td>
      <td class="js-lists-values-place small">55</td>
      <td class="text-aline-left">
        <div
          class="media flex-nowrap align-items-center"
          style={{ whiteSpace: "nowrap" }}
        >
          <div class="media-body">
            <div class="d-flex flex-column">
              <p class="mb-0 txt_line_table_title">
                <a href="../event/event-detail.html">
                  <strong class="js-lists-values-cultural-event">
                    행사이름
                  </strong>
                </a>
              </p>
              <small class="js-lists-values-employee-email text-50"></small>
            </div>
          </div>
        </div>
      </td>
      <td>
        <a class="chip chip-outline-secondary js-lists-values-tag">공연</a>
      </td>
      <td class="js-lists-values-place small">장소1</td>
      <td class="js-lists-values-price small">₩12,402</td>
      <td class="js-lists-values-registration-date small">2021.07.12</td>
      <td class="js-lists-values-deadline small">2021.07.12</td>
      <td class="js-lists-values-employer-name small">관리자1</td>
      <td class="js-lists-values-status small">대기 중</td>
    </tr>
  );
};

export default CheckableEventListItem;
