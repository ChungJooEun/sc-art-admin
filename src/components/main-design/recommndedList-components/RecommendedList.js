import React from "react";
import RecommendedListItem from "./RecommendedListItem";

const RecommendedList = ({ list, deletItem, getSortNumber, totalCount }) => {
  return (
    <div className="row card-group-row" data-toggle="dragula">
      {list.map((listItem) => (
        <RecommendedListItem
          listItem={listItem}
          totalCount={totalCount}
          key={listItem.id}
          deletItem={deletItem}
          getSortNumber={getSortNumber}
        />
      ))}
    </div>
  );
};

export default RecommendedList;
