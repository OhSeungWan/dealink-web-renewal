import { Route, Router, Switch } from 'react-router-dom';

import MyLink from 'Pages/MyLink';
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
        <Route
          path="/Product/:type/:userIndex/:url"
          component={ProductDetail}
        ></Route>
        <Route exact path="/MyLink" component={MyLink}></Route>
      </Switch>
    </>
  );
};

export default MainRouter;
