import {Redirect, Route} from "react-router-dom";
import React from "react";

function Private({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/Login', state: {from: props.location}}}/>}
    />
  )
}

export default Private;