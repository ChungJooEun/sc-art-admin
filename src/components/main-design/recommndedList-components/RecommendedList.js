import React from "react";
import RecommendedListItem from "./RecommendedListItem";

const RecommendedList = () => {
  return (
    <div className="row card-group-row" data-toggle="dragula">
      <RecommendedListItem />
      <RecommendedListItem />
      <RecommendedListItem />
    </div>
  );
};

export default RecommendedList;
