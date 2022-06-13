// Probably the highlight of my project, the loading screen shows a helicopter chasing after a dinosaur chasing after a running person!

import { FaRunning } from "react-icons/fa"
import { GiDinosaurRex, GiHelicopter } from "react-icons/gi";
import { keyframes } from "styled-components";
import styled from "styled-components";

const runDinoRun = keyframes`
    0% {transform: translate(0)};
    10% {transform: translate(50px, 20px)};
    25% {transform: translate(125px, -30px)};
    50% {transform: translate(250px, 20px)};
    75% {transform: translate(375px, 90px)};
    90% {transform: translate(450px, -50px)};
    100% {transform: translate(500px, 0)};
`

const rotatingHeli = keyframes`
    0% {transform: rotate(0)};
    10% {transform: rotate(10deg)};
    25% {transform: rotate(-30deg)};
    50% {transform: rotate(40deg)};
    75% {transform: rotate(-30deg)};
    90% {transform: rotate(10deg)};
    100% {transform: rotate(0)};
`

const Spinner = () => {
    return (
        <DinoSpin>
            <CrazyHeli />
            <span>   </span>
            <GiDinosaurRex />
            <FaRunning />
        </DinoSpin>
    )
}

const DinoSpin = styled.div`
    animation: ${runDinoRun} 1s linear infinite;
    font-size: 120px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
`

const CrazyHeli = styled(GiHelicopter)`
    animation: ${rotatingHeli} 1s linear infinite;
`

export default Spinner;