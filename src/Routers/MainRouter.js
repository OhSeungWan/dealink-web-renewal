import { Route, Router, Switch } from 'react-router-dom';

import ProductEnrollment from 'Pages/ProductEnrollment';
import SignIn from 'Pages/SignIn';

const MainRouter = () => {
  return (
    <>
      <Switch>
        <Route exact path="/SignIn" component={SignIn}></Route>
        <Route exact path="/" component={SignIn}></Route>
        <Route
          exact
          path="/ProductEnrollment"
          component={ProductEnrollment}
        ></Route>
      </Switch>
    </>
  );
};

export default MainRouter;
