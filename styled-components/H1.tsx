import styled from 'styled-components';

export enum Role {
  success = 'limegreen',
  warning = '#0275b2',
  error = 'darkred',
}
const H1 = styled.h1<{
  styling: keyof typeof Role;
}>`
  color: ${(props) => Role[props.styling]};
  text-align: center;
`;

export default H1;
