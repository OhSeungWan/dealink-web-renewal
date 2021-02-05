import React from 'react';
import styled from 'styled-components';

const ListWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: ${props => (props.direction === 'row' ? 'row' : 'column')};
  justify-content: ${props =>
    props.spaceBetween
      ? 'space-between'
      : props.spaceAround
      ? 'space-around'
      : 'center'};
  align-items: ${props => (props.alignCenter ? 'center' : '')};
`;

const List = ({
  children,
  direction,
  spaceBetween,
  spaceAround,
  alignCenter
}) => {
  return (
    <ListWrapper
      direction={direction}
      spaceBetween={spaceBetween ? true : false}
      spaceAround={spaceAround ? true : false}
      alignCenter={alignCenter ? true : false}
    >
      {children}
    </ListWrapper>
  );
};

export default List;
