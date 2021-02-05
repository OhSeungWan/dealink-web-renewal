import { Container, ScreenWrapper } from 'Components/Atoms';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import GuestSignIn from 'system/User/GuestSignIn';
import Home from 'Pages/Home';
import { Loading } from 'Components/Organisms/Modal';
import Main from 'Pages/Main';
import MyLink from 'Pages/MyLink';
import ProductDetail from 'Pages/ProductDetail';
import SignIn from 'Pages/SignIn';
import Terms from 'Pages/Terms';
import { fetchUser } from 'Store/Slice/userSlice';
import { useEffect } from 'react';

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
const MainRouter = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.user.isLogin);
  const status = useSelector(state => state.user.status);
  const userType = useSelector(state => state.user.type);

  useEffect(() => {
    if (userType !== 'GUEST') {
      dispatch(fetchUser(getCookie('accessToken')));
    }
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/Main" component={Main}></Route>
      <Route exact path="/Survey" component={Main}></Route>
      <Route exact path="/SignIn" component={SignIn}></Route>
      <Route
        path="/Product/:type/:userIndex/:url"
        component={ProductDetail}
      ></Route>
      <Route path="/SignIn/:code" component={SignIn}></Route>
      <Route path="/Terms" component={Terms}></Route>
      <Route path="/guestSignIn" component={GuestSignIn}></Route>

      <PrivateRoute path="/MyLink" isLogin={isLogin} status={status}>
        <MyLink />
      </PrivateRoute>
    </Switch>
  );
};

export const PrivateRoute = ({ children, isLogin, status, ...rest }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(getCookie('accessToken')));
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
