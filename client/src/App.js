import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./barebones/GlobalStyles";

import Header from "./sideComponents/Header"
import Nav from "./sideComponents/Nav"
import Footer from "./sideComponents/Footer"

import Home from "./mainComponents/Home";
import Population from "./mainComponents/Population";
import Logs from "./mainComponents/Logs";
import Visitors from "./mainComponents/Visitors";
import Exhibit from "./mainComponents/Exhibit";
import Error from "./mainComponents/Error"

function App() {
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
                    <Route exact path="/visitors">
                        <Visitors />
                    </Route>
                    <Route path="/exhibit/:id">
                        <Exhibit />
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

const Wrapper = styled.div`
    min-height: calc(100vh - 180px);
`

export default App;