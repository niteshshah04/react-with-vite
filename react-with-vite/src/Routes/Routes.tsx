import { HashRouter as BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeRoute from "./HomeRoute";
import DashboardView from '../Dashboard/DashboardView';
import Login from '../Login/Login';

export { BrowserRouter };

export const Routes = () => {
  return (
    <Switch>
      <HomeRoute path="/" key="home" exact={true} />
      <Route exact={true} path="/dashboard" key="dashboard" component={DashboardView} />
    </Switch>
  );
}