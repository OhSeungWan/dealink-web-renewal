import {
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineUser
} from 'react-icons/ai';
import React, { useState } from 'react';

import { BannerTop } from 'Components/Molecules';
import { BiLogIn } from 'react-icons/bi';
import { Button } from 'Components/Atoms';
import { GrClose } from 'react-icons/gr';
import { HiMenu } from 'react-icons/hi';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MyLinkWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
          <div onClick={handleClickHeader}>DeaLink</div>
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
  const menuList = [
    { name: 'Home', link: '/', icon: <AiOutlineHome /> },
    { name: 'MY내역', link: '/MyLink', icon: <AiOutlineUser /> },
    { name: '상품등록', link: '/main', icon: <AiOutlineShoppingCart /> }
  ];
  return (
    <MenuListWrapper>
      <GrClose onClick={closeMenu} />
      {!isLogin && <SignInLink />}
      {menuList.map(menu => {
        return <MenuItem name={menu.name} link={menu.link} icon={menu.icon} />;
      })}
    </MenuListWrapper>
  );
};

const MenuListWrapper = styled.div`
  position: fixed;
  padding: 10px;
  width: 45vw;
  top: 0px;
  right: 0;
  height: 100%;
  font-size: 16px;
  background-color: #f5f5f7;
  box-shadow: 0px 0px 20px 0px #000000;
`;

const HeaderColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MenuItem = ({ link, name, icon }) => {
  const history = useHistory();
  const onClick = () => {
    history.push(link);
  };

  return (
    <MenuItemWrapper onClick={onClick}>
      <div className="icon">{icon}</div>
      <div className="name">{name}</div>
    </MenuItemWrapper>
  );
};

const MenuItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid white;
  padding: 10px 10px;
  font-weight: 400;

  div {
    &.icon {
      flex: 1;
    }
    &.name {
      flex: 3;
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
