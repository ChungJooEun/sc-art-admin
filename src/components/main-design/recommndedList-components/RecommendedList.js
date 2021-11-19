import React from "react";
import RecommendedListItem from "./RecommendedListItem";

const RecommendedList = ({ list }) => {
  return (
    <div className="row card-group-row" data-toggle="dragula">
      {list.map((listItem) => (
        <RecommendedListItem
          listItem={listItem}
          totalCount={list.length}
          key={listItem.id}
        />
      ))}
    </div>
  );
};

export default RecommendedList;
