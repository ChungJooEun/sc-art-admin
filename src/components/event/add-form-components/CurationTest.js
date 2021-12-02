import React, { useEffect, useState } from "react";
import axios from "axios";

import Select from "react-select";

const categoryOptions = [
  { value: "EXHIBITION", label: "전시" },
  { value: "SHOW", label: "공연" },
  { value: "OTHER", label: "기타" },
];

const showFieldOptions = [
  { value: "MUSICAL_OPERA", label: "뮤지컬/오페라" },
  { value: "MUSIC_CONCERT", label: "음악/콘서트" },
  { value: "PLAY", label: "연극" },
  { value: "CHILD_DRAMA", label: "아동극/인형극" },
  { value: "DANCE", label: "무용" },
  { value: "OTHER", label: "기타" },
  { value: "COME_KOREA", label: "내한" },
  { value: "CLASSIC", label: "클래식" },
  { value: "TRADITIONAL_ART", label: "전통예술" },
  { value: "INDIE", label: "인디" },
  { value: "JAZZ", label: "재즈" },
  { value: "KPOP", label: "K-pop" },
  { value: "ROCK", label: "Rock" },
  { value: "BALLAD", label: "발라드" },
  { value: "DANCE_POP", label: "댄스" },
  { value: "RNB", label: "R&B/소울" },
  { value: "HIPHOP", label: "힙합" },
];

const exhibitionFieldOptions = [
  { value: "KOREAN_WRITERS", label: "국내 작가" },
  { value: "FOREIGN_WRITERS", label: "해외 작가" },
  { value: "HISTORY", label: "역사" },
  { value: "SCULPTURE", label: "조각" },
  { value: "PHOTO", label: "사진" },
  { value: "FOLK_ART", label: "전통미술" },
  { value: "KOREAN_PAINTING", label: "한국화" },
  { value: "ENGRAVING", label: "판화" },
  { value: "WATERCOLOR", label: "수채화" },
  { value: "CRAFTS", label: "공예" },
  { value: "CALLIGRPHY", label: "서예" },
  { value: "EXHIBITION_OTHER", label: "기타" },
];

const otherFieldOptions = [
  { value: "FESTIVAL", label: "축제" },
  { value: "EXPERIENCE_EDUCATION", label: "체험/교육" },
  { value: "MOVIE", label: "영화" },
  { value: "OTHER_OTHER", label: "기타" },
];

const themeOptions = [
  { value: "SPRING", label: "봄" },
  { value: "SUMMER", label: "여름" },
  { value: "FALL", label: "가을" },
  { value: "WINTER", label: "겨울" },
  { value: "CHRISTMAS", label: "크리스마스" },
  { value: "VALENTINES_DAY", label: "발렌타인데이" },
  { value: "HOLIDAY", label: "명절" },
  { value: "ANNIVERSARY", label: "기념일" },
  { value: "SUNNY", label: "화창함" },
  { value: "CLOUDY_RAIN", label: "흐림/비" },

  { value: "ALONE", label: "나홀로" },
  { value: "FRIEND", label: "친구" },
  { value: "COUPLE", label: "커플" },
  { value: "KID", label: "아이랑" },
  { value: "PARENTS", label: "부모님" },
  { value: "FAMILY", label: "가족" },

  { value: "FUNNY", label: "재미있는" },
  { value: "UNIQUE", label: "이색적인" },
  { value: "LEARN", label: "학습을 돕는" },
  { value: "IMPRESSIVE", label: "감동적인" },
];

const CurationTest = ({ curationInfo, getCurationInfo }) => {
  const getDefaultOptions_field = (fields, options) => {
    const defaultOptions = [];

    console.log(fields);

    if (fields === undefined || fields === null) {
      return [];
    }

    if (typeof fields === "string") {
      let string = fields.replace(/"/gi, "");

      for (let j = 0; j < options.length; j++) {
        if (string === options[j].value) {
          defaultOptions.push(options[j]);
        }
      }
    } else {
      for (let i = 0; i < fields.length; i++) {
        for (let j = 0; j < options.length; j++) {
          if (fields[i] === options[j].value) {
            defaultOptions.push(options[j]);
          }
        }
      }
    }

    console.log(defaultOptions);
    return defaultOptions;
  };

  const getDefaultOptions_theme = (themes) => {
    const defaultOptions = [];

    if (themes === undefined) {
      return [];
    }

    if (typeof themes === "string") {
      for (let j = 0; j < themeOptions.length; j++) {
        if (themes === themeOptions[j].value) {
          defaultOptions.push(themeOptions[j]);
        }
      }
    } else {
      for (let i = 0; i < themes.length; i++) {
        for (let j = 0; j < themeOptions.length; j++) {
          if (themes[i] === themeOptions[j].value) {
            defaultOptions.push(themeOptions[j]);
          }
        }
      }
    }

    return defaultOptions;
  };

  const getDefaultOptions_category = (category) => {
    const defaultOptions = [];

    if (category === undefined) {
      return [];
    }

    for (let j = 0; j < categoryOptions.length; j++) {
      if (category === categoryOptions[j].value) {
        defaultOptions.push(categoryOptions[j]);
        break;
      }
    }

    return defaultOptions;
  };

  const onChangeField = (e) => {
    let ary = [];

    for (let i = 0; i < e.length; i++) {
      ary.push(e[i].value);
    }

    getCurationInfo("event_field", ary);
  };

  const onChangeTheme = (e) => {
    let ary = [];

    for (let i = 0; i < e.length; i++) {
      ary.push(e[i].value);
    }

    getCurationInfo("event_theme", ary);
  };

  const [festivalOptions, setFestivalOptions] = useState(null);
  const [fieldOptions, setFieldOptions] = useState(null);

  useEffect(() => {
    const getfestivalInfo = async () => {
      const url = `http://118.67.154.118:3000/api/admin/seochogu-festival/list`;
      // const url = `http://localhost:3000/api/admin/seochogu-festival/list`;

      try {
        const response = await axios.get(url, {
          params: {
            sort_type: "desc",
            sort_column: "create_date",
            page: 1,
            count: 10000,
            from_date: "20000101",
            to_date: "20221231",
          },
        });

        if (response.status === 200) {
          let options = [];

          for (let i = 0; i < response.data.list.length; i++) {
            options.push({
              value: response.data.list[i].id,
              label: response.data.list[i].name,
            });
          }
          setFestivalOptions(options);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getfestivalInfo();

    let ary = [];
    switch (curationInfo.event_type) {
      case "EXHIBITION":
        ary = getDefaultOptions_field(
          curationInfo.event_field,
          exhibitionFieldOptions
        );
        break;
      case "SHOW":
        ary = getDefaultOptions_field(
          curationInfo.event_field,
          showFieldOptions
        );
        break;
      case "OTHER":
        ary = getDefaultOptions_field(
          curationInfo.event_field,
          otherFieldOptions
        );
        break;
      default:
        break;
    }

    setFieldOptions(ary);
  }, [curationInfo.event_field, curationInfo.event_type]);

  return (
    <div className="page-section">
      <div className="form-group">
        <label className="form-label" htmlFor="select01">
          종류
        </label>
        <Select
          options={categoryOptions}
          defaultValue={getDefaultOptions_category(curationInfo.event_type)}
          closeMenuOnSelect={true}
          id="select01"
          placeholder="종류 선택"
          onChange={(e) => getCurationInfo("event_type", e.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="select02">
          분야
        </label>
        <Select
          options={
            {
              EXHIBITION: exhibitionFieldOptions,
              SHOW: showFieldOptions,
              OTHER: otherFieldOptions,
            }[curationInfo.event_type]
          }
          value={fieldOptions}
          closeMenuOnSelect={false}
          id="select02"
          isMulti
          placeholder="분야 선택"
          onChange={(e) => onChangeField(e)}
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="select03">
          테마
        </label>
        <Select
          options={themeOptions}
          defaultValue={getDefaultOptions_theme(curationInfo.event_theme)}
          closeMenuOnSelect={false}
          id="select03"
          isMulti
          placeholder="테마 선택"
          onChange={(e) => onChangeTheme(e)}
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="select04">
          서초구 축제
        </label>
        <Select
          options={festivalOptions}
          defaultValue={{
            value: curationInfo.festival_id,
            label: curationInfo.festival_name,
          }}
          closeMenuOnSelect={true}
          id="select04"
          placeholder="서초구 축제 선택"
          onChange={(e) => getCurationInfo("festival_id", e.value)}
        />
      </div>
    </div>
  );
};

export default CurationTest;
