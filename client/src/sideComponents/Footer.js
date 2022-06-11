import { Link } from "react-router-dom"
import styled from "styled-components";
import { format } from 'date-fns';

const Footer = () => {

    const year = format(new Date(), 'y');

    return (
        <Wrapper>
            <p>Copyright Ingen 1993-{year}</p>
            <Link to="/moreinfo">Other info</Link>
        </Wrapper>
    )
}

const Wrapper = styled.footer`
    align-items: center;
    background-color: var(--c-blue);
    display: flex;
    height: 60px;
    justify-content: space-between;
    padding: 0 15px;
    > * {
        color: var(--c-yellow);
    }
`

export default Footer;