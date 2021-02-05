import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { GiAlarmClock } from 'react-icons/gi';
import moment from 'moment';
import { useInterval } from 'Hooks/useInterval';

export const TimerItem = ({ small, closingTime, link }) => {
  const [time, setTime] = useState(
    moment.duration(moment(closingTime).diff(moment())).clone()
  );

  const handleCompleteAuction = async () => {
    await fetch(`https://rest.dealink.co.kr/auction/${link}`);
  };

  const remainTime = moment
    .duration(moment(closingTime).diff(moment()))
    .as('ms');

  useInterval(
    () => {
      setTime(moment.duration(moment(closingTime).diff(moment())).clone());
    },
    remainTime > 0 ? 1000 : null
  );

  if (remainTime <= 0) {
    handleCompleteAuction();
  }

  return (
    <TimeWrapper>
      <TimeDisplay
        remainTime={remainTime}
        small={small ? true : false}
        time={time}
      ></TimeDisplay>
    </TimeWrapper>
  );
};

const Timer = props => {
  const {
    link,
    closingTime,
    isSet,
    fetchData,
    auctionStatus,
    onChange,
    auctionInput
  } = props;

  return isSet ? (
    <TimerItemWrppaer>
      <TimerItem
        closingTime={closingTime}
        auctionStatus={auctionStatus}
        fetchData={fetchData}
        link={link}
      />
    </TimerItemWrppaer>
  ) : (
    <TimeSetter>
      <TimerInput auctionInput={auctionInput} onChange={onChange} />
    </TimeSetter>
  );
};

const TimerInput = ({ auctionInput, onChange }) => {
  const { d, h, m, s } = auctionInput;

  const times = [
    { t: d, n: 'd', suffix: '일' },
    { t: h, b: 'h', suffix: '시' },
    { t: m, b: 'm', suffix: '분' }
    // { t: s, b: 's',suffix:'초' }
  ];

  const handleChangeTime = e => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const endDate = moment()
    .add(d, 'days')
    .add(h, 'hours')
    .add(m, 'minutes')
    .add(s, 'seconds');
  return (
    <TimerInputWrapper>
      <div className="input-wrapper">
        {times.map(time => {
          return (
            <>
              <input
                type="tel"
                name={time.n}
                value={time.t}
                placeholder="0"
                onChange={handleChangeTime}
              />
              <div>{time.suffix}</div>
            </>
          );
        })}
      </div>
      <div className="text-wrapper">
        <div>경매 종료일:</div>
        <div>{`${endDate.year()}년`} </div>
        <div>{`${endDate.month() + 1}월`}</div>
        <div>{`${endDate.date()}일`}</div>
        <div>{`${endDate.hours()}시`}</div>
        <div>{`${endDate.minutes()}분`}</div>
        <div>마감</div>
      </div>
    </TimerInputWrapper>
  );
};

export const TimeDisplay = ({ time, small, remainTime }) => {
  const format = t => {
    return String(t).length < 2 ? '0' + String(t) : String(t);
  };

  return (
    <TimeDisplayWrapper small={small}>
      <GiAlarmClock
        size={small ? 17 : 25}
        style={{ padding: small ? 1 : 5 }}
        color="black"
      />
      {remainTime > 0 ? (
        <>
          <div className="text">{format(time.days())}일 </div>
          <div className="text">{format(time.hours())}:</div>
          <div className="text">{format(time.minutes())}:</div>
          <div className="text">{format(time.seconds())}</div>
        </>
      ) : (
        <div className="text">경매 종료</div>
      )}
    </TimeDisplayWrapper>
  );
};

const TimeSetter = styled.div`
  width: 100%;
`;

const TimerItemWrppaer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const TimerInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .input-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      margin-left: 5px;
    }
  }

  .text-wrapper {
    display: flex;
    width: 100%;
    justify-content: space-around;
    background-color: #f5f5f7;
    margin-top: 10px;
    padding: 15px 0px;
  }

  input {
    text-align: center;
    font-size: 20px;
    font-weight: 900;
    border: 1px solid #eaeaea;
    border-radius: 10px;
    width: 100%;
    padding: 5px;
    max-width: 40px;
    margin-left: 1rem;
  }
`;

const TimeWrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  flex-direction: row;
  flex: 1;
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
  z-index: 1;
  .text {
    color: white;
    font-size: 16px;
    font-weight: 500;
  }
  ${props => {
    if (props.small) {
      return css`
        div {
          font-size: 12px;
        }

        padding: 3px;
        background-color: rgba(77, 77, 77, 0.9);
        border-radius: 5px;
      `;
    }
  }}
`;

export default Timer;
// const timeChangeHandler = useCallback(
//   e => {
//     e.preventDefault();
//     const { name, value } = e.target;
//     let Value = value.replace(/[^0-9]/g, '');

//     if (name == 'd') {
//       if (parseInt(Value) > 50) {
//         alert('50일이 최대입니다.');
//         onChange(name, 50);
//         setTime(time => ({ ...time, [name]: 50 }));

//         return;
//       }
//     } else if (name == 'h') {
//       if (parseInt(Value) > 50) {
//         alert('24시간이 최대입니다.');
//         onChange(name, 24);
//         setTime(time => ({ ...time, [name]: 24 }));
//         return;
//       }
//     } else if (name == 'm') {
//       if (parseInt(Value) > 50) {
//         alert('60분이 최대입니다.');
//         onChange(name, 60);
//         setTime(time => ({ ...time, [name]: 60 }));
//         return;
//       }
//     } else if (name == 's') {
//       if (parseInt(Value) > 50) {
//         alert('60초가 최대입니다.');
//         onChange(name, 60);
//         setTime(time => ({ ...time, [name]: 60 }));
//         return;
//       }
//     }
//     onChange(name, Value);
//     setTime(time => ({ ...time, [name]: Value }));
//   },
//   [onChange]
// );
