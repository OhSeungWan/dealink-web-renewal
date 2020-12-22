import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 30px;
  flex-direction: ${props => (props.row ? 'row' : 'column')};
  margin-top: 50px;
  border: ${props => props.border};
  width: 95vw;
  height: 95vh;
  max-width: 400px;
`;
