import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { BiPlusMedical } from 'react-icons/bi';
import { Slider } from 'Components/Molecules';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Img = styled.img`
  width: 100%;
`;
const ImgContainer = styled.div`
  ${props => {
    if (props.upload) {
      return css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 40vw;
        height: 40vh;
        max-width: 100px;
        max-height: 100px;
        border: 1px solid #eaeaea;
        &:hover {
          cursor: pointer;
        }
      `;
    }
  }};
`;

const ImageBox = ({ url, type, onChange }) => {
  const history = useHistory();
  const fileInput = useRef();
  const [Url, setUrl] = useState(url);
  const [imageList, setImageList] = useState([]);
  const userInfo = useSelector(state => state.user);
  const confirmLogin = () => {
    if (!userInfo.accessToken) {
      alert('로그인 후 상품 등록이 가능합니다.');
      history.push('/SignIn');
    }
  };
  //TODO: Think about refect , 이미지 업로드 개수 제한 적용해야함
  //이미지 슬라이드에 들어갈 썸네일 생성
  const setThumbnail = event => {
    [...event.target.files].map(file => {
      var reader = new FileReader();

      reader.onload = function (event) {
        setImageList(imageList => [...imageList, event.target.result]);
        setUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  //파일 브라우저 열기
  const open_filebrowser = form => {
    confirmLogin();
    if (!userInfo.accessToken) return;
    form.current.click();
  };

  //파일 선택시 썸네일 생성
  const fileChangeHandler = e => {
    e.preventDefault();
    const { name, files } = e.target;
    var fileList = [];
    [...files].map(item => {
      fileList.push(item);
    });
    onChange(name, fileList);
    setThumbnail(e);
  };

  return type == 'upload' ? (
    <div style={{ display: 'flex', flex: 1, width: '90%' }}>
      <ImgContainer upload onClick={() => open_filebrowser(fileInput)}>
        <BiPlusMedical size={25} />
        <form name="file_up_test">
          <input
            accept="image/*"
            type="file"
            style={{ display: 'none' }}
            multiple={true}
            ref={fileInput}
            onChange={fileChangeHandler}
            name="imageList"
          />
        </form>
      </ImgContainer>
      <Slider ImageList={imageList}></Slider>
    </div>
  ) : (
    <ImgContainer>
      <Img src={Url}></Img>
    </ImgContainer>
  );
};

export default ImageBox;
