import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Spinner from "../littleComponents/Spinner";

import { ImCompass } from "react-icons/im";
import Vitals from "../littleComponents/Vitals";
import ParkMap from "../littleComponents/ParkMap";
import { DinoContext } from "../DinoContext";


const Home = () => {

    const { ready } = useContext(DinoContext);

    const [weather, setWeather] = useState({});

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

    if (!ready) {
        return <Spinner/>
    }

    return (
        <>
            <Vitals />
            <main>
                <h1>Systems Dashboard</h1>
                {
                    weather.weather &&
                        <Weather>
                            <div>Isla Nublar: {weather.weather[0].description}</div>
                            <div>{parseInt(weather.main.temp)}°C</div>
                            <Arrow angle={weather.wind.deg} />
                            <div>{(3.6 * weather.wind.speed).toFixed()} km/h</div>
                        </Weather>
                }

                <ParkMap/>
            </main>
        </>
    )
}

const Weather = styled.div`
    background-color: var(--c-gray);
    display: flex;
    justify-content: flex-end;
    text-align: right;
    > * {
        margin-left: 15px;
    }
`

const Arrow = styled(ImCompass)`
    transform: rotate(${props => props.angle - 45}deg);
`

export default Home;