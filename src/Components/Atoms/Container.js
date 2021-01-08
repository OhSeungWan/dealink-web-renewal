import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: auto;
  max-width: 400px;
  overflow-x: hidden;
  justify-content: center;
  align-items: center;
  flex-direction: ${props => (props.row ? 'row' : 'column')};
  margin-top: 70px;
  margin-bottom: 50px;
  border: 5px solid #f5f5f7;
  border-top: none;
  border-bottom: none;
  padding: 10px;
  border: ${props => props.border};
`;
