import React, { createContext, useState } from "react";

const AddEventInfoContext = createContext({
  state: {
    imgFile: null,
    formInfo: {
      name: "",
      location: "",
      address1: "",
      address2: "",
      open_date: "",
      close_date: "",
      open_time: "",
      close_time: "",
      age: "",
      homepage: "",
      reservsite: "",
      phone: "",
      price: "",
      state: "",
    },
    curationInfo: {
      event_type: "",
      event_theme: [],
      event_field: [],
      festival_id: "",
    },
    detail: "",
    videos: [],
    vId: 1,
  },
  actions: {
    setImgFile: () => {},
    setFormInfo: () => {},
    setCurationInfo: () => {},
    setDetail: () => {},
    setVideos: () => {},
    setVId: () => {},
  },
});

const AddEventInfoProvider = ({ children }) => {
  const [imgFile, setImgFile] = useState(null);
  const [formInfo, setFormInfo] = useState({
    name: "",
    location: "",
    address1: "",
    address2: "",
    open_date: "",
    close_date: "",
    open_time: "",
    close_time: "",
    age: "",
    homepage: "",
    reservsite: "",
    phone: "",
    price: "",
    state: "",
  });
  const [curationInfo, setCurationInfo] = useState({
    event_type: "",
    event_theme: [],
    event_field: [],
    festival_id: "",
  });
  const [detail, setDetail] = useState("");
  const [videos, setVideos] = useState([]);
  const [vId, setVId] = useState(1);

  const value = {
    state: { imgFile, formInfo, curationInfo, detail, videos, vId },
    actions: {
      setImgFile,
      setFormInfo,
      setCurationInfo,
      setDetail,
      setVideos,
      setVId,
    },
  };

  return (
    <AddEventInfoContext.Provider value={value}>
      {children}
    </AddEventInfoContext.Provider>
  );
};

const { Consumer: AddEventInfoConsumer } = AddEventInfoContext;

export { AddEventInfoProvider, AddEventInfoConsumer };

export default AddEventInfoContext;
