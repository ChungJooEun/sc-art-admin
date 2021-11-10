import React from "react";

const replaceString = (string) => {
  return string.replace(/-/gi, ".");
};

const CheckableEventListItem = ({ eventInfo, no }) => {
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
      <td class="js-lists-values-place small">{no}</td>
      <td class="text-aline-left">
        <div
          class="media flex-nowrap align-items-center"
          style={{ whiteSpace: "nowrap" }}
        >
          <div class="media-body">
            <div class="d-flex flex-column">
              <p class="mb-0 txt_line_table_title">
                <a
                  onClick={() => (window.location.href = "/event/event-detail")}
                >
                  <strong class="js-lists-values-cultural-event">
                    {eventInfo.name}
                  </strong>
                </a>
              </p>
              <small class="js-lists-values-employee-email text-50"></small>
            </div>
          </div>
        </div>
      </td>
      <td>
        <a class="chip chip-outline-secondary js-lists-values-tag">
          {eventInfo.event_type_name}
        </a>
      </td>
      <td class="js-lists-values-place small">{eventInfo.address}</td>
      <td class="js-lists-values-price small">
        {eventInfo.price === 0 ? "무료" : `${eventInfo.price}원`}
      </td>
      <td class="js-lists-values-registration-date small">
        {replaceString(eventInfo.create_date)}
      </td>
      <td class="js-lists-values-deadline small">
        {replaceString(eventInfo.close_date)}
      </td>
      <td class="js-lists-values-employer-name small">{eventInfo.writer}</td>
      <td class="js-lists-values-status small">{eventInfo.state}</td>
    </tr>
  );
};

export default CheckableEventListItem;
