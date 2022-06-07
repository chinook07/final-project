import { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { keyframes } from "styled-components";
import Login from "../littleComponents/Login"

import { DinoContext } from "../DinoContext";
import { MdTour } from "react-icons/md";
import { BiNoEntry } from "react-icons/bi";

const blink = keyframes`
    from {opacity: 1};
    49% {opacity: 1};
    50% {opacity: 0};
    to {opacity: 0};
`

const Home = () => {

    const { user, setUser, assets, update, setUpdate } = useContext(DinoContext);

    const history = useHistory();
    const linkToHab = (id) => history.push(`/exhibit/${id}`)

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
                    <li>Map Legend</li>
                </ul>
                <ParkMap>
                    <img alt="map of the park" src="./images/map.jpg" />
                    <Hab1 onClick={() => linkToHab(1)}>
                        {
                            assets[0].currentlyOpenToVisitors
                                ? <Smile size={40} />
                                : <Frown size={40} />
                        }
                        {
                            assets[0].fenceActive == false &&
                                <Breached>fence open</Breached>
                        }
                    </Hab1>
                    <Hab2 onClick={() => linkToHab(2)}>
                        {
                            assets[1].currentlyOpenToVisitors
                                ? <Smile size={40} />
                                : <Frown size={40} />
                        }
                        {
                            assets[1].fenceActive == false &&
                                <Breached>fence open</Breached>
                        }
                    </Hab2>
                    <Hab3 onClick={() => linkToHab(3)}>
                        {
                            assets[2].currentlyOpenToVisitors
                                ? <Smile size={40} />
                                : <Frown size={40} />
                        }
                        {
                            assets[2].fenceActive == false &&
                                <Breached>fence open</Breached>
                        }
                    </Hab3>
                    <Hab4 onClick={() => linkToHab(4)}>
                        {
                            assets[3].currentlyOpenToVisitors
                                ? <Smile size={40} />
                                : <Frown size={40} />
                        }
                        {
                            assets[3].fenceActive == false &&
                                <Breached>fence open</Breached>
                        }
                    </Hab4>
                    <Hab5 onClick={() => linkToHab(5)}>
                        {
                            assets[4].currentlyOpenToVisitors
                                ? <Smile size={40} />
                                : <Frown size={40} />
                        }
                        {
                            assets[4].fenceActive == false &&
                                <Breached>fence open</Breached>
                        }
                    </Hab5>
                    <Hab6 onClick={() => linkToHab(6)}>
                        {
                            assets[5].currentlyOpenToVisitors
                                ? <Smile size={40} />
                                : <Frown size={40} />
                        }
                        {
                            assets[5].fenceActive == false &&
                                <Breached>fence open</Breached>
                        }
                    </Hab6>
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
    img {
        opacity: 0.5;
        width: 100%;
    }
    > div {
        display: flex;
        flex-direction: column;
        position: absolute;
    }
`

const Hab1 = styled.div`
    left: 75%;
    top: 31%;
`

const Hab2 = styled.div`
    left: 79%;
    top: 28%;
`

const Hab3 = styled.div`
    left: 70%;
    top: 13%;
`

const Hab4 = styled.div`
    left: 55%;
    top: 35%;
`

const Hab5 = styled.div`
    left: 58%;
    top: 20%;
`

const Hab6 = styled.div`
    left: 45%;
    top: 15%;
`

const Smile = styled(MdTour)`
    cursor: pointer;
`

const Frown = styled(BiNoEntry)`
    cursor: pointer;
`

const Breached = styled.div`
    animation: ${blink} 1500ms linear infinite;
    background-color: #f008;
    color: var(--c-yellow);
    cursor: pointer;
    font-size: 25px;
    opacity: 1;
    padding: 5px;
    text-transform: uppercase;
`

export default Home;