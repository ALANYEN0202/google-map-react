import styled from "styled-components";

const MarkerDetailsWrapper = styled.div`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;
const DetailWrapper = styled.div`
  position: absolute;
  background: rgba(255, 240, 172, 1);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 8px;
  border: 2px solid rgba(0, 0, 255, 1);
`;
const DetailAdress = styled.div``;
const DetailIsOpening = styled.div`
  width: 80px;
  background: ${(props) => (props.isOpening ? "green" : "red")};
  color: white;
  padding: 5px;
  margin: 5px 0px;
  border-radius: 8px;
  text-align: center;
`;
const DetailOpenTime = styled.div`
  font-weight: bold;
`;
const DetailPhone = styled.div`
  padding: 5px 0px;
`;
const DetailRating = styled.div`
  padding: 5px 0px;
  color: blue;
`;
const DetailTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
  padding-bottom: 10px;
`;
const CloseButton = styled.div`
  cursor: pointer;
  width: 50px;
  padding: 5px;
  text-align: center;
  background: rgba(255, 170, 0);
  color: white;
  &:hover {
    transform: scale(1.1);
  }
`;

export default function MarkerDetail({ markerDetails, handleCloseMarkerDetail }) {
  return (
    <MarkerDetailsWrapper>
      <DetailWrapper>
        <DetailTitle>{markerDetails.name}</DetailTitle>
        <DetailAdress>{markerDetails.formatted_address}</DetailAdress>
        <DetailIsOpening isOpening={markerDetails.opening_hours.isOpen()}>
          {markerDetails.opening_hours.isOpen() ? "現正營業中" : "休息中"}
        </DetailIsOpening>
        <DetailRating>評分：{markerDetails.rating}</DetailRating>
        <DetailOpenTime>
          {markerDetails.opening_hours.weekday_text.map((week, index) => (
            <div key={index}>{week}</div>
          ))}
        </DetailOpenTime>
        <DetailPhone>電話：{markerDetails.formatted_phone_number}</DetailPhone>
        <CloseButton onClick={handleCloseMarkerDetail}>Close</CloseButton>
      </DetailWrapper>
    </MarkerDetailsWrapper>
  );
}

