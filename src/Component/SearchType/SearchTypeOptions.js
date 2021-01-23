import styled from "styled-components";
import {
  SearchType,
  InputMap,
} from "../Component";


const SearchWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  text-align: center;
  z-index: 1;
`;

export default function SearchTypeOptions({ searchType, setSearchType, mapType, setMapType }) {
  const handleChangeType = (e) => {
    if (e.target.name) {
      setSearchType(e.target.name);
    }
  };

  const handleChangeMapType = (e) => {
    if (e.target.name) {
      setMapType(e.target.name);
    }
  };
  return (
    <SearchWrapper>
      <div onClick={handleChangeType}>
        <SearchType value="健身房" name="gym" isOption={searchType === "gym"} />
        <SearchType
          value="麵包店"
          name="bakery"
          isOption={searchType === "bakery"}
        />
        <SearchType
          value="咖啡店"
          name="cafe"
          isOption={searchType === "cafe"}
        />
      </div>
      <div onClick={handleChangeMapType}>
        <InputMap
          type="button"
          value="衛星圖"
          name="hybrid"
          isOption={mapType === "hybrid"}
        />
        <InputMap
          type="button"
          value="路線圖"
          name="roadmap"
          isOption={mapType === "roadmap"}
        />
      </div>
    </SearchWrapper>
  );
}

