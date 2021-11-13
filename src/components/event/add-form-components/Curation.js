import React, { useState, useEffect } from "react";
import Select from "react-select";

const categoryOptions = [
  { value: "EXHIBITION", label: "전시" },
  { value: "SHOW", label: "공연" },
  { value: "OTHER", label: "기타" },
];

const fieldOptions = [
  { value: "CHILD_DRAMA", label: "아동극" },
  { value: "DANCE", label: "무용" },
  { value: "MUSICAL_OPERA", label: "뮤지컬/오페라" },
  { value: "MUSIC_CONCERT", label: "음악/콘서트" },
  { value: "OTHER", label: "기타" },
  { value: "PLAY", label: "연극" },
];

const themeOptions = [
  { value: "ALONE", label: "나홀로" },
  { value: "ANNIVERSARY", label: "기념일" },
  { value: "BALLAD", label: "발라드" },
  { value: "CHRISTMAS", label: "성탄절" },
  { value: "CLASSIC", label: "클래식" },
  { value: "CLOUDY_RAIN", label: "흐림/비" },
  { value: "COME_KOREA", label: "내한" },
  { value: "COUPLE", label: "커플" },
  { value: "DANCE", label: "댄스" },
  { value: "FALL", label: "가을" },
  { value: "FAMILY", label: "가족" },
  { value: "FRIEND", label: "친구" },
  { value: "FUNNY", label: "재미있는" },
  { value: "HIPHOP", label: "힙합" },
  { value: "HOLIDAY", label: "명절" },
  { value: "IMPRESSIVE", label: "감동적인" },
  { value: "INDIE", label: "인디" },
  { value: "JAZZ", label: "재즈" },
  { value: "KID", label: "아이랑" },
  { value: "KPOP", label: "K-pop" },
  { value: "LEARN", label: "학습을 돕는" },
  { value: "PARENTS", label: "부모랑" },
  { value: "PARTY", label: "일행" },
  { value: "RNB", label: "R&B" },
  { value: "ROCK", label: "Rock" },
  { value: "SPRING", label: "봄" },
  { value: "SUMMER", label: "여름" },
  { value: "SUNNY", label: "화창함" },
  { value: "TRANDITIONAL_ART", label: "전통예술" },
  { value: "UNIQUE", label: "이색적인" },
  { value: "WINTER", label: "겨울" },
];

const Curation = React.memo(({ curationInfo, getCurationInfo }) => {
  const getDefaultOptions_field = (fields) => {
    console.log(fields);

    const defaultOptions = [];

    if (fields === undefined) {
      return [];
    }

    for (let i = 0; i < fields.length; i++) {
      for (let j = 0; j < fieldOptions.length; j++) {
        if (fields[i] === fieldOptions[j].value) {
          defaultOptions.push(fieldOptions[j]);
        }
      }
    }

    return defaultOptions;
  };

  const getDefaultOptions_theme = (themes) => {
    const defaultOptions = [];

    if (themes === undefined) {
      return [];
    }

    for (let i = 0; i < themes.length; i++) {
      for (let j = 0; j < themeOptions.length; j++) {
        if (themes[i] === themeOptions[j].value) {
          defaultOptions.push(themeOptions[j]);
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

  const [formInfo, setFormInfo] = useState(curationInfo);

  const onChangeCategory = (e) => {
    setFormInfo({
      ...formInfo,
      event_type: e.value,
    });
  };

  const onChangeField = (e) => {
    let ary = [];

    for (let i = 0; i < e.length; i++) {
      ary.push(e[i].value);
    }

    setFormInfo({
      ...formInfo,
      event_field: ary,
    });
  };

  const onChangeTheme = (e) => {
    let ary = [];

    for (let i = 0; i < e.length; i++) {
      ary.push(e[i].value);
    }

    setFormInfo({
      ...formInfo,
      event_theme: ary,
    });
  };

  const onChangeScFestival = (e) => {
    setFormInfo({
      ...setFormInfo,
      festival_id: e.value,
    });
  };

  useEffect(() => {
    getCurationInfo(formInfo);
  }, [formInfo, getCurationInfo]);

  return (
    <div className="page-section">
      <div className="form-group">
        <label className="form-label" for="select01">
          종류
        </label>
        <Select
          options={categoryOptions}
          defaultValue={getDefaultOptions_category(formInfo.event_type)}
          closeMenuOnSelect={false}
          id="select01"
          placeholder="종류 선택"
          onChange={(e) => onChangeCategory(e)}
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="select02">
          분야
        </label>
        <Select
          options={fieldOptions}
          defaultValue={getDefaultOptions_field(formInfo.event_field)}
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
          defaultValue={getDefaultOptions_theme(formInfo.event_theme)}
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
          options={{ value: "", label: "" }}
          defaultValue={{ value: "", label: "" }}
          closeMenuOnSelect={false}
          id="select04"
          placeholder="서초구 축제 선택"
          onChange={(e) => onChangeScFestival(e)}
        />
      </div>
    </div>
  );
});

export default React.memo(Curation);
