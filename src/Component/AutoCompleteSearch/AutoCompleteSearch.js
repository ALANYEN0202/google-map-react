import styled from "styled-components";
import { debounce } from "lodash";


const AutoCompleteWrapper = styled.div`
  position: absolute;
  z-index: 1;
  left: 10px;
  top: 10px;
  padding: 10px;
  background: #ffa042;
  border: 1px solid black;
  border-radius: 8px;
`;

const AutoCompleteData = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  &:hover {
    background: #333;
    color: white;
  }
`;

export default function AutoCompleteSearch({
  handleChangeAutoInput,
  autoInputValue,
  handleChangeMyPosition,
  autoCompleteData,
}) {
  return (
    <AutoCompleteWrapper>
      搜尋：
      <input
        type="text"
        ref={autoInputValue}
        onChange={debounce(handleChangeAutoInput, 500)}
      />
      <div onClick={handleChangeMyPosition}>
        {autoCompleteData &&
          autoCompleteData.map((item) => (
            <AutoCompleteData key={item.reference} id={item.place_id}>
              {item.description}
            </AutoCompleteData>
          ))}
      </div>
    </AutoCompleteWrapper>
  );
}

