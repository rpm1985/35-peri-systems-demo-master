import React from "react";
import "./App.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import Login from "./components/Authentication/Login";
import Register from "./components/Admin/Register/Register";
import PeriNavbar from "./layout/PeriNavbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Private from "./components/Authentication/Private";
import AuthService from "./services/auth.service";
import IsLoggedIn from "./components/Authentication/IsLoggedIn";
import ProjectDetails from "./components/Project/ProjectDetails";
import Timeline from "./components/Events/Timeline";
import CustomerProjectView from "./components/Customer/CustomerProjectView";
import Report from "./components/Events/Report/Report";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
    brand: {
        primary: "#f1f1f1",
        secondary: "#dc0032",
        tertiary: "#ffc300",
        accents: "#554e44",
        background: "white",
        primaryText: "#3F3D56",
        pink: "#e5445f",
        grey: "rgba(85, 85, 85, 1)",

        // Hover states
        primaryHover: "#caddd2",
    },
    term: {
        open: "green",
        warning: "yellow",
        closed: "red",
    },
};

const theme = extendTheme({ colors });
const isAuthenticated = AuthService.isUserAuthenticated();
const isAdmin = AuthService.isAdmin();

function App() {
    return (
        <Router>
            <ChakraProvider theme={theme}>
                <PeriNavbar />
                <Switch>
                    <Route exact path="/">
                        {isAuthenticated ? (
                            <Redirect to="/Dashboard" />
                        ) : (
                            <Redirect to="/Login" />
                        )}
                    </Route>
                    <Route
                        exact
                        path="/customer/:param1"
                        render={(props) => <CustomerProjectView {...props} />}
                    />
                    <IsLoggedIn
                        exact
                        authed={isAuthenticated}
                        component={Login}
                        path="/Login"
                    />
                    <Private
                        exact
                        path="/project/:param1"
                        authed={isAuthenticated}
                        render={(props) => <ProjectDetails {...props} />}
                        component={ProjectDetails}
                    />
                    <Private
                        exact
                        authed={isAuthenticated}
                        component={Dashboard}
                        path="/Dashboard"
                    />
                    <Private
                        exact
                        authed={isAdmin}
                        component={Register}
                        path="/Register"
                    />
                    <Private
                        exact
                        authed={isAuthenticated}
                        component={ProjectDetails}
                        path="/ProjectDetails/:projectId"
                    />
                    <Private
                        exact
                        authed={isAuthenticated}
                        component={Timeline}
                        path="/Timeline/:projectId"
                    />
                    <Private
                        exact
                        authed={isAuthenticated}
                        render={(props) => <Report {...props} />}
                        component={Report}
                        path="/Report"
                    />
                </Switch>
            </ChakraProvider>
        </Router>
    );
}

export default App;
