import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { BiPlusMedical } from 'react-icons/bi';
import { Slider } from 'Components/Molecules';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Compress = require('compress.js');
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
        min-width: 100px;
        max-height: 100px;
        border: 1px solid #eaeaea;
        &:hover {
          cursor: pointer;
        }
        &:focus {
          background-color: Aqua;
        }
      `;
    }
  }};
`;

const ImageBox = ({ url, type, onChange, imglist, id }) => {
  const history = useHistory();
  const fileInput = useRef();
  const [Url, setUrl] = useState(url);
  const [imageList, setImageList] = useState([]);
  const userInfo = useSelector(state => state.user);
  const confirmLogin = () => {
    if (!userInfo.isLogin) {
      alert('로그인 후 상품 등록이 가능합니다.');
      history.push('/SignIn');
    }
  };

  // useEffect(()=>{
  //   if(imglist){
  //     const List =[];
  //     imglist.map((img)=>{
  //       List.push({
  //         src:img, name:
  //       })
  //     })
  //   }
  // },[])
  //TODO: Think about refect , 이미지 업로드 개수 제한 적용해야함
  //이미지 슬라이드에 들어갈 썸네일 생성
  const setThumbnail = event => {
    [...event.target.files].map(file => {
      var reader = new FileReader();

      reader.onload = function (event) {
        console.log(file);
        setImageList(imageList => [
          ...imageList,
          { src: event.target.result, name: file.name }
        ]);
        setUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  //파일 브라우저 열기
  const open_filebrowser = form => {
    confirmLogin();
    if (!userInfo.isLogin) return;
    form.current.click();
  };
  const compress = new Compress();
  //파일 선택시 썸네일 생성
  const fileChangeHandler = e => {
    e.preventDefault();
    const { name } = e.target;
    const files = [...e.target.files];
    // compress
    //   .compress(files, {
    //     size: 4, // the max size in MB, defaults to 2MB
    //     quality: 0.75, // the quality of the image, max is 1,
    //     maxWidth: 400, // the max width of the output image, defaults to 1920px
    //     maxHeight: 400, // the max height of the output image, defaults to 1920px
    //     resize: true // defaults to true, set false if you do not want to resize the image width and height
    //   })
    //   .then(data => {
    //     // returns an array of compressed images
    //     console.log(data);
    //     // onChange(name, data);
    //   });
    // var fileList = [];
    // [...files].map(item => {
    //   fileList.push(item);
    // });
    console.log(files);
    onChange(name, [...e.target.files]);
    setThumbnail(e);
  };

  const remove = name => {
    console.log(name);
    onChange('removeImg', name);
    setImageList(imageList => imageList.filter(img => img.name != name));
  };
  return type == 'upload' ? (
    <div style={{ display: 'flex', flex: 1, width: '90%' }}>
      <ImgContainer
        upload
        onClick={() => open_filebrowser(fileInput)}
        tabindex="-1"
        id="imageList"
      >
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
      <Slider ImageList={imageList} onRemove={remove}></Slider>
    </div>
  ) : (
    <ImgContainer>
      <Img src={Url}></Img>
    </ImgContainer>
  );
};

export default ImageBox;
