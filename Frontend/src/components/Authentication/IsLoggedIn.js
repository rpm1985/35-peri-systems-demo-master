import {Redirect, Route} from "react-router-dom";
import React from "react";

function IsLoggedIn({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to={{pathname: '/Dashboard', state: {from: props.location}}}/>}
    />
  )
}

export default IsLoggedIn;