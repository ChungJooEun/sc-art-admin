import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";

const calcRate = (sum, num) => {
  return parseInt((num / sum) * 100);
};

const CultrualEventByField = ({ period }) => {
  const [totalRows, setTotalRows] = useState(0);
  const [data, setData] = useState(null);

  const getEventStat = useCallback(async () => {
    const url =
      "https://culture.seocho.go.kr:8443/cultural-service/api/v2/admin/stat/event/type";

    try {
      const response = await axios.get(url, {
        params: {
          openDate: period.from_date,
          closeDate: period.to_date,
        },
      });

      if (response.status === 200) {
        const data = response.data;

        setTotalRows(data.totalRows);

        let ary = [
          {
            type: "공연",
            totalCount: data.totalShowRows,
            rate: calcRate(data.totalRows, data.totalShowRows),
          },
          {
            type: "전시",
            totalCount: data.totalExhibitionRows,
            rate: calcRate(data.totalRows, data.totalExhibitionRows),
          },
          {
            type: "기타",
            totalCount: data.totalOtherRows,
            rate: calcRate(data.totalRows, data.totalOtherRows),
          },
        ];

        ary = ary.sort((a, b) => {
          if (a.totalCount < b.totalCount) return 1;
          else if (a.totalCount === b.totalCount) {
            if (a.type < b.type) return 1;
          } else {
            return -1;
          }
        });

        setData(ary);
      }
    } catch (e) {
      console.log(e);
    }
  }, [period]);

  useEffect(() => {
    getEventStat();
  }, [getEventStat]);

  if (data === null) {
    return <div></div>;
  }

  return (
    <div className="col-lg-6">
      <div className="page-separator">
        <div className="page-separator__text">분야별 문화행사</div>
      </div>
      <div className="card">
        <div className="card-body p-24pt">
          <div className="row">
            <div className="col-6">
              <div className="nav border-0">
                <div className="row no-gutters flex" role="tablist">
                  <div className="col-auto">
                    <div className="d-flex align-items-center">
                      <div className="h2 mb-0 mr-3">{totalRows}</div>
                      <div className="flex">
                        <p className="mb-0">
                          <strong>전체 문화행사</strong>
                        </p>
                        <p className="text-50 mb-0 lh-1"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chart" style={{ height: "262px" }}>
                <div className="chartjs-size-monitor">
                  <div className="chartjs-size-monitor-expand">
                    <div className=""></div>
                  </div>
                  <div className="chartjs-size-monitor-shrink">
                    <div className=""></div>
                  </div>
                </div>
                <div className="text-center fullbleed d-flex align-items-center justify-content-center flex-column z-0">
                  <h2 className="m-0">{data[0].rate}%</h2>
                  <strong>{data[0].type}</strong>
                </div>
                <Doughnut
                  className="chart-canvas position-relative z-1 chartjs-render-monitor"
                  id="attendanceDoughnutChart"
                  style={{ display: "block", height: "262px", width: "263px" }}
                  width={526}
                  height={524}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    maintainAspectRatio: false,
                    responsive: true,
                    cutout: 60,
                  }}
                  data={{
                    labels: [data[0].type, data[1].type, data[2].type],
                    datasets: [
                      {
                        data: [data[0].rate, data[1].rate, data[2].rate],
                        backgroundColor: [
                          "rgba(33, 150, 243, 1)",
                          "rgb(0, 188, 194)",
                          "#B1BBC9",
                        ],
                        borderColor: [
                          "rgba(33, 150, 243, 1)",
                          "rgb(0, 188, 194)",
                          "#B1BBC9",
                        ],
                        borderWidth: 0,
                        hoverOffset: 2,
                      },
                    ],
                  }}
                />
              </div>
            </div>
            <div className="col-6">
              <div
                id="attendanceDoughnutChartLegend"
                className="chart-legend chart-legend--vertical mt-24pt"
              >
                <span className="chart-legend-item">
                  <i
                    className="chart-legend-indicator"
                    style={{ backgroundColor: "rgba(33, 150, 243, 1)" }}
                  ></i>
                  {`${data[0].type} ${data[0].rate}%`}
                </span>
                <span className="chart-legend-item">
                  <i
                    className="chart-legend-indicator"
                    style={{ backgroundColor: "rgb(0, 188, 194)" }}
                  ></i>
                  {`${data[1].type} ${data[1].rate}%`}
                </span>
                <span className="chart-legend-item">
                  <i
                    className="chart-legend-indicator"
                    style={{ backgroundColor: "#B1BBC9" }}
                  ></i>
                  {`${data[2].type} ${data[2].rate}%`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CultrualEventByField;
