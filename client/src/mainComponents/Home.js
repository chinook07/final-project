import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { keyframes } from "styled-components";

import { DinoContext } from "../DinoContext";
import { MdTour } from "react-icons/md";
import { BiNoEntry } from "react-icons/bi";
import { ImCompass } from "react-icons/im";
import Vitals from "../littleComponents/Vitals";

const blink = keyframes`
    from {opacity: 1};
    49% {opacity: 1};
    50% {opacity: 0};
    to {opacity: 0};
`

let borderColour;

const Home = () => {

    const { assets } = useContext(DinoContext);
    const [weather, setWeather] = useState({});

    const history = useHistory();
    const linkToHab = (id) => history.push(`/exhibit/${id}`)

    let dangerStatus = false;

    assets.map(item => {
        if (item.fenceActive === false) dangerStatus = true;
    })

    borderColour = "--c-blue";

    const getWeather = (key) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=9.54&lon=-85.11&appid=${key}&units=metric`)
            .then(res => res.json())
            .then(data => setWeather(data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetch("/api/get-key")
            .then(res => res.json())
            .then(data => getWeather(data.key))
            .catch(err => console.log(err))
    }, [])



    return (
        <>
            <Vitals />
            <main>
                {
                    weather.weather &&
                        <Weather>
                            <div>{weather.weather[0].description}</div>
                            <div>{parseInt(weather.main.temp)}°C</div>
                            <Arrow angle={weather.wind.deg} />
                            <div>{(3.6 * weather.wind.speed).toFixed()} km/h</div>
                        </Weather>
                }
                {/* {
                    dangerStatus &&
                    <audio autoplay>
                        <source src="./alert.mp3" type="audio/mpeg"></source>
                    </audio>
                } */}
                
                <h1>Systems Dashboard</h1>

                <ParkMap borderColour={
                    assets.map(item => {
                        if (item.fenceActive === false) borderColour = "--c-red";
                    })
                }>
                    <img alt="map of the park" src="./images/map.jpg" />
                    <Hab1 onClick={() => linkToHab(1)}>
                        {
                            assets[0].currentlyOpenToVisitors
                                ? <Smile size={40} />
                                : <Frown size={40} />
                        }
                        {
                            assets[0].fenceActive === false &&
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
                            assets[1].fenceActive === false &&
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
                            assets[2].fenceActive === false &&
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
                            assets[3].fenceActive === false &&
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
                            assets[4].fenceActive === false &&
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
                            assets[5].fenceActive === false &&
                                <Breached>fence open</Breached>
                        }
                    </Hab6>
                </ParkMap>
            </main>
        </>
    )
}

const Weather = styled.div`
    background-color: var(--c-gray);
    display: flex;
    justify-content: flex-end;
    text-align: right;
    div:first-child {
        text-transform: capitalize;
    }
    > * {
        margin-left: 15px;
    }
`

const Arrow = styled(ImCompass)`
    transform: rotate(${props => props.angle - 45}deg);
`

const ParkMap = styled.div`
    border: 6px solid var(${props => props.borderColour});
    /* border-color: ${borderColour};
    border-style: solid;
    border-width: 2px; */
    padding: 0;
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