import React, { useCallback, useEffect, useState } from 'react';

import moment from 'moment';
// import Picker from 'react-scrollable-picker';
import styled from 'styled-components';

const generateNumberArray = (begin, end) => {
  let array = [];
  for (let i = begin; i <= end; i++) {
    const value = (i < 10 ? '0' : '') + i;
    array.push({
      value: (i < 10 ? '0' : '') + i,
      label: (i < 10 ? '0' : '') + i
    });
  }
  return array;
};

// const TimePicker = () => {
//   const [valueGroups, setValueGroups] = useState({
//     d: 0,
//     h: 0,
//     m: 0,
//     s: 0
//   });

//   const [optionGroups, setOptionGroups] = useState({
//     d: generateNumberArray(0, 50),
//     h: generateNumberArray(0, 50),
//     m: generateNumberArray(0, 50),
//     s: generateNumberArray(0, 50)
//   });

//   return (
//     <Picker
//       optionGroups={optionGroups}
//       valueGroups={valueGroups}
//       onChange={() => {
//         return;
//       }}
//     />
//   );
// };

const TimerInput = styled.input.attrs(props => {
  if (props.type == 'd') {
    return { type: 'tel', max: '100', min: '0', id: 'timer' };
  } else if (props.type == 'h') {
    return { type: 'tel', max: '24', min: '0', id: 'timer' };
  } else if (props.type == 'm') {
    return { type: 'tel', max: '60', min: '0', id: 'timer' };
  } else if (props.type == 's') {
    return { type: 'tel', max: '60', min: '0', id: 'timer' };
  }
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

const TimerItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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

      if (!Value || Value == '' || Value == null || Value == undefined) {
        Value = '0';
      }

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

  //TODO: use useCallback()
  //TODO: refectoring

  return (
    <TimeWrapper>
      <TimerItemWrapper>
        <TimerInput
          readOnly={isSet ? true : false}
          placeholder="0"
          onChange={!isSet ? timeChangeHandler : null}
          value={time.d}
          type="d"
          name="d"
        />
      </TimerItemWrapper>
      <Colon text={'일'} />
      <TimerItemWrapper>
        <TimerInput
          readOnly={isSet ? true : false}
          placeholder="0"
          onChange={!isSet ? timeChangeHandler : null}
          value={time.h}
          type="h"
          name="h"
        />
      </TimerItemWrapper>

      <Colon text={'시간'} />

      <TimerItemWrapper>
        <TimerInput
          readOnly={isSet ? true : false}
          placeholder="0"
          onChange={!isSet ? timeChangeHandler : null}
          value={time.m}
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
              onChange={!isSet ? timeChangeHandler : null}
              value={time.s}
              type="s"
              name="s"
            />
          </TimerItemWrapper>
          <Colon text={'초'} />
        </>
      )}
    </TimeWrapper>
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
        auctionStatus={props.auctionStatus}
        fetchData={props.fetchData}
        isSet={props.isSet ? true : false}
        value={props.value}
        onChange={props.onChange}
        date={30}
        day={d <= 0 ? 0 : d}
        hour={h <= 0 ? 0 : h}
        minute={m <= 0 ? 0 : m}
        second={s <= 0 ? 0 : s}
        link={link}
      />
      {/* <div
        style={{ position: 'sticky', top: 0 }}
        onTouchStart={() => {
          document.body.style.cssText = `overflow: hidden; height:100%; touch-action: none; `;
        }}
        onTouchEnd={() => {
          setTimeout(() => {
            document.body.style.cssText = `overflow: auto; height:''; touch-action: ''; `;
          }, 1000);
        }}
      >
        <TimePicker />
      </div> */}
      {!props.isSet && (
        <TimerDateTextWrapper>
          <Bold>판매 종료일</Bold> <Bold>{endDate}</Bold> <Bold>{endTime}</Bold>
        </TimerDateTextWrapper>
      )}
    </div>
  );
};

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
export default Timer;
