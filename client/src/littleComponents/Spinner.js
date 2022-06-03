import { GiDinosaurRex } from "react-icons/gi";
import { keyframes } from "styled-components";
import styled from "styled-components";

const spinAllTheWay = keyframes`
    from {transform: translate(0)};
    to {transform: translateX(500px)};
`

const Spinner = () => {
    return (
        <DinoSpin />
    )
}

const DinoSpin = styled(GiDinosaurRex)`
    animation: ${spinAllTheWay} 1s linear infinite;
    font-size: 80px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
`

export default Spinner;