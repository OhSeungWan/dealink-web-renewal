import React, { useEffect, useMemo, useState } from 'react';
import {
  getAuctionComment,
  registerAuctionComment,
  useAuctionDetailDispatch,
  useAuctionDetailState
} from 'Pages/ProductDetail/AuctionDetailContext';

import { HiUserCircle } from 'react-icons/hi';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const ProductComment = ({ auction }) => {
  const state = useAuctionDetailState();
  const history = useHistory();
  const [input, setInput] = useState('');
  const [typingCount, setTypingCount] = useState(0);
  const dispatch = useAuctionDetailDispatch();
  const userId = sessionStorage.getItem('userId');

  const { data: comment, loading, error } = state.comment;
  function handleInputChange(e) {
    const { value } = e.target;
    const count = value.length;
    setInput(value);
    setTypingCount(count);
  }

  async function registerComment() {
    const userId = sessionStorage.getItem('userId');
    if (userId && userId !== 'undefined') {
      await registerAuctionComment(dispatch, auction.id, userId, input);
      await getAuctionComment(dispatch, auction.id);
    } else {
      alert('로그인이 필요합니다.');
      history.push('/SignIn');
    }
    setTypingCount(0);
    setInput('');
  }

  useEffect(() => {
    getAuctionComment(dispatch, auction.id);
  }, [dispatch]);

  return (
    <ProductCommentWrppaer active={typingCount}>
      <div className="wrapper">
        <div>댓글 </div>
        <div className="commentCount">
          {comment && comment.length > 0 ? comment.length : 0}개
        </div>
      </div>
      <input
        value={input}
        onChange={handleInputChange}
        placeholder="댓글 입력"
      />
      <div className="typingCount">
        <div className="wrapper">
          100/<div className="count">{typingCount}</div>
        </div>
        <div className="registerBtn" onClick={registerComment}>
          등록
        </div>
      </div>

      {!loading && comment && comment.length > 0 && (
        <div className="commentList">
          {comment.map((item, index) => {
            return <CommentItem item={item} key={index} />;
          })}
        </div>
      )}
    </ProductCommentWrppaer>
  );
};

const CommentItem = ({ item }) => {
  function random_rgba() {
    var o = Math.round,
      r = Math.random,
      s = 255;
    return (
      'rgba(' +
      o(r() * s) +
      ',' +
      o(r() * s) +
      ',' +
      o(r() * s) +
      ',' +
      r().toFixed(1) +
      ')'
    );
  }

  const color = useMemo(() => random_rgba(), []);
  return (
    <CommentItemWrapper>
      <HiUserCircle size={40} color={color} />
      <div>
        <div className="who">{item.name}</div>
        <div className="content">{item.description}</div>
      </div>
    </CommentItemWrapper>
  );
};
const CommentItemWrapper = styled.div`
  display: flex;
  align-items: center;
  .who {
    margin: 0px 10px;
    color: #a09fa7;
    font-size: 12px;
  }
  .content {
    margin: 0px 10px;
  }
`;
const ProductCommentWrppaer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin-bottom: 10px;

  .wrapper {
    display: flex;
  }
  .commentCount {
    margin-left: 10px;
    color: #ff2f2f;
  }
  .commentList {
    margin: 20px 0px;
  }
  input {
    padding: 15px;
    width: 90%;
    margin-top: 10px;
    border: solid 1px #a09fa7;
    :focus {
      outline: none;
    }
  }

  .typingCount {
    display: flex;
    justify-content: space-between;
    border: solid 1px #a09fa7;
    color: #a09fa7;
    border-top: none;
    padding: 5px 15px;
    width: 90%;
  }
  .registerBtn {
    color: ${props => (props.active ? '#6e44ff' : '#A09FA7')};
    border: solid 1px ${props => (props.active ? '#6e44ff' : '#A09FA7')};
    padding: 0px 10px;
    border-radius: 5px;
  }
  .count {
  }
`;

export default ProductComment;
