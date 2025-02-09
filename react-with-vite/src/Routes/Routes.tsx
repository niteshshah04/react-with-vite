import { HashRouter as BrowserRouter, Route, Switch } from 'react-router-dom';
import DashboardView from '../Dashboard/DashboardView';

export { BrowserRouter };

export const Routes = () => {
  return (
    <Switch>
      {/* <HomeRoute path="/" key="home" exact={true} /> */}
      <Route exact={true} path="/dashboard" key="dashboard" component={DashboardView} />
    </Switch>
  );
}