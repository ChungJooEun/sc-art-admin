import React, { useState, useEffect } from "react";
import axios from "axios";

import SummaryLineGraph from "./summary-components/SummaryLineGraph";
import SummaryBarGraph from "./summary-components/SummaryBarGraph";

const labelParing = (dateString) => {
  return dateString.slice(4, 6) + "/" + dateString.slice(6);
};

const calcTotalCount = (data) => {
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    sum += data[i];
  }

  return sum;
};

const Summary = () => {
  const [visitorCount, setVisitorCount] = useState({ labels: [], data: [] });
  const [subscriberCount, setSubscriberCount] = useState({
    labels: [],
    data: [],
  });
  const [reviewCount, setReviewCount] = useState({ labels: [], data: [] });
  const [placeCount, setPlaceCount] = useState({
    labels: { last_week: [], thisWeek: [] },
    data: { last_week: [], thisWeek: [] },
  });
  const [eventCount, setEventCount] = useState({
    labels: { last_week: [], thisWeek: [] },
    data: { last_week: [], thisWeek: [] },
  });

  useEffect(() => {
    const getSummary = async () => {
      const url = "http://118.67.154.118:3000/api/admin/dashboard/list";
      // const url = "http://localhost:3000/api/admin/dashboard/list";

      try {
        const res = await axios.get(url);

        if (res.status === 200) {
          let lastWeek = res.data.list.last_week.sort((a, b) => {
            if (a.base_day < b.base_day) return -1;
            else if (a.base_day > b.base_day) return 1;

            return 0;
          });
          let thisWeek = res.data.list.this_week.sort((a, b) => {
            if (a.base_day < b.base_day) return -1;
            else if (a.base_day > b.base_day) return 1;

            return 0;
          });

          let visitorAry = { labels: [], data: [] };
          let subscriberAry = { labels: [], data: [] };
          let reviewAry = { labels: [], data: [] };

          let eventAry = {
            labels: { lastWeek: [], thisWeek: [] },
            data: { lastWeek: [], thisWeek: [] },
          };
          let placeAry = {
            labels: { lastWeek: [], thisWeek: [] },
            data: { lastWeek: [], thisWeek: [] },
          };
          let label_this;
          let label_last;

          for (let i = 0; i < lastWeek.length; i++) {
            label_last = labelParing(lastWeek[i].base_day);
            label_this = labelParing(thisWeek[i].base_day);

            visitorAry.labels.push(label_this);
            subscriberAry.labels.push(label_this);
            reviewAry.labels.push(label_this);

            visitorAry.data.push(thisWeek[i].visitor_count);
            subscriberAry.data.push(thisWeek[i].subscriber_count);
            reviewAry.data.push(thisWeek[i].review_count);

            eventAry.labels.lastWeek.push(label_last);
            placeAry.labels.lastWeek.push(label_last);

            eventAry.data.lastWeek.push(lastWeek[i].event_count);
            placeAry.data.lastWeek.push(lastWeek[i].space_count);

            eventAry.labels.thisWeek.push(label_this);
            placeAry.labels.thisWeek.push(label_this);

            eventAry.data.thisWeek.push(thisWeek[i].event_count);
            placeAry.data.thisWeek.push(thisWeek[i].space_count);
          }

          setVisitorCount(visitorAry);
          setSubscriberCount(subscriberAry);
          setReviewCount(reviewAry);
          setEventCount(eventAry);
          setPlaceCount(placeAry);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getSummary();
  }, []);

  return (
    <div className="page-section">
      <div className="page-separator">
        <div className="page-separator__text">개요</div>
      </div>
      <div className="row mb-lg-8pt">
        <SummaryLineGraph
          graphTitle="사이트 방문"
          totalCount={calcTotalCount(visitorCount.data)}
          data={{
            labels: visitorCount.labels,
            datasets: [
              {
                label: "",
                data: visitorCount.data,
                fill: true,
                lineTension: 0.5,
                backgroundColor: "rgba(15, 107, 255, 0.1)",
                borderColor: "rgb(30, 128, 240)",
                borderWidth: 2,
              },
            ],
          }}
        />
        <SummaryLineGraph
          graphTitle="신규 가입"
          totalCount={calcTotalCount(subscriberCount.data)}
          data={{
            labels: subscriberCount.labels,
            datasets: [
              {
                label: "",
                data: subscriberCount.data,
                fill: true,
                lineTension: 0.5,
                backgroundColor: "rgba(15, 107, 255, 0.1)",
                borderColor: "rgb(30, 128, 240)",
                borderWidth: 2,
              },
            ],
          }}
        />
      </div>
      <div className="row mb-lg-8pt">
        <SummaryLineGraph
          graphTitle="신규 리뷰"
          totalCount={calcTotalCount(reviewCount.data)}
          data={{
            labels: reviewCount.labels,
            datasets: [
              {
                label: "",
                data: reviewCount.data,
                fill: true,
                lineTension: 0.5,
                backgroundColor: "rgba(15, 107, 255, 0.1)",
                borderColor: "rgb(30, 128, 240)",
                borderWidth: 2,
              },
            ],
          }}
        />
      </div>

      <div className="row card-group-row mb-lg-8pt">
        <SummaryBarGraph
          graphTitle="신규 등록 행사"
          totalCount={calcTotalCount(eventCount.data.thisWeek)}
          data={{
            labels: eventCount.labels.thisWeek,
            datasets: [
              {
                label: "지난주",
                data: eventCount.data.lastWeek,
                fill: true,
                backgroundColor: "rgb(220, 230, 244)",
                borderColor: "rgb(220, 230, 244)",
                borderWidth: 1,
                borderRadius: 7,
              },
              {
                label: "이번주",
                data: eventCount.data.thisWeek,
                fill: true,
                backgroundColor: "rgb(30, 128, 240)",
                borderColor: "rgb(30, 128, 240)",
                borderWidth: 1,
                borderRadius: 7,
              },
            ],
          }}
        />
        <SummaryBarGraph
          graphTitle="신규 등록 공간"
          totalCount={calcTotalCount(placeCount.data.thisWeek)}
          data={{
            labels: placeCount.labels.thisWeek,
            datasets: [
              {
                label: "지난주",
                data: placeCount.data.lastWeek,
                fill: true,
                backgroundColor: "rgb(220, 230, 244)",
                borderColor: "rgb(220, 230, 244)",
                borderWidth: 1,
                borderRadius: 7,
              },
              {
                label: "이번주",
                data: placeCount.data.thisWeek,
                fill: true,
                backgroundColor: "rgb(30, 128, 240)",
                borderColor: "rgb(30, 128, 240)",
                borderWidth: 1,
                borderRadius: 7,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Summary;
