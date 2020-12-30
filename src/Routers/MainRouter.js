import { Route, Router, Switch } from 'react-router-dom';

import ProductDetail from 'Pages/ProductDetail';
import ProductEnrollment from 'Pages/ProductEnrollment';
import SignIn from 'Pages/SignIn';

const MainRouter = () => {
  return (
    <>
      <Switch>
        <Route exact path="/SignIn" component={SignIn}></Route>
        <Route exact path="/" component={SignIn}></Route>
        <Route path="/ProductEnrollment" component={ProductEnrollment}></Route>
        <Route exact path="/ProductDetail" component={ProductDetail}></Route>
      </Switch>
    </>
  );
};

export default MainRouter;
