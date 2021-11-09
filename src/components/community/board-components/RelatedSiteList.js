import React from "react";
import RelatedSiteListItem from "./RelatedSiteListItem";

const RelatedSiteList = () => {
  return (
    <div className="con">
      <ul
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "40px",
        }}
      >
        <RelatedSiteListItem />
        <RelatedSiteListItem />
        <RelatedSiteListItem />
        <RelatedSiteListItem />
        <RelatedSiteListItem />
      </ul>
      <ul
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "40px",
        }}
      >
        <RelatedSiteListItem />
        <RelatedSiteListItem />
        <RelatedSiteListItem />
        <RelatedSiteListItem />
        <RelatedSiteListItem />
      </ul>
    </div>
  );
};

export default RelatedSiteList;
