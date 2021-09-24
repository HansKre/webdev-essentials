import styled from 'styled-components';

const CenteringContainer = styled.div<{ upDesktop: boolean }>`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  background-color: white;
  border: solid;
  border-radius: 10px;
  padding: 5vh 5vw 0 5vw;
  width: ${(props) => (props.upDesktop ? '790px' : '95vw')};
  max-width: ${(props) => (props.upDesktop ? '790px' : '95vw')};
`;

export default CenteringContainer;
