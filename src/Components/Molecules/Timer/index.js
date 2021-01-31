import React, { useCallback, useEffect, useState } from 'react';
import { GiAlarmClock } from 'react-icons/gi';
import moment from 'moment';
// import Picker from 'react-scrollable-picker';
import styled from 'styled-components';

const TimerItem = ({
  isSet,
  day = '',
  hour = '',
  minute = '',
  second = '',
  link,
  onChange,
  fetchData,
  auctionStatus
}) => {
  const [time, setTime] = useState({
    d: day,
    h: hour,
    m: minute,
    s: second
  });

  const timeChangeHandler = useCallback(
    e => {
      e.preventDefault();
      const { name, value } = e.target;
      let Value = value.replace(/[^0-9]/g, '');

      if (name == 'd') {
        if (parseInt(Value) > 50) {
          alert('50일이 최대입니다.');
          onChange(name, 50);
          setTime(time => ({ ...time, [name]: 50 }));
          return;
        }
      } else if (name == 'h') {
        if (parseInt(Value) > 50) {
          alert('24시간이 최대입니다.');
          onChange(name, 24);
          setTime(time => ({ ...time, [name]: 24 }));
          return;
        }
      } else if (name == 'm') {
        if (parseInt(Value) > 50) {
          alert('60분이 최대입니다.');
          onChange(name, 60);
          setTime(time => ({ ...time, [name]: 60 }));
          return;
        }
      } else if (name == 's') {
        if (parseInt(Value) > 50) {
          alert('60초가 최대입니다.');
          onChange(name, 60);
          setTime(time => ({ ...time, [name]: 60 }));
          return;
        }
      }
      onChange(name, Value);
      setTime(time => ({ ...time, [name]: Value }));
    },
    [onChange]
  );

  const ChageTime = useCallback(payload => {
    setTime(time => ({ ...time, [payload.key]: payload.value }));
  });

  useEffect(() => {
    if (auctionStatus) return;
    if (isSet) {
      const countdown = setInterval(async () => {
        if (
          parseInt(time.d) <= 0 &&
          parseInt(time.h) <= 0 &&
          parseInt(time.m) <= 0 &&
          parseInt(time.s) <= 0
        ) {
          clearInterval(countdown);
          await fetch(
            `https://rest.dealink.co.kr/auction/${link}`,
            // `http://192.168.0.102:8080/auction/${link}`,
            {
              method: 'GET'
            }
          );
          fetchData();
          return () => clearInterval(countdown);
        }
        if (parseInt(time.s) > 0) {
          ChageTime({ key: 's', value: parseInt(time.s) - 1 });
        } else {
          if (parseInt(time.m) > 0) {
            ChageTime({ key: 'm', value: parseInt(time.m) - 1 });
          } else {
            if (parseInt(time.h) > 0) {
              ChageTime({ key: 'd', value: parseInt(time.d) - 1 });
            } else {
              ChageTime({ key: 'h', value: 24 });
            }
            ChageTime({ key: 'm', value: 59 });
          }
          ChageTime({ key: 's', value: 59 });
        }
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [time]);

  const T = [
    { t: time.d, type: 'd', suffix: '일' },
    { t: time.h, type: 'h', suffix: '시' },
    { t: time.m, type: 'm', suffix: '분' },
    { t: time.s, type: 's', suffix: '초' }
  ];

  return (
    <TimeWrapper>
      {isSet && <TimeDisplay time={time}></TimeDisplay>}
      {!isSet &&
        T.map(t => {
          return (
            <>
              <TimerInputWrapper>
                <TimerInput
                  placeholder="0"
                  onChange={timeChangeHandler}
                  value={t.t}
                  type={t.type}
                  name={t.type}
                />
              </TimerInputWrapper>
              <Colon text={t.suffix} />
            </>
          );
        })}
    </TimeWrapper>
  );
};

const Timer = props => {
  const { d, h, m, s, link } = props.value;
  let endDate;
  let endTime;

  if (!props.isSet) {
    if (endDate == 'Invalid Date') {
      endDate = '시간을 설정해 주세요.';
    } else {
      endDate = moment().add(parseInt(d), 'days').format('MM [월] DD [일] ');
      endTime = moment()
        .add(parseInt(h), 'hours')
        .add(parseInt(m), 'minutes')
        .format('hh [시] mm [분]');
    }
  }

  return (
    <TimerItemWrppaer>
      <TimerItem
        auctionStatus={props.auctionStatus}
        fetchData={props.fetchData}
        isSet={props.isSet ? true : false}
        value={props.value}
        onChange={props.onChange}
        date={30}
        day={d <= 0 ? '' : d}
        hour={h <= 0 ? '' : h}
        minute={m <= 0 ? '' : m}
        second={s <= 0 ? '' : s}
        link={link}
      />
      {!props.isSet && (
        <TimerDateTextWrapper>
          <Bold>판매 종료일</Bold> <Bold>{endDate}</Bold> <Bold>{endTime}</Bold>
        </TimerDateTextWrapper>
      )}
    </TimerItemWrppaer>
  );
};
const ColonText = styled.div`
  margin: 10px;
  text-align: center;
  font-size: 18px;
`;

const Colon = ({ text }) => {
  return <ColonText>{text}</ColonText>;
};
const Bold = styled.div`
  font-size: 14px;
  font-weight: 600;
  padding: 5px;
`;
const TimerItemWrppaer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const TimerDateTextWrapper = styled.div`
  margin-top: 10px;
  padding: 15px 40px 15px 40px;
  font-size: 14px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f5f5f7;
  width: 100%;
`;

const TimerInput = styled.input.attrs({
  type: 'tel',
  id: 'timer'
})`
  text-align: center;
  font-size: 20px;
  font-weight: 900;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  width: 100%;
  padding: 5px;
  max-width: 40px;
`;

const TimeWrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  flex-direction: row;
  flex: 1;
`;

const TimerInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TimeDisplayWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(109, 68, 255, 0.5);
  display: flex;
  padding: 5px 10px 5px 10px;
  border-radius: 30px;
  color: white;
  justify-content: center;
  align-items: center;
`;
const TimeDisplayText = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 500;
`;
const TimeDisplay = ({ time }) => {
  const hours =
    String(time.d * 24 + time.h).length < 2
      ? '0' + (time.d * 24 + time.h)
      : time.d * 24 + time.h;
  const minutes = String(time.m).length < 2 ? '0' + time.m : time.m;
  const seconds = String(time.s).length < 2 ? '0' + time.s : time.s;
  return (
    <TimeDisplayWrapper>
      <GiAlarmClock size={25} style={{ padding: 5 }} color="black" />
      <TimeDisplayText>{hours}:</TimeDisplayText>
      <TimeDisplayText>{minutes}:</TimeDisplayText>
      <TimeDisplayText>{seconds}</TimeDisplayText>
    </TimeDisplayWrapper>
  );
};

export default Timer;
