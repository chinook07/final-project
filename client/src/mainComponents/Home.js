import { useContext } from "react";
import styled from "styled-components";
import Login from "../littleComponents/Login"

import { DinoContext } from "../DinoContext";

const Home = () => {

    const { user, setUser, update, setUpdate } = useContext(DinoContext);

    if (user === null) {
        return (
            <Wrapper2>
                <Login />
            </Wrapper2>
        )
    } else {
        return (
            <main>
                <h1>Jurassic Park Dashboard</h1>
                <ul>
                    <li>Weather</li>
                    <li>Map</li>
                </ul>
                <ParkMap>
                    <img alt="map of the park" src="./images/map.jpg" />
                </ParkMap>
            </main>
        )
    }
    
}

const Wrapper2 = styled.div`
    background: url("/images/gates.jpg") center;
    min-height: calc(100vh - 180px);
    position: relative;
`

const ParkMap = styled.div`
    position: relative;
`

export default Home;