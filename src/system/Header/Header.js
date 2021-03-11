import {
  AiOutlineAlignCenter,
  AiOutlineComment,
  AiOutlineHome,
  AiOutlineQuestionCircle,
  AiOutlineShoppingCart,
  AiOutlineUser
} from 'react-icons/ai';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { BannerTop } from 'Components/Molecules';
import { BiLogIn } from 'react-icons/bi';
import { Button } from 'Components/Atoms';
import { GrClose } from 'react-icons/gr';
import { HiMenu } from 'react-icons/hi';
import acaimg from 'assets/img/aca.png';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const MyLinkWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;
`;

const SignInLink = () => {
  const history = useHistory();

  const goMyLink = () => {
    history.push('/SignIn');
  };
  return (
    <MyLinkWrapper>
      <Button onClick={goMyLink} secondary>
        <BiLogIn /> 간편 로그인
      </Button>
    </MyLinkWrapper>
  );
};

const Header = ({ banner, front }) => {
  const history = useHistory();
  const handleClickHeader = () => {
    history.push('/');
  };
  return (
    <HeaderWrapper front={front}>
      <HeaderColumnWrapper>
        {banner && <BannerTop></BannerTop>}
        <HeaderContainer>
          <img src={acaimg} width={140} onClick={handleClickHeader} />
          {/* <div onClick={handleClickHeader}>DeaLink</div> */}
          <HeaderHambugerMenuBtn />
        </HeaderContainer>
      </HeaderColumnWrapper>
    </HeaderWrapper>
  );
};

const HeaderHambugerMenuBtn = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const openMenu = () => {
    setMenuOpen(true);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <HambugerWrapper>
      <HiMenu onClick={openMenu} />
      {menuOpen && <MenuList closeMenu={closeMenu} />}
    </HambugerWrapper>
  );
};

const HambugerWrapper = styled.div``;

const MenuList = ({ closeMenu }) => {
  const isLogin = useSelector(state => state.user.isLogin);
  const userId = sessionStorage.getItem('userId');

  const menuList = [
    {
      name: 'Home',
      link: '/',
      icon: <AiOutlineHome size={28} fontWeight={700} />
    },
    {
      name: 'MY내역',
      link: '/MyLink',
      icon: <AiOutlineUser size={28} fontWeight={700} />
    },
    {
      name: '상품등록',
      link: '/main',
      icon: <AiOutlineShoppingCart size={28} fontWeight={700} />
    },
    {
      name: '채팅내역',
      link: '/chatlist',
      icon: <AiOutlineComment size={28} fontWeight={700} />
    },
    {
      name: '자유 게시판',
      link: '/null',
      icon: <AiOutlineAlignCenter size={28} fontWeight={700} />
    },
    {
      name: '문의하기',
      link: '/null',
      icon: <AiOutlineQuestionCircle size={28} fontWeight={700} />
    }
  ];
  return (
    <>
      <MenuListWrapper>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <GrClose onClick={closeMenu} style={{ padding: 10 }} />
        </div>
        {(!userId || userId == 'undefined') && <SignInLink />}
        {menuList.map(menu => {
          return (
            <MenuItem name={menu.name} link={menu.link} icon={menu.icon} />
          );
        })}
      </MenuListWrapper>
      <FadeOut />
    </>
  );
};

const MenuListWrapper = styled.div`
  position: absolute;
  padding: 10px 0px;
  width: 70%;
  top: 0px;
  left: 0;
  height: 100vh;
  font-size: 16px;
  background-color: white;
  box-shadow: 0px 0px 20px 0px #000000;
`;

const FadeOut = styled.div`
  position: absolute;
  padding: 10px 0px;
  width: 30%;
  top: 0px;
  right: 0;
  height: 100vh;
  font-size: 16px;
  background-color: rgba(222, 222, 222, 0.6);
`;

const HeaderColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MenuItem = ({ link, name, icon }) => {
  const history = useHistory();
  const location = useLocation().pathname;
  const pathName = location === '' ? '/' : location;
  const onClick = () => {
    if (name == '문의하기') {
      window.location.href = 'http://pf.kakao.com/_DSWSK/chat';
      return;
    } else if (name == '자유 게시판') {
      alert('준비중 입니다.');
      return;
    }
    history.push(link);
  };

  return (
    <MenuItemWrapper onClick={onClick} selected={pathName === link}>
      <div className="icon">{icon}</div>
      <div className="name">{name}</div>
    </MenuItemWrapper>
  );
};

const MenuItemWrapper = styled.div`
  text-align: left;
  background-color: ${props => (props.selected ? '#F5F5F7' : '')};
  color: ${props => (props.selected ? '#6E44FF' : 'black')};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-top: 1px solid white;
  padding: 10px 10px;
  font-weight: 400;

  div {
    &.icon {
      margin: 9px 10px 9px 10px;
    }
    &.name {
    }
  }
`;

const HeaderContainer = styled.div`
  font-weight: 700;
  font-size: 25px;
  text-align: left;
  padding: 15px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
`;
const HeaderWrapper = styled.div`
  z-index: ${props => (props.front ? '9999' : '1')};
  position: fixed;
  flex: 1;
  top: 0;
  width: 100%;
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  z-index: 999;
`;

export default Header;
