import { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";

import { DinoContext } from "./DinoContext";

import Header from "../sideComponents/Header"
import Nav from "../sideComponents/Nav"
import Footer from "../sideComponents/Footer"

import Login from "../littleComponents/Login";
import Home from "../mainComponents/Home";
import Population from "../mainComponents/Population";
import Logs from "../mainComponents/Logs";
import Exhibit from "../mainComponents/Exhibit";
import Visitors from "../mainComponents/Visitors";
import Employees from "../mainComponents/Employees";
import MoreInfo from "../mainComponents/MoreInfo";
import Error from "../mainComponents/Error";

const App = () => {

    // Is there someone logged in? This is important to get from context.

    const { user } = useContext(DinoContext);

    // If there isn't, your choices are quite limited.

    if (user === null) {
        return (
            <BrowserRouter>
                <GlobalStyles />
                <Header />
                <Wrapper>
                    <Switch>
                        <Route exact path="/moreinfo">
                            <MoreInfo />
                        </Route>
                        <Route path="*">
                            <Login />
                        </Route>
                    </Switch>
                </Wrapper>
                <Footer />
            </BrowserRouter>
            
        )
    } else {

        // Else, you have access to everything. Notice only admin users have access to the employees page.
        
        return (
            <BrowserRouter>
                <GlobalStyles />
                <Header />
                <Nav />
                <Wrapper>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/population">
                            <Population />
                        </Route>
                        <Route exact path="/logs">
                            <Logs />
                        </Route>
                        <Route path="/exhibit/:id">
                            <Exhibit />
                        </Route>
                        <Route exact path="/visitors">
                            <Visitors />
                        </Route>
                        {
                            user.admin &&
                            <Route exact path="/employees">
                                <Employees />
                            </Route>
                        }
                        <Route exact path="/moreinfo">
                            <MoreInfo />
                        </Route>
                        <Route path="*">
                            <Error />
                        </Route>
                    </Switch>
                </Wrapper>
                <Footer />
            </BrowserRouter>
        );
    }
}

const Wrapper = styled.div`
    background-color: var(--c-dark);
    color: var(--c-light);
    min-height: calc(100vh - 180px);
`

export default App;