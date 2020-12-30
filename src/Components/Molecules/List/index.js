import React from 'react';
import styled from 'styled-components';

const ListWrapper = styled.div`
  display: flex;
  flex-direction: ${props => (props.direction == 'row' ? 'row' : 'column')};
  width: 100%;
  justify-content: ${props =>
    props.spaceBetween
      ? 'space-between'
      : props.spaceAround
      ? 'space-around'
      : 'center'};
`;

const List = ({ children, direction, spaceBetween, spaceAround }) => {
  return (
    <ListWrapper
      direction={direction}
      spaceBetween={spaceBetween ? true : false}
      spaceAround={spaceAround ? true : false}
    >
      {children}
    </ListWrapper>
  );
};

export default List;
