import styled from "styled-components";
import { format } from 'date-fns';

const Footer = () => {

    const year = format(new Date(), 'y');

    return (
        <Wrapper>
            <p>Copyright Ingen 1993-{year}</p>
            <p>Other info</p>
        </Wrapper>
    )
}

const Wrapper = styled.footer`
    align-items: center;
    background-color: var(--colour-blue);
    color: var(--colour-yellow);
    display: flex;
    height: 60px;
    justify-content: space-between;
    padding: 0 15px;
`

export default Footer;