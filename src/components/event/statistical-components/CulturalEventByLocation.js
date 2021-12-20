import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const calcRate = (sum, num) => {
  return parseInt((num / sum) * 100);
};

const CulturalEventByLocation = ({ period }) => {
  const [totalRows, setTotalRows] = useState(0);
  const [stat, setStat] = useState([]);

  const getEventStat = useCallback(async () => {
    const url =
      "https://culture.seocho.go.kr:8443/cultural-service/api/v2/admin/stat/event/location";

    try {
      const response = await axios.get(url, {
        params: {
          openDate: period.from_date,
          closeDate: period.to_date,
        },
      });

      if (response.status === 200) {
        const { totalRows, data } = response.data;

        setTotalRows(totalRows);

        let ary = [];

        for (let i = 0; i < data.length; i++) {
          ary.push({
            location: data[i].location,
            totalCount: data[i].totalEventRows,
            rate: calcRate(totalRows, data[i].totalEventRows),
          });
        }

        setStat(ary);
      }
    } catch (e) {
      console.log(e);
    }
  }, [period]);

  useEffect(() => {
    getEventStat();
  }, [getEventStat]);

  return (
    <div className="col-lg-6">
      <div className="page-separator">
        <div className="page-separator__text">장소별 문화행사</div>
      </div>

      <div className="card card-group-row__card">
        <div className="card-header p-0 nav">
          <div className="row no-gutters flex" role="tablist">
            <div className="col-auto">
              <div className="p-card-header d-flex align-items-center">
                <div className="h2 mb-0 mr-3">{totalRows}</div>
                <div className="flex">
                  <p className="mb-0">
                    <strong>전체 문화행사</strong>
                  </p>
                  <p className="text-50 mb-0 d-flex align-items-center"></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body d-flex flex-column">
          <div className="d-flex flex flex-column align-items-center justify-content-center">
            <ul className="list-unstyled list-skills w-100">
              {stat.map((info) => (
                <li className="mb-8pt" key={info.location}>
                  <div className="text-50 border-right">
                    <small>{info.location}</small>
                  </div>
                  <div className="flex">
                    <div className="progress" style={{ height: "4px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: `${info.rate}%` }}
                        aria-valuenow={info.rate}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                  <div className="text-70">
                    <small>{info.totalCount}</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CulturalEventByLocation;
