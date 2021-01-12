import { Button, Container, ScreenWrapper, Text } from 'Components/Atoms';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Loading } from 'Components/Organisms/Modal';
import MyLink from 'Pages/MyLink';
import ProductDetail from 'Pages/ProductDetail';
import ProductEnrollment from 'Pages/ProductEnrollment';
import SignIn from 'Pages/SignIn';
import Splash from 'Pages/Splash';
import { useAuth } from 'Hooks/useAuth';

const MainRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Splash}></Route>
      <Route exact path="/SignIn" component={SignIn}></Route>
      <Route
        path="/Product/:type/:userIndex/:url"
        component={ProductDetail}
      ></Route>
      <PrivateRoute path="/ProductEnrollment">
        <ProductEnrollment />
      </PrivateRoute>
      <PrivateRoute path="/MyLink">
        <MyLink />
      </PrivateRoute>
    </Switch>
  );
};

export const PrivateRoute = ({ children, ...rest }) => {
  const [isAuth, { complete }] = useAuth();
  console.log('privateRouter');
  console.log(isAuth);
  return !complete ? (
    <Route
      {...rest}
      render={() =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/SignIn'
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

export const PrivateContents = ({ children, ...rest }) => {
  const [isAuth, { complete }] = useAuth();
  return !complete ? (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
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
