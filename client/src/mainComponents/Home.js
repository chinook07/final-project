import styled from "styled-components";
import Login from "../littleComponents/Login"

const Home = () => {

    if (true) {
        return (
            <Wrapper>
                <Login />
            </Wrapper>
        )
    } else {
        return (
            <h1>Actual home page</h1>
        )
    }
    
}

const Wrapper = styled.div`
    background: url("/images/gates.jpg") center;
    height: 100%;
    position: relative;
`

export default Home;