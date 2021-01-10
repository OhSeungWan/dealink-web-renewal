import { Redirect, Route, Switch } from 'react-router-dom';

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
      <Route path="/ProductEnrollment">
        <ProductEnrollment />
      </Route>
      <PrivateRoute path="/MyLink">
        <MyLink />
      </PrivateRoute>
    </Switch>
  );
};

const PrivateRoute = ({ children, ...rest }) => {
  const [isAuth] = useAuth();
  console.log('privateRouter');
  return (
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
  );
};

export default MainRouter;
