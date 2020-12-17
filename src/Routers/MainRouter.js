import { Route, Router, Switch } from 'react-router-dom';

import SignIn from 'Pages/SignIn';

const MainRouter = () => {
  return (
    <>
      <Switch>
        <Route exact path="/SignIn" component={SignIn}></Route>
        <Route exact path="/" component={SignIn}></Route>
      </Switch>
    </>
  );
};

export default MainRouter;
