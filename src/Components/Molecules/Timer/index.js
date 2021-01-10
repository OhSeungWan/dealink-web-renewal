import { Button, Container, ScreenWrapper, Text } from 'Components/Atoms';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { FadeBox } from 'Components/Organisms/Modal';

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
  text-align: center;
  font-size: 25px;
  font-weight: 900;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  margin: 0 5 0 5px;
`;

const TimeWrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
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
  second = 59,
  link,
  onChange
}) => {
  const [days, setDays] = useState(isSet ? day : '');
  const [hours, setHours] = useState(isSet ? hour : '');
  const [minutes, setMinutes] = useState(isSet ? minute : '');
  const [seconds, setSeconds] = useState(isSet ? second : '');
  const [complete, setComplete] = useState(false);
  // console.log(day);
  // console.log(hours);
  // console.log(minutes);
  // console.log(seconds);

  useEffect(() => {
    if (isSet) {
      const countdown = setInterval(async () => {
        if (
          parseInt(days) <= 0 &&
          parseInt(hour) <= 0 &&
          parseInt(minutes) <= 0 &&
          parseInt(seconds) <= 0
        ) {
          clearInterval(countdown);
          await fetch(
            `https://rest.dealink.co.kr/auction/${link}`,
            // `http://192.168.0.102:8080/auction/${link}`,
            {
              method: 'GET'
            }
          );
          setComplete(true);
          return;
        }
        if (parseInt(seconds) > 0) {
          setSeconds(parseInt(seconds) - 1);
        } else {
          if (parseInt(minutes) > 0) {
            setMinutes(parseInt(minutes) - 1);
          } else {
            if (parseInt(hour) > 0) {
              setDays(parseInt(days) - 1);
            } else {
              setHours(24);
            }
            setMinutes(59);
          }
          setSeconds(59);
        }
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [days, hours, minutes, seconds]);

  //TODO: use useCallback()
  //TODO: refectoring
  const onChangeD = e => {
    e.preventDefault();
    const { name, value } = e.target;
    onChange(name, value);
    setDays(e.target.value);
  };
  const onChangeH = e => {
    e.preventDefault();
    const { name, value } = e.target;
    onChange(name, value);
    setHours(e.target.value);
  };
  const onChangeM = e => {
    e.preventDefault();
    const { name, value } = e.target;
    onChange(name, value);
    setMinutes(e.target.value);
  };
  const onChangeS = e => {
    e.preventDefault();
    const { name, value } = e.target;
    onChange(name, value);
    setSeconds(e.target.value);
  };

  return !complete ? (
    <TimeWrapper>
      <TimerItemWrapper>
        <TimerInput
          readOnly={isSet ? true : false}
          placeholder="0"
          onChange={!isSet ? onChangeD : null}
          value={days}
          type="d"
          name="d"
        />
      </TimerItemWrapper>
      <Colon text={'일'} />
      <TimerItemWrapper>
        <TimerInput
          readOnly={isSet ? true : false}
          placeholder="0"
          onChange={!isSet ? onChangeH : null}
          value={hours}
          type="h"
          name="h"
        />
      </TimerItemWrapper>

      <Colon text={'시간'} />

      <TimerItemWrapper>
        <TimerInput
          readOnly={isSet ? true : false}
          placeholder="0"
          onChange={!isSet ? onChangeM : null}
          value={minutes}
          type="m"
          name="m"
        />
      </TimerItemWrapper>
      <Colon text={'분'} />

      {isSet && (
        <>
          <TimerItemWrapper>
            <TimerInput
              readOnly={isSet ? true : false}
              placeholder="0"
              onChange={!isSet ? onChangeS : null}
              value={seconds}
              type="s"
              name="s"
            />
          </TimerItemWrapper>
          <Colon text={'초'} />
        </>
      )}
    </TimeWrapper>
  ) : (
    // TODO: 리펙토링
    <ScreenWrapper>
      <Container>
        <FadeBox isOpen={true}></FadeBox>
      </Container>
    </ScreenWrapper>
  );
};

const ColonText = styled.div`
  padding: 5px;
  text-align: center;
  font-size: 20px;
  font-weight: 900;
`;

const Colon = ({ text }) => {
  return <ColonText>{text}</ColonText>;
};

const Bold = styled.div`
  font-size: 22px;
  font-weight: 600;
  padding: 5px;
`;

const Timer = props => {
  const { days, hours, minutes, seconds, link } = props;
  const now = new Date();
  now.setDate(now.getDate() + parseInt(props.value.d));
  now.setHours(now.getHours() + parseInt(props.value.h));
  now.setMinutes(now.getMinutes() + parseInt(props.value.m));
  now.setSeconds(now.getSeconds() + parseInt(props.value.s));

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <TimerItem
        isSet={props.isSet ? true : false}
        value={props.value}
        onChange={props.onChange}
        date={30}
        day={days <= 0 ? 0 : days}
        hour={hours <= 0 ? 0 : hours}
        minute={minutes <= 0 ? 0 : minutes}
        second={seconds <= 0 ? 0 : seconds}
        link={link}
      />
      {!props.isSet && (
        <div
          style={{
            marginTop: 10,
            fontSize: 18,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5F5F7',
            width: '100%'
          }}
        >
          <Bold>{now.toLocaleString()}</Bold>
          <div style={{ marginLeft: 5 }}> 마감</div>
        </div>
      )}
    </div>
  );
};

export default Timer;
