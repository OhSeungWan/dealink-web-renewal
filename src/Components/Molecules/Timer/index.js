import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const TimerInput = styled.input.attrs(props => {
  if (props.type == 'd') {
    return { type: 'number', max: '100', min: '0' };
  } else if (props.type == 'h') {
    return { type: 'number', max: '24', min: '0' };
  } else if (props.type == 'm') {
    return { type: 'number', max: '60', min: '0' };
  } else if (props.type == 's') {
    return { type: 'number', max: '60', min: '0' };
  }
})`
  padding: 10px 10px 10px 25px;
  text-align: center;
  font-size: 30px;
  font-weight: 900;
  border: none;
`;

const TimeText = styled.div``;

const TimeWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const TimerItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TimerItem = ({
  isSet,
  day = 100,
  hour = 23,
  minute = 59,
  second = 59
}) => {
  const [days, setDays] = useState(isSet ? day : 0);
  const [hours, setHours] = useState(isSet ? hour : 0);
  const [minutes, setMinutes] = useState(isSet ? minute : 0);
  const [seconds, setSeconds] = useState(isSet ? second : 0);

  useEffect(() => {
    if (isSet) {
      const countdown = setInterval(() => {
        if (parseInt(seconds) > 0) {
          setSeconds(parseInt(seconds) - 1);
        } else {
          if (parseInt(minutes) > 0) {
            setMinutes(parseInt(minutes) - 1);
          } else {
            setDays(parseInt(days) - 1);
            setMinutes(59);
          }
          setSeconds(59);
        }
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [days, hour, minutes, seconds, isSet]);

  //TODO: use useCallback()
  const onChangeD = e => {
    setDays(e.target.value);
  };
  const onChangeH = e => {
    setHours(e.target.value);
  };
  const onChangeM = e => {
    setMinutes(e.target.value);
  };
  const onChangeS = e => {
    setSeconds(e.target.value);
  };

  return (
    <TimeWrapper>
      <TimerItemWrapper>
        <TimerInput
          readOnly={isSet ? true : false}
          placeholder="0"
          onChange={!isSet ? onChangeD : null}
          value={days}
          type="d"
        />
      </TimerItemWrapper>
      <Colon />

      <TimerItemWrapper>
        <TimerInput
          readOnly={isSet ? true : false}
          placeholder="0"
          onChange={!isSet ? onChangeH : null}
          value={hours}
          type="h"
        />
      </TimerItemWrapper>
      <Colon />

      <TimerItemWrapper>
        <TimerInput
          readOnly={isSet ? true : false}
          placeholder="0"
          onChange={!isSet ? onChangeM : null}
          value={minutes}
          type="m"
        />
      </TimerItemWrapper>
      <Colon />

      <TimerItemWrapper>
        <TimerInput
          readOnly={isSet ? true : false}
          placeholder="0"
          onChange={!isSet ? onChangeS : null}
          value={seconds}
          type="s"
        />
      </TimerItemWrapper>
    </TimeWrapper>
  );
};

const ColonText = styled.div`
  padding: 10px;
  font-size: 30px;
  font-weight: 900;
`;

const Colon = () => {
  return (
    <TimeWrapper>
      <ColonText>:</ColonText>
    </TimeWrapper>
  );
};

const Timer = ({ isSet, day, hour, minute, second }) => {
  console.log(new Date());
  return <TimerItem isSet={isSet ? true : false} />;
};

export default Timer;
