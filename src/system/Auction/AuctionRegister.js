import { Container, ScreenWrapper } from 'Components/Atoms';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AuctionRegisterInputForm from 'system/Auction/AuctionRegisterInputForm';
import AuctionRegisterModal from 'system/Auction/AuctionRegisterModal';
import { Button } from 'Components/Atoms';
import { Loading } from 'Components/Organisms/Modal';
import { auctionApi } from 'Apis/auctionApi';
import { fetchUser } from 'Store/Slice/userSlice';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useProduct } from 'Hooks/useProduct';

const getCookie = cookie_name => {
  var x, y;
  var val = document.cookie.split(`;`);

  for (var i = 0; i < val.length; i++) {
    x = val[i].substr(0, val[i].indexOf(`=`));
    y = val[i].substr(val[i].indexOf(`=`) + 1);
    x = x.replace(/^\s+|\s+$/g, '');

    if (x === cookie_name) {
      return unescape(y);
    }
  }
};
const AuctionRegister = () => {
  const userInfo = useSelector(state => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const [value, setValue, loading, setLoading, validate] = useProduct();
  const [modalData, setModalData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);

    history.push(`/Product/seller/${userInfo.id}/${modalData.url}`, {
      before: true
    });
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const calcClosingDate = () => {
    const closingDate = moment()
      .add(value.d, 'days')
      .add(value.h, 'hours')
      .add(value.m, 'minutes')
      .add(value.s, 'seconds')
      .format('yyyy-MM-DD HH:mm:ss');

    return closingDate;
  };

  const makeAuctionFormData = () => {
    let form = new FormData();

    value.imageList.map(item => {
      return form.append('productImages', item);
    });
    form.append(
      'auctionInfoRequest',
      JSON.stringify({
        startingPrice: value.productPrice.replace(/[^0-9]/g, ''), // 경매 시작가
        currentPrice: value.productPrice.replace(/[^0-9]/g, ''), // 경매 현재가
        closingTime: calcClosingDate(), // 경매 마감시간
        tradingMethod: '직거래', //
        chatUrl: 'https://open.kakao.com/o/gDbtKmTc', // 오픈채팅 주소
        name: value.productTitle,
        description: value.description,
        status: '0',
        url: null
      })
    );

    return form;
  };

  const onRegisterAuction = async () => {
    if (validate()) {
      return;
    }

    const fromData = makeAuctionFormData();
    setLoading(false);
    const data = await auctionApi.registerAuction(userInfo.id, {
      method: 'POST',
      headers: {
        AUTH_TOKEN: userInfo.accessToken
      },
      body: fromData
    });
    setModalData(data);
    setLoading(true);
    openModal();
  };

  useEffect(() => {
    if (userInfo.type !== 'GUEST')
      dispatch(fetchUser(getCookie('accessToken')));
  }, []);

  return loading ? (
    <>
      <AuctionRegisterInputForm onChange={setValue} value={value} />
      {userInfo.isLogin && (
        <Button
          onClick={onRegisterAuction}
          primary
          common
          style={{ position: 'fixed', bottom: 5 }}
        >
          상품등록
        </Button>
      )}
      <AuctionRegisterModal
        modalData={modalData}
        closeModal={closeModal}
        isOpen={isOpen}
      />
    </>
  ) : (
    <ScreenWrapper>
      <Container>
        <Loading isOpen={true}></Loading>
      </Container>
    </ScreenWrapper>
  );
};

export default AuctionRegister;
