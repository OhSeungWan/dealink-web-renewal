import { ImageBox, List, Timer } from 'Components/Molecules';
import { Input, Text } from 'Components/Atoms';

import React from 'react';
import styeld from 'styled-components';

const AuctionOptions = () => {
  return (
    <List>
      <Timer isSet={false} />
    </List>
  );
};

export default AuctionOptions;
