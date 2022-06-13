import { Link } from "react-router-dom"
import styled from "styled-components";
import { format } from 'date-fns';

const Footer = () => {

    // Fetch the year to avoid paying someone to change the copyright notice on Dec. 31st at 23:59. There's a limit to "spare no expense".

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