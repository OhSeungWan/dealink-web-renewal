import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: ${props => (props.row ? 'row' : 'column')};
  margin-top: 150px;
  border: ${props => props.border};
  width: 100%;
  max-width: 400px;
`;
