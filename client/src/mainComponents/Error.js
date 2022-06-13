// Just a 404 page. This will only work when logged in. Otherwise, the default go to is the login page.

import styled from "styled-components";

const Error = () => {
    return (
        <Wrapper>
            <Message>
                <h1>Error 404</h1>
                <p>Oopsie, a dinosaur snuck into the Visitor Center and wreaked havoc on our computer systems!*</p>
                <Disclaimer>*The scenario described on this page is 100% fictional. Jurassic Park has been voted Safest Workplace in Central America, every year since 2006. There have been no employee fatalities since 1996.</Disclaimer>
            </Message>
        </Wrapper>
    )
}

const Wrapper = styled.main`
    background-image: url("/images/trexError.jpg");
    background-position: center;
    background-size: cover;
    min-height: calc(100vh - 180px);
    position: relative;
`

const Message = styled.div`
    background-color: var(--c-red);
    border: 1px solid var(--c-yellow);
    border-radius: 5px;
    color: var(--c-light);
    left: 50%;
    padding: 30px;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
`

const Disclaimer = styled.div`
    font-size: x-small;
    margin-top: 15px;
`

export default Error;