import styled, { css } from 'styled-components';
import { Role, setRoleColor } from '../../styles/mainTheme';

const H1 = styled.h1<{ role: keyof typeof Role }>`
  text-align: center;

  ${(props) => setRoleColor}
`;

export default H1;
