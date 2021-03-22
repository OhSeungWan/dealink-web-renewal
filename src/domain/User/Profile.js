import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AiOutlineRight } from 'react-icons/ai';
import { HiUserCircle } from 'react-icons/hi';
import { REQUEST_URL } from 'Constants/server';
import styled from 'styled-components';

const Profile = () => {
  const { userId } = useParams();
  const [profileDate, setprofileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const accessToken = sessionStorage.getItem('accessToken');

  async function getProfile() {
    setLoading(false);
    const res = await fetch(`${REQUEST_URL}user/${userId}`, {
      headers: { AUTH_TOKEN: accessToken }
    });

    const data = await res.json();
    console.log(data);
    setprofileData(data);
    setLoading(true);
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    loading && (
      <ProfileWrapper>
        <hr className="hr" />
        <div className="userinfo">
          <HiUserCircle color="#6E44FF" size={45} />
          <div className="username">{profileDate.name}</div>
        </div>
        <hr className="hr1" />
        <div
          className="saleslist"
          onClick={() => history.push(`/MyLink/${userId}`)}
        >
          {`판매상품(${profileDate.auctionLinkResponseList.length}개)`}
          <AiOutlineRight />
        </div>
        <hr className="hr" />
        <div className="saleslist">
          {`상품 댓글(${profileDate.commentFindResponseList.length}개)`}
        </div>
        <div className="commentlist">
          {profileDate.commentFindResponseList.map(comment => {
            return <CommentItem />;
          })}
        </div>
        <hr className="hr" />
      </ProfileWrapper>
    )
  );
};
const CommentItem = styled.div``;
const ProfileWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .hr {
    width: 100%;
    border: solid 1px #eaeaea;
  }
  .hr1 {
    width: 100%;
    border: solid 5px #eaeaea;
  }
  .userinfo {
    display: flex;
    font-size: 20px;
    align-items: center;
  }
  .saleslist {
    display: flex;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
  }
  .commentlist {
    display: flex;
    flex-direction: column;
  }
`;

export default Profile;
