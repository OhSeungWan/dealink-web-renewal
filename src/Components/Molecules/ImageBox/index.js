import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { BiPlusMedical } from 'react-icons/bi';
import { Slider } from 'Components/Molecules';

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const ImgContainer = styled.div`
  margin: 15px 0px 15px 0px;

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
  }}
`;

const ImageBox = ({ url, type, onChange }) => {
  const fileInput = useRef();
  const Image = useRef();
  const [Url, setUrl] = useState(url);
  const [Type, setType] = useState(type);
  const [imageList, setImageList] = useState([]);

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

  return Type == 'upload' ? (
    <>
      <ImgContainer upload onClick={() => open_filebrowser(fileInput)}>
        <BiPlusMedical size={25} />
        <div>0/10</div>
        <form name="file_up_test">
          <input
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
    </>
  ) : (
    <>
      <ImgContainer>
        <Img src={Url}></Img>
      </ImgContainer>
    </>
  );
};

export default ImageBox;
