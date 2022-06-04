import styled from "styled-components";

const Header = () => {


    return (
        <Wrapper>
            <h1>Jurassic Park Management</h1>
            <div>Logged in as username</div>
        </Wrapper>
    )
}

const Wrapper = styled.header`
    align-items: center;
    background-color: var(--c-gray);
    color: var(--c-light);
    display: flex;
    height: 60px;
    justify-content: space-between;
    padding: 0 15px;
    h1 {
        font-size: large;
    }
`

export default Header;