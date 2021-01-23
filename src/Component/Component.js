import styled from 'styled-components';

export const MyPositionMarker = ({ text }) => <div>{text}</div>;

export const TargetMarker = ({ text, handleDetailMarker, placeId }) => (
  <div onClick={() => {
    handleDetailMarker(placeId)
    }}>
    <TargetMarkerText>{text}</TargetMarkerText>
  </div>
)

export const SearchType = ({ value, name, isOption }) => {
   return <Input type="button" value={value} name={name} isOption={isOption}/>
}

const TargetMarkerText = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
  padding: 5px 0px;
  width: 30vh;
  color: red;
  text-align: center;
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 255, 1);

  &:hover{
    background: rgba(255, 0, 0, 0.8);
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    z-index: 2;
    transition: all 0.2s;
    transform: scale(1.2)
  }
`

const Input = styled.input`
  background: white;
  border: none;
  border-bottom: 1px solid black;
  margin-bottom: 5px;

  &+& {
  margin-right: 5px;
  }

  cursor: pointer;
  ${props => props.isOption && `
    background: #333;
    color: white;
  `
  }
  &:hover {
    background: rgba(0, 0, 0, 0.6);
    color: white;
  }
`
export const InputMap = styled(Input)`
  ${props => props.isOption && `
    background: rgba(255, 0, 0, 0.6);
  `
  }
`
