import { Bidding, Modal, Nextrankchange } from 'Components/Organisms';
import { Border, ScreenWrapper } from 'Components/Atoms';
import React, { useEffect } from 'react';
import {
  closeModal,
  getAuctionBidHistory,
  openModal,
  useAuctionDetailDispatch,
  useAuctionDetailState
} from 'Pages/ProductDetail/AuctionDetailContext';

import AuctionDetailFirstModal from './AuctionDetailFirstModal';
import BidHistoryList from 'domain/Bid/BidhistoryList';
import { getCookie } from 'lib/Cookies';

const AuctionDetailModal = () => {
  const state = useAuctionDetailState();
  const dispatch = useAuctionDetailDispatch();

  const { open, content } = state.modal;
  const { data: bidHistory, loading, error } = state.bid;
  const { data: auction } = state.auction;

  function openFirstModal() {
    if (getCookie('notSeeAgainToday')) return;
    openModal(dispatch, 'first');
  }

  function _closeModal() {
    closeModal(dispatch);
  }

  useEffect(() => {
    if (content === 'bidHistory') getAuctionBidHistory(dispatch, auction.url);
  }, [dispatch, content]);

  useEffect(() => {
    var userAgent = navigator.userAgent.toLowerCase();
    const iOS = () => {
      return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
        // 'MacIntel'
      ].includes(navigator.platform);
      // ||
      // // iPad on iOS 13 detection
      // (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
    };
    var browser = false;

    if (userAgent.indexOf('edge') > -1) {
      browser = true;
    } else if (userAgent.indexOf('whale') > -1) {
      browser = true;
    } else if (userAgent.indexOf('chrome') > -1) {
      browser = true;
    } else if (userAgent.indexOf('firefox') > -1) {
      browser = true;
    } else {
      browser = true;
    }
    if (browser && !iOS) openFirstModal();
  }, []);

  if (loading) return null;
  if (error) return <div>에러가 발생했습니다</div>;

  return (
    open && (
      <ScreenWrapper>
        {content === 'first' && (
          <AuctionDetailFirstModal closeModal={_closeModal} />
        )}
        {content === 'bidHistory' && bidHistory && (
          <Modal
            isOpen={open}
            closeModal={_closeModal}
            title={'찜한 사람들'}
            height={60}
          >
            <BidHistoryList data={bidHistory} auction={auction} />
          </Modal>
        )}
        {content === 'bid' && (
          <Modal
            isOpen={open}
            closeModal={_closeModal}
            title={'입찰하기'}
            height={60}
          >
            <Bidding isOpen={true} data={auction} />
          </Modal>
        )}
        {content === 'changeNext' && (
          <Modal
            isOpen={open}
            closeModal={_closeModal}
            title={'입찰하기'}
            height={60}
          >
            <Nextrankchange link={auction.url} closeModal={_closeModal} />
          </Modal>
        )}
      </ScreenWrapper>
    )
  );
};

export default AuctionDetailModal;
