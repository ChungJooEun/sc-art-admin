// // import React, { useEffect, useState, useCallback, useContext } from "react";
// // import axios from "axios";
// // import EventInfoContext from "../../context/eventInfo";
// // import { useHistory } from "react-router-dom";

// // import GlobalBar from "../basic-components/GlobalBar";
// // import SideMenuBar from "../basic-components/SideMenuBar";
// // import PageTitle from "../basic-components/PageTitle";
// // import Editor from "../basic-components/editor-components/Editor";
// // import VideoAddForm from "../basic-components/video-components/VideoAddForm";
// // import VideoListItem from "../basic-components/video-components/VideoListItem";
// // import PostSaveBtn from "../basic-components/PostSaveBtn";

// // import EventInfoForm from "./add-form-components/EventInfoForm";
// // import ImageForm from "../basic-components/ImageForm";
// // import Curation from "./add-form-components/Curation";

// // const pagePathList = [
// //   {
// //     pageUrl: "/dashboard",
// //     pageName: "홈",
// //   },
// //   {
// //     pageUrl: "/event/event-manage",
// //     pageName: "문화행사 관리",
// //   },
// // ];

// // const convertDateFormat = (str) => {
// //   if (typeof str === Date) {
// //     return "" + str.getFullYear() + (str.getMonth() + 1) + str.getDate();
// //   }
// //   const date = new Date(str);

// //   return "" + date.getFullYear() + (date.getMonth() + 1) + date.getDate();
// // };

// // const AddEventView = ({ options }) => {
// //   const { state, actions } = useContext(EventInfoContext);
// //   const history = useHistory();

// //   const getVideoId = (url) => {
// //     let videoId;

// //     if (url.indexOf("watch?v=") === 24) {
// //       videoId = url.slice(32, 43);
// //     } else {
// //       videoId = url.slice(17, 28);
// //     }

// //     return videoId;
// //   };

// //   const postEvent = async (eventData) => {
// //     const url = "/api/admin/cultural-event/regist";

// //     try {
// //       const response = await axios.post(url, eventData, {
// //         headers: {
// //           "content-type": "multipart/form-data",
// //         },
// //       });

// //       console.log(response.status);
// //       if (response.status === 200) {
// //         console.log(response.data);
// //         history.push("/event/event-manage");
// //       }
// //     } catch (e) {
// //       console.log(e);
// //     }
// //   };

// //   const onSubmitEvent = useCallback((formState) => {
// //     let formData = new FormData();

// //     if (state.formInfo.resources) {
// //       formData.append("file", state.formInfo.resources[0]);
// //     }

// //     formData.append("name", state.formInfo.name);
// //     formData.append("location", state.formInfo.location);
// //     formData.append("address1", state.formInfo.adderss1);
// //     formData.append("address2", state.formInfo.address2);
// //     formData.append("open_date", convertDateFormat(state.formInfo.open_date));
// //     formData.append("close_date", convertDateFormat(state.formInfo.close_date));
// //     formData.append("age", state.formInfo.age);
// //     formData.append("homepage", state.formInfo.homepage);
// //     formData.append("phone", state.formInfo.phone);
// //     formData.append("price", state.formInfo.price);
// //     formData.append("open_time", state.formInfo.open_time);
// //     formData.append("close_time", state.formInfo.close_time);
// //     formData.append("festival_id", state.formInfo.festival_id);
// //     formData.append("state", formState);
// //     formData.append("more_information", state.detail);
// //     formData.append("userid", window.sessionStorage.getItem("userid"));

// //     var vAry;
// //     var temp;

// //     // curation
// //     vAry = new Array();
// //     for (let i = 0; i < state.curationInfo.event_field.length; i++) {
// //       vAry.push(state.curationInfo.event_field[i]);
// //     }
// //     formData.append("event_field", vAry);

// //     vAry = new Array();
// //     for (let i = 0; i < state.curationInfo.event_theme.length; i++) {
// //       vAry.push(state.curationInfo.event_theme[i]);
// //     }
// //     formData.append("event_theme", vAry);

// //     formData.append("event_type", state.curationInfo.event_type);

// //     // youtube
// //     vAry = new Array();
// //     for (let i = 0; i < state.videos.length; i++) {
// //       temp = new Object();
// //       temp.url = state.videos[i].url;
// //       vAry.push(temp);
// //     }
// //     formData.append("videos", vAry);

// //     postEvent(formData);
// //   }, []);

// //   useEffect(() => {
// //     const srcList = [
// //       `${process.env.PUBLIC_URL}/assets/vendor/jquery.min.js`,
// //       `${process.env.PUBLIC_URL}/assets/vendor/popper.min.js`,
// //       `${process.env.PUBLIC_URL}/assets/vendor/bootstrap.min.js`,
// //       `${process.env.PUBLIC_URL}/assets/vendor/perfect-scrollbar.min.js`,
// //       `${process.env.PUBLIC_URL}/assets/vendor/dom-factory.js`,
// //       `${process.env.PUBLIC_URL}/assets/vendor/material-design-kit.js`,
// //       `${process.env.PUBLIC_URL}/assets/js/app.js`,
// //       `${process.env.PUBLIC_URL}/assets/js/hljs.js`,
// //       `${process.env.PUBLIC_URL}/assets/js/settings.js`,
// //       `${process.env.PUBLIC_URL}/assets/vendor/moment.min.js`,
// //       `${process.env.PUBLIC_URL}/assets/vendor/moment-range.js`,
// //       `${process.env.PUBLIC_URL}/assets/js/page.projects.js`,
// //       `${process.env.PUBLIC_URL}/assets/js/page.analytics-2-dashboard.js`,
// //       `${process.env.PUBLIC_URL}/assets/vendor/list.min.js`,
// //       `${process.env.PUBLIC_URL}/assets/js/list.js`,
// //       `${process.env.PUBLIC_URL}/assets/js/toggle-check-all.js`,
// //       `${process.env.PUBLIC_URL}/assets/js/check-selected-row.js`,
// //       `${process.env.PUBLIC_URL}/assets/js/app-settings.js`,
// //     ];
// //     let scriptList = [];

// //     for (let i = 0; i < srcList.length; i++) {
// //       const script = document.createElement("script");
// //       script.src = process.env.PUBLIC_URL + srcList[i];
// //       scriptList.push(script);
// //       document.body.appendChild(script);
// //     }

// //     return () => {
// //       for (let i = 0; i < scriptList.length; i++) {
// //         document.body.removeChild(scriptList[i]);
// //       }
// //     };
// //   }, []);

// //   return (
// //     <div
// //       className="mdk-drawer-layout js-mdk-drawer-layout"
// //       data-push
// //       data-responsive-width="992px"
// //     >
// //       <div className="mdk-drawer-layout__content page-content">
// //         <GlobalBar />
// //         <PageTitle pageTitle="문화행사 등록하기" pagePathList={pagePathList} />

// //         <div className="container-fluid page__container">
// //           <div className="page-section">
// //             <div className="row">
// //               <ImageForm />
// //               <EventInfoForm />
// //             </div>

// //             <Curation />

// //             <div className="page-section">
// //               <div className="page-separator">
// //                 <div className="page-separator__text">상세정보</div>
// //               </div>

// //               <Editor />
// //             </div>

// //             <div className="page-section">
// //               <div className="page-separator">
// //                 <div className="page-separator__text">관련 영상 업로드</div>
// //               </div>
// //               <div className="list-group-item">
// //                 <VideoAddForm />
// //               </div>
// //               <div className="row card-group-row">
// //                 {state.videos.map((video) => (
// //                   <VideoListItem vId={getVideoId(video.url)} key={state.vId} />
// //                 ))}
// //               </div>
// //             </div>

// //             <div className="detail_under_menu ">
// //               <div className="card">
// //                 <PostSaveBtn
// //                   options={options}
// //                   onSubmitEvent={onSubmitEvent}
// //                   state={state.formInfo.state}
// //                 />
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       <SideMenuBar />
// //     </div>
// //   );
// // };

// // export default AddEventView;

// import React, { useEffect, useState, useCallback, useContext } from "react";
// import axios from "axios";
// import EventInfoContext from "../../context/eventInfo";
// import { useHistory } from "react-router-dom";

// import GlobalBar from "../basic-components/GlobalBar";
// import SideMenuBar from "../basic-components/SideMenuBar";
// import PageTitle from "../basic-components/PageTitle";
// import Editor from "../basic-components/editor-components/Editor";
// import VideoAddForm from "../basic-components/video-components/VideoAddForm";
// import VideoListItem from "../basic-components/video-components/VideoListItem";
// import PostSaveBtn from "../basic-components/PostSaveBtn";

// import EventInfoForm from "./add-form-components/EventInfoForm";
// import ImageForm from "../basic-components/ImageForm";
// import Curation from "./add-form-components/Curation";

// const pagePathList = [
//   {
//     pageUrl: "/dashboard",
//     pageName: "홈",
//   },
//   {
//     pageUrl: "/event/event-manage",
//     pageName: "문화행사 관리",
//   },
// ];

// const convertDateFormat = (str) => {
//   if (typeof str === Date) {
//     return "" + str.getFullYear() + (str.getMonth() + 1) + str.getDate();
//   }
//   const date = new Date(str);

//   return "" + date.getFullYear() + (date.getMonth() + 1) + date.getDate();
// };

// const AddEventView = ({ options }) => {
//   const { state, actions } = useContext(EventInfoContext);
//   const history = useHistory();

//   const getVideoId = (url) => {
//     let videoId;

//     if (url.indexOf("watch?v=") === 24) {
//       videoId = url.slice(32, 43);
//     } else {
//       videoId = url.slice(17, 28);
//     }

//     return videoId;
//   };

//   const postEvent = async (eventData) => {
//     const url = "/api/admin/cultural-event/regist";

//     try {
//       const response = await axios.post(url, eventData, {
//         headers: {
//           "content-type": "multipart/form-data",
//         },
//       });

//       console.log(response.status);
//       if (response.status === 200) {
//         console.log(response.data);
//         history.push("/event/event-manage");
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const onSubmitEvent = useCallback((formState) => {
//     let formData = new FormData();

//     if (state.formInfo.resources) {
//       formData.append("file", state.formInfo.resources[0]);
//     }

//     formData.append("name", state.formInfo.name);
//     formData.append("location", state.formInfo.location);
//     formData.append("address1", state.formInfo.adderss1);
//     formData.append("address2", state.formInfo.address2);
//     formData.append("open_date", convertDateFormat(state.formInfo.open_date));
//     formData.append("close_date", convertDateFormat(state.formInfo.close_date));
//     formData.append("age", state.formInfo.age);
//     formData.append("homepage", state.formInfo.homepage);
//     formData.append("phone", state.formInfo.phone);
//     formData.append("price", state.formInfo.price);
//     formData.append("open_time", state.formInfo.open_time);
//     formData.append("close_time", state.formInfo.close_time);
//     formData.append("festival_id", state.formInfo.festival_id);
//     formData.append("state", formState);
//     formData.append("more_information", state.detail);
//     formData.append("userid", window.sessionStorage.getItem("userid"));

//     var vAry;
//     var temp;

//     // curation
//     vAry = new Array();
//     for (let i = 0; i < state.curationInfo.event_field.length; i++) {
//       vAry.push(state.curationInfo.event_field[i]);
//     }
//     formData.append("event_field", vAry);

//     vAry = new Array();
//     for (let i = 0; i < state.curationInfo.event_theme.length; i++) {
//       vAry.push(state.curationInfo.event_theme[i]);
//     }
//     formData.append("event_theme", vAry);

//     formData.append("event_type", state.curationInfo.event_type);

//     // youtube
//     vAry = new Array();
//     for (let i = 0; i < state.videos.length; i++) {
//       temp = new Object();
//       temp.url = state.videos[i].url;
//       vAry.push(temp);
//     }
//     formData.append("videos", vAry);

//     postEvent(formData);
//   }, []);

//   useEffect(() => {
//     const srcList = [
//       `${process.env.PUBLIC_URL}/assets/vendor/jquery.min.js`,
//       `${process.env.PUBLIC_URL}/assets/vendor/popper.min.js`,
//       `${process.env.PUBLIC_URL}/assets/vendor/bootstrap.min.js`,
//       `${process.env.PUBLIC_URL}/assets/vendor/perfect-scrollbar.min.js`,
//       `${process.env.PUBLIC_URL}/assets/vendor/dom-factory.js`,
//       `${process.env.PUBLIC_URL}/assets/vendor/material-design-kit.js`,
//       `${process.env.PUBLIC_URL}/assets/js/app.js`,
//       `${process.env.PUBLIC_URL}/assets/js/hljs.js`,
//       `${process.env.PUBLIC_URL}/assets/js/settings.js`,
//       `${process.env.PUBLIC_URL}/assets/vendor/moment.min.js`,
//       `${process.env.PUBLIC_URL}/assets/vendor/moment-range.js`,
//       `${process.env.PUBLIC_URL}/assets/js/page.projects.js`,
//       `${process.env.PUBLIC_URL}/assets/js/page.analytics-2-dashboard.js`,
//       `${process.env.PUBLIC_URL}/assets/vendor/list.min.js`,
//       `${process.env.PUBLIC_URL}/assets/js/list.js`,
//       `${process.env.PUBLIC_URL}/assets/js/toggle-check-all.js`,
//       `${process.env.PUBLIC_URL}/assets/js/check-selected-row.js`,
//       `${process.env.PUBLIC_URL}/assets/js/app-settings.js`,
//     ];
//     let scriptList = [];

//     for (let i = 0; i < srcList.length; i++) {
//       const script = document.createElement("script");
//       script.src = process.env.PUBLIC_URL + srcList[i];
//       scriptList.push(script);
//       document.body.appendChild(script);
//     }

//     return () => {
//       for (let i = 0; i < scriptList.length; i++) {
//         document.body.removeChild(scriptList[i]);
//       }
//     };
//   }, []);

//   return (
//     <div
//       className="mdk-drawer-layout js-mdk-drawer-layout"
//       data-push
//       data-responsive-width="992px"
//     >
//       <div className="mdk-drawer-layout__content page-content">
//         <GlobalBar />
//         <PageTitle pageTitle="문화행사 등록하기" pagePathList={pagePathList} />

//         <div className="container-fluid page__container">
//           <div className="page-section">
//             <div className="row">
//               <ImageForm />
//               <EventInfoForm />
//             </div>

//             <Curation />

//             <div className="page-section">
//               <div className="page-separator">
//                 <div className="page-separator__text">상세정보</div>
//               </div>

//               <Editor />
//             </div>

//             <div className="page-section">
//               <div className="page-separator">
//                 <div className="page-separator__text">관련 영상 업로드</div>
//               </div>
//               <div className="list-group-item">
//                 <VideoAddForm />
//               </div>
//               <div className="row card-group-row">
//                 {state.videos.map((video) => (
//                   <VideoListItem vId={getVideoId(video.url)} key={state.vId} />
//                 ))}
//               </div>
//             </div>

//             <div className="detail_under_menu ">
//               <div className="card">
//                 <PostSaveBtn
//                   options={options}
//                   onSubmitEvent={onSubmitEvent}
//                   state={state.formInfo.state}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <SideMenuBar />
//     </div>
//   );
// };

// export default AddEventView;

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import GlobalBar from "../basic-components/GlobalBar";
import SideMenuBar from "../basic-components/SideMenuBar";
import PageTitle from "../basic-components/PageTitle";
import EditorTest from "../basic-components/editor-components/EditorTest";
import VideoAddFormTest from "../basic-components/video-components/VideoAddFormTest";
import VideoListItem from "../basic-components/video-components/VideoListItem";
import PostSaveBtn from "../basic-components/PostSaveBtn";
import ImageFormTest from "../basic-components/ImageFormTest";

import EventInfoFormTest from "./add-form-components/EventInfoFormTest";
import CurationTest from "./add-form-components/CurationTest";

const pagePathList = [
  {
    pageUrl: "/dashboard",
    pageName: "홈",
  },
  {
    pageUrl: "/event/event-manage",
    pageName: "문화행사 관리",
  },
];

const convertToDate = (str) => {
  if (str === null || str === undefined) {
    return new Date();
  }

  return new Date(
    parseInt(str.slice(0, 4)),
    parseInt(str.slice(4, 6)) - 1,
    parseInt(str.slice(6))
  );
};

const AddEventView = ({ options }) => {
  const [formInfo, setFormInfo] = useState({
    name: "",
    location: "",
    address1: "",
    address2: "",
    open_date: new Date(),
    close_date: new Date(),
    open_time: "10:00",
    close_time: "22:00",
    age: "",
    homepage: "",
    reservsite: "",
    phone: "",
    price: "",
    state: "TEMP_SAVE",
  });
  const [imgFile, setImgFile] = useState(null);
  const [curationInfo, setCurationInfo] = useState({
    event_type: "EXHIBITION",
    event_theme: [],
    event_field: [],
    festival_id: "",
  });
  const [detail, setDetail] = useState("");
  const [videos, setVideos] = useState([]);
  const [vId, setVId] = useState(1);

  const [loading, setLoading] = useState(true);

  const getVideoId = (url) => {
    let videoId;

    if (url.indexOf("watch?v=") === 24) {
      videoId = url.slice(32, 43);
    } else {
      videoId = url.slice(17, 28);
    }

    return videoId;
  };

  const history = useHistory();

  const postEvent = async (eventData) => {
    const url = "/api/admin/cultural-event/regist";

    try {
      const response = await axios.post(url, eventData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log(response.status + " /// " + response.data);
        history.push("/event/event-manage");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitEvent = (formState) => {
    let formData = new FormData();

    if (imgFile) {
      formData.append("file", imgFile[0]);
    }

    formData.append("name", formInfo.name);
    formData.append("location", formInfo.location);
    formData.append("address1", formInfo.adderss1);
    formData.append("address2", formInfo.address2);
    formData.append("open_date", formInfo.open_date);
    formData.append("close_date", formInfo.close_date);
    formData.append("age", formInfo.age);
    formData.append("homepage", formInfo.homepage);
    formData.append("phone", formInfo.phone);
    formData.append("price", formInfo.price);
    formData.append("open_time", formInfo.open_time);
    formData.append("close_time", formInfo.close_time);
    formData.append("festival_id", formInfo.festival_id);
    formData.append("state", formState);
    formData.append("more_information", detail);
    formData.append("userid", window.sessionStorage.getItem("userid"));

    var vAry;
    var temp;

    // curation
    vAry = new Array();
    for (let i = 0; i < curationInfo.event_field.length; i++) {
      vAry.push(curationInfo.event_field[i]);
    }
    formData.append("event_field", vAry);

    vAry = new Array();
    for (let i = 0; i < curationInfo.event_theme.length; i++) {
      vAry.push(curationInfo.event_theme[i]);
    }
    formData.append("event_theme", vAry);

    formData.append("event_type", curationInfo.event_type);

    // youtube
    // vAry = new Array();
    for (let i = 0; i < videos.length; i++) {
      // temp = new Object();
      // temp.url = videos[i].url;
      // vAry.push(temp);
      formData.append("videos", JSON.stringify({ url: videos[i].url }));
    }
    // formData.append("videos", vAry);

    postEvent(formData);
  };

  // const parseUrl = useCallback(
  //   (string) => {
  //     let ary = string.split('"');
  //     let id = 1;

  //     for (let i = 0; i < ary.length; i++) {
  //       if (ary[i].includes("/images/")) {
  //         setFormInfo({
  //           ...formInfo,
  //           resources: ary[i],
  //         });
  //       } else if (ary[i].includes("youtube")) {
  //         setVideos(
  //           videos.concat({
  //             vId: id++,
  //             url: ary[i],
  //           })
  //         );
  //       }
  //     }

  //     setVid(id);
  //   },
  //   [formInfo, videos]
  // );

  const getDetail = (e) => {
    setDetail(e);
  };

  const getFormInfo = (dataName, data) => {
    setFormInfo({
      ...formInfo,
      [dataName]: data,
    });
  };

  const getCurationInfo = (dataName, data) => {
    setCurationInfo({
      ...curationInfo,
      [dataName]: data,
    });
  };

  const getImgFile = (imgFile) => {
    setImgFile(imgFile);
  };

  const getVideoInfo = (url) => {
    setVideos(videos.concat({ url: url, vId: vId }));
    setVId(vId + 1);
  };

  useEffect(() => {
    const srcList = [
      `${process.env.PUBLIC_URL}/assets/vendor/jquery.min.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/popper.min.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/bootstrap.min.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/perfect-scrollbar.min.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/dom-factory.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/material-design-kit.js`,
      `${process.env.PUBLIC_URL}/assets/js/app.js`,
      `${process.env.PUBLIC_URL}/assets/js/hljs.js`,
      `${process.env.PUBLIC_URL}/assets/js/settings.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/moment.min.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/moment-range.js`,
      `${process.env.PUBLIC_URL}/assets/js/page.projects.js`,
      `${process.env.PUBLIC_URL}/assets/js/page.analytics-2-dashboard.js`,
      `${process.env.PUBLIC_URL}/assets/vendor/list.min.js`,
      `${process.env.PUBLIC_URL}/assets/js/list.js`,
      `${process.env.PUBLIC_URL}/assets/js/toggle-check-all.js`,
      `${process.env.PUBLIC_URL}/assets/js/check-selected-row.js`,
      `${process.env.PUBLIC_URL}/assets/js/app-settings.js`,
    ];
    let scriptList = [];

    for (let i = 0; i < srcList.length; i++) {
      const script = document.createElement("script");
      script.src = process.env.PUBLIC_URL + srcList[i];
      scriptList.push(script);
      document.body.appendChild(script);
    }

    // parseUrl(response.data.resources);

    setLoading(false);

    console.log("======폼 init 성공======");

    return () => {
      for (let i = 0; i < scriptList.length; i++) {
        document.body.removeChild(scriptList[i]);
      }
    };
  }, []);

  if (loading) {
    return <p>로딩중..</p>;
  }

  // if (!formInfo || !curationInfo || !detail) {
  //   return <p>fail to loading data</p>;
  // }

  return (
    <>
      <div
        className="mdk-drawer-layout js-mdk-drawer-layout"
        data-push
        data-responsive-width="992px"
      >
        <div className="mdk-drawer-layout__content page-content">
          <GlobalBar />

          <PageTitle
            pageTitle="문화행사 등록하기"
            pagePathList={pagePathList}
          />

          <div className="container-fluid page__container">
            <div className="page-section">
              <div className="row">
                <ImageFormTest imgSrc={imgFile} getImgFile={getImgFile} />
                <EventInfoFormTest
                  formInfo={formInfo}
                  getFormInfo={getFormInfo}
                />
              </div>

              <CurationTest
                curationInfo={curationInfo}
                getCurationInfo={getCurationInfo}
              />

              <div className="page-section">
                <div className="page-separator">
                  <div className="page-separator__text">상세정보</div>
                </div>

                <EditorTest more_information={detail} getDetail={getDetail} />
              </div>

              <div className="page-section">
                <div className="page-separator">
                  <div className="page-separator__text">관련 영상 업로드</div>
                </div>
                <div className="list-group-item">
                  <VideoAddFormTest getVideoInfo={getVideoInfo} />
                </div>
                <div className="row card-group-row">
                  {videos.map((video) => (
                    <VideoListItem
                      vId={getVideoId(video.url)}
                      key={video.vId}
                    />
                  ))}
                </div>
              </div>

              <div className="detail_under_menu ">
                <div className="card">
                  <PostSaveBtn
                    options={options}
                    onSubmitEvent={onSubmitEvent}
                    state={formInfo.state}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <SideMenuBar />
      </div>
    </>
  );
};

export default AddEventView;
