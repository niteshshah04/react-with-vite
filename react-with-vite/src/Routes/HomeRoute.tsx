import { Redirect, Route, RouteProps } from "react-router-dom"; 

export default class HomeRoute extends Route<RouteProps> {
  reRoute() {
    return (
      <Redirect to={`/home`} />
    );
  }

  render(){
    return  this.reRoute();
  }
}