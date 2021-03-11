import { Container, ScreenWrapper } from 'Components/Atoms';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AuctionDetail from 'Pages/ProductDetail';
import ChatList from 'Pages/Chat/ChatList';
import ChatOne from 'Pages/Chat/ChatOne';
import GuestSignIn from 'system/User/GuestSignIn';
import Home from 'Pages/Home';
import { Loading } from 'Components/Organisms/Modal';
import Main from 'Pages/Main';
import MyLink from 'Pages/MyLink';
import Profile from 'Pages/Profile';
import SignIn from 'Pages/SignIn';
import Terms from 'Pages/Terms';
import WebSocketContext from 'lib/Context/WebSocket';
import { fetchUser } from 'Store/Slice/userSlice';
import { getCookie } from 'lib/Cookies';
import { useContext } from 'react';
import { useEffect } from 'react';

const MainRouter = () => {
  const { ws, openSocket } = useContext(WebSocketContext);

  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.user.isLogin);
  const status = useSelector(state => state.user.status);
  const userId = useSelector(state => state.user.id);

  const userType = useSelector(state => state.user.type);

  useEffect(() => {
    if (userType !== 'GUEST') {
      dispatch(fetchUser(getCookie('accessToken')));
    }
  }, []);

  useEffect(() => {
    // alert('router');
    // alert(sessionStorage.getItem('userId'));
    if (userId && userId != null && userId != 'undefined') {
      openSocket(sessionStorage.getItem('userId'));
    }
  }, [userId]);

  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/Main" component={Main}></Route>
      <Route exact path="/Survey" component={Main}></Route>
      <Route exact path="/SignIn" component={SignIn}></Route>
      <Route
        exact
        path="/detail/:type/:userIndex/:url"
        component={AuctionDetail}
      ></Route>

      <Route
        path="/Product/:type/:userIndex/:url"
        component={AuctionDetail}
      ></Route>
      <Route path="/SignIn/:code" component={SignIn}></Route>
      <Route path="/Terms" component={Terms}></Route>
      <Route path="/guestSignIn" component={GuestSignIn}></Route>
      <PrivateRoute path="/chatlist" isLogin={isLogin} status={status}>
        <ChatList />
      </PrivateRoute>
      <PrivateRoute
        path="/chat/:roomId/:auctionId/:userId/:reciverId"
        isLogin={isLogin}
        status={status}
      >
        <ChatOne />
      </PrivateRoute>
      <PrivateRoute
        path="/chat/:roomId/:reciverId"
        isLogin={isLogin}
        status={status}
      >
        <ChatOne />
      </PrivateRoute>
      <PrivateRoute path="/MyLink" isLogin={isLogin} status={status}>
        <MyLink />
      </PrivateRoute>
      <Route path="/profile/:userId">
        <Profile></Profile>
      </Route>
    </Switch>
  );
};

export const PrivateRoute = ({ children, isLogin, status, ...rest }) => {
  const dispatch = useDispatch();
  const userType = useSelector(state => state.user.type);
  useEffect(() => {
    if (userType !== 'GUEST') {
      dispatch(fetchUser(getCookie('accessToken')));
    }
  }, []);
  return status === 'idle' ? (
    <Route
      {...rest}
      render={({ location }) =>
        isLogin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/SignIn',
              state: { from: location }
            }}
          />
        )
      }
    />
  ) : (
    <ScreenWrapper>
      <Container>
        <Loading isOpen={true}></Loading>
      </Container>
    </ScreenWrapper>
  );
};

export const PrivateContents = ({ children, location, ...rest }) => {
  const isLogin = useSelector(state => state.user.isLogin);
  const status = useSelector(state => state.user.status);
  localStorage.setItem('location', location);
  return status === 'idle' ? (
    <Route
      {...rest}
      render={({ location }) =>
        isLogin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/SignIn',
              state: { from: location }
            }}
          />
        )
      }
    />
  ) : (
    <ScreenWrapper>
      <Container>
        <Loading isOpen={true}></Loading>
      </Container>
    </ScreenWrapper>
  );
};

export default MainRouter;
