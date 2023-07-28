import React, {useState, useEffect, useCallback} from "react";
import axios from "axios";

import SummaryLineGraph from "./summary-components/SummaryLineGraph";
import SummaryBarGraph from "./summary-components/SummaryBarGraph";

const dailyLabelParsing = (dateString) => {
  return `${dateString.slice(4, 6)}/${dateString.slice(6)}`;
};

const monthlyLabelParsing = (dateString) => {
  return `${dateString.slice(0, 4)}/${dateString.slice(4, 6)}`;
}

const calcTotalCount = (data) => {
  let sum = 0;
  data.map((v) => {sum += v;})

  return sum;
};

const getBarChartDataSet = (stat) => {
  const {data, labels} = stat;

  let dataSet = [];

  if(data.lastWeek.length !== 0){
    dataSet.push(
        {
          label: "지난주",
          data: data.lastWeek,
          fill: true,
          backgroundColor: "rgb(220, 230, 244)",
          borderColor: "rgb(220, 230, 244)",
          borderWidth: 1,
          borderRadius: 7,
        },
        {
          label: "이번주",
          data: data.thisWeek,
          fill: true,
          backgroundColor: "rgb(30, 128, 240)",
          borderColor: "rgb(30, 128, 240)",
          borderWidth: 1,
          borderRadius: 7,
        },
    )
  }
  else{
    dataSet.push(
        {
          label: "",
          data: data.thisWeek,
          fill: true,
          backgroundColor: "rgb(30, 128, 240)",
          borderColor: "rgb(30, 128, 240)",
          borderWidth: 1,
          borderRadius: 7,
        },
    )
  }

  return dataSet;
}

const Summary = ({period}) => {
  const [visitorCount, setVisitorCount] = useState({ labels: [], data: [] });
  const [subscriberCount, setSubscriberCount] = useState({
    labels: [],
    data: [],
  });
  const [reviewCount, setReviewCount] = useState({ labels: [], data: [] });
  const [placeCount, setPlaceCount] = useState({
    labels: { lastWeek: [], thisWeek: [] },
    data: { lastWeek: [], thisWeek: [] },
  });
  const [eventCount, setEventCount] = useState({
    labels: { lastWeek: [], thisWeek: [] },
    data: { lastWeek: [], thisWeek: [] },
  });

  const [rangeStatus, setRangeStatus] = useState("D");  // D : daily, M : monthly
  const getDailySummary = async () => {
    const url = "https://culture.seocho.go.kr:3000/api/admin/dashboard/list";

    let params = {};
    if(!period.from_date || !period.to_date){
      let today = new Date();

      today.setDate(today.getDate() - today.getDay() -6);
      let from_date = `${today.getFullYear()}${today.getMonth() < 9 ? `0${today.getMonth() + 1}` : today.getMonth() + 1}${today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()}`;

      today.setDate(today.getDate() + 13);
      let to_date = `${today.getFullYear()}${today.getMonth() < 9 ? `0${today.getMonth() + 1}` : today.getMonth() + 1}${today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()}`;

      params = {
        from_date : from_date,
        to_date : to_date,
      }
    }
    else{
      params = {
        from_date : period.from_date,
        to_date : period.to_date,
      };
    }

    try {
      const res = await axios.get(url, {
        params : params
      });

      if (res.status === 200) {
        let lastWeek = res.data.list.last_week;
        let thisWeek = res.data.list.this_week;

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

        if(period.from_date && period.to_date){
          for (let i = 0; i < lastWeek.length; i++) {
            label_last = dailyLabelParsing(lastWeek[i].base_day);

            visitorAry.labels.push(label_last);
            subscriberAry.labels.push(label_last);
            reviewAry.labels.push(label_last);
            eventAry.labels.thisWeek.push(label_last);
            placeAry.labels.thisWeek.push(label_last);

            visitorAry.data.push(lastWeek[i].visitor_count);
            subscriberAry.data.push(lastWeek[i].subscriber_count);
            reviewAry.data.push(lastWeek[i].review_count);
            eventAry.data.thisWeek.push(lastWeek[i].event_count);
            placeAry.data.thisWeek.push(lastWeek[i].space_count);
          }
        }else{
          for (let i = 0; i < lastWeek.length; i++) {
            label_last = dailyLabelParsing(lastWeek[i].base_day);

            eventAry.labels.lastWeek.push(label_last);
            placeAry.labels.lastWeek.push(label_last);

            eventAry.data.lastWeek.push(lastWeek[i].event_count);
            placeAry.data.lastWeek.push(lastWeek[i].space_count);
          }
        }

        for (let i = 0; i < thisWeek.length; i++) {
          label_this = dailyLabelParsing(thisWeek[i].base_day);

          visitorAry.labels.push(label_this);
          subscriberAry.labels.push(label_this);
          reviewAry.labels.push(label_this);
          eventAry.labels.thisWeek.push(label_this);
          placeAry.labels.thisWeek.push(label_this);

          visitorAry.data.push(thisWeek[i].visitor_count);
          subscriberAry.data.push(thisWeek[i].subscriber_count);
          reviewAry.data.push(thisWeek[i].review_count);

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
  const getMonthlySummary = async () => {
    const url = "https://culture.seocho.go.kr:3000/api/admin/dashboard/list/monthly";

    try {
      const res = await axios.get(url, {
        params : {
          from_date : period.from_date,
          to_date : period.to_date,
        }
      });

      if (res.status === 200) {
        const { list } = res.data;

        let visitorAry = { labels: [], data: [] };
        let subscriberAry = { labels: [], data: [] };
        let reviewAry = { labels: [], data: [] };
        let eventAry = {
          labels: [],
          data: [],
        };
        let placeAry = {
          labels: [],
          data: [],
        };

        let label;

        list.map((stat, i) => {
          label = monthlyLabelParsing(stat.base_month);

          visitorAry.labels.push(label);
          subscriberAry.labels.push(label);
          reviewAry.labels.push(label);
          eventAry.labels.push(label);
          placeAry.labels.push(label);

          visitorAry.data.push(parseInt(stat.visitor_count));
          subscriberAry.data.push(parseInt(stat.subscriber_count));
          reviewAry.data.push(parseInt(stat.review_count));
          eventAry.data.push(parseInt(stat.event_count));
          placeAry.data.push(parseInt(stat.space_count));
        });

        setVisitorCount(visitorAry);
        setSubscriberCount(subscriberAry);
        setReviewCount(reviewAry);
        setEventCount({
          labels: { lastWeek: [], thisWeek: eventAry.labels },
          data: { lastWeek: [], thisWeek: eventAry.data },
        });
        setPlaceCount({
          labels: { lastWeek: [], thisWeek: placeAry.labels },
          data: { lastWeek: [], thisWeek: placeAry.data },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if(period.from_date && period.to_date){
        let fromDate = new Date(`${period.from_date.slice(0,4)}-${period.from_date.slice(4,6)}-${period.from_date.slice(6)}`);
        let toDate = new Date(`${period.to_date.slice(0,4)}-${period.to_date.slice(4,6)}-${period.to_date.slice(6)}`);

        if((fromDate.getFullYear() === toDate.getFullYear() && fromDate.getMonth() === toDate.getMonth()) || ((toDate - fromDate)/(1000 * 60 * 60 * 24) < 31)){
          setRangeStatus("D");
        }else{
          setRangeStatus("M");
        }
    }else{
      setRangeStatus("D");
    }
  },[period])

  useEffect(() => {
    rangeStatus === "D" ? getDailySummary() : getMonthlySummary();
  }, [rangeStatus, period]);

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
          dateRange={(period.from_date && period.to_date) ? `${period.from_date} ~ ${period.to_date}` :  "최근 일주일"}
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
          dateRange={(period.from_date && period.to_date) ? `${period.from_date} ~ ${period.to_date}` :  "최근 일주일"}
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
          dateRange={(period.from_date && period.to_date) ? `${period.from_date} ~ ${period.to_date}` :  "최근 일주일"}
        />
      </div>

      <div className="row card-group-row mb-lg-8pt">
        <SummaryBarGraph
          graphTitle="신규 등록 행사"
          totalCount={calcTotalCount(eventCount.data.thisWeek)}
          data={{
            labels: eventCount.labels.thisWeek,
            datasets: getBarChartDataSet(eventCount),
          }}
          dateRange={(period.from_date && period.to_date) ? `${period.from_date} ~ ${period.to_date}` :  "최근 일주일"}
        />
        <SummaryBarGraph
          graphTitle="신규 등록 공간"
          totalCount={calcTotalCount(placeCount.data.thisWeek)}
          data={{
            labels: placeCount.labels.thisWeek,
            datasets: getBarChartDataSet(placeCount),
          }}
          dateRange={(period.from_date && period.to_date) ? `${period.from_date} ~ ${period.to_date}` :  "최근 일주일"}
        />
      </div>
    </div>
  );
};

export default Summary;
