import React from 'react';
import styeld from 'styled-components';
import styled from 'styled-components';

const ListWrapper = styled.div`
  display: flex;
  flex-direction: ${props => (props.direction == 'row' ? 'row' : 'column')};
  width: 100%;
  flex: 1;
  justify-content: ${props =>
    props.spaceBetween ? 'space-between' : 'center'};
`;

const List = ({ children, direction, spaceBetween }) => {
  return (
    <ListWrapper
      direction={direction}
      spaceBetween={spaceBetween ? true : false}
    >
      {children}
    </ListWrapper>
  );
};

export default List;
