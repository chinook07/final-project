import styled from "styled-components";
import Login from "../littleComponents/Login"

const Home = () => {

    if (true) {
        return (
            <Wrapper2>
                <Login />
            </Wrapper2>
        )
    } else {
        return (
            <h1>Actual home page</h1>
        )
    }
    
}

const Wrapper2 = styled.div`
    background: url("/images/gates.jpg") center;
    min-height: calc(100vh - 180px);
    position: relative;
`

export default Home;