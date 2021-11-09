import React from "react";

const RelatedSiteFormListItem = () => {
  return (
    <div className="list-group-item">
      <div className="form-group row align-items-center mb-0">
        <div className="col-md-3">
          <select id="custom-select" className="form-control custom-select">
            <option selected="">홈페이지</option>
            <option value="1">블로그</option>
            <option value="2">인스타그램</option>
            <option value="3">페이스북</option>
            <option value="4">유튜브</option>
            <option value="5">기타</option>
          </select>
        </div>
        <div className="col-md-3">
          <input
            id="maskSample01"
            type="text"
            className="form-control"
            placeholder="링크이름"
            data-mask="#.##0,00"
            data-mask-reverse="true"
            autocomplete="off"
          />
        </div>
        <div className="col-md-6">
          <input
            id="maskSample01"
            type="url"
            className="form-control"
            placeholder="www.site.com"
            data-mask="#.##0,00"
            data-mask-reverse="true"
            autocomplete="off"
          />
        </div>
      </div>
    </div>
  );
};

export default RelatedSiteFormListItem;
