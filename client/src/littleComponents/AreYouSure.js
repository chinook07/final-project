// This component gives the user a chance at redeption before opening up the fences of a habitat and causing some damage.

import { useContext } from "react";
import styled from "styled-components";

import { DinoContext } from "../DinoContext";

const AreYouSure = ({ exhibitId, closeForm }) => {

    // Get the context.

    const { update, setUpdate } = useContext(DinoContext);

    // Handle the disable of the fence.
    
    const disablePeri = () => {
        fetch(`/api/toggle-fence/${exhibitId}`, {
            method: "PATCH",
        })
            .then(res => res.json())
            .then(() => {
                setUpdate(update + 1);
                closeForm();
            })
    }

    return (
        <Wrapper>
            <p>Are you sure you want to shut off the habitat perimeter fence? If done so, loss of like may occur.</p>
            <div>
                <button onClick={closeForm}>cancel</button>
                <button onClick={disablePeri}>confirm</button>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: var(--c-red);
    border: 4px dashed var(--c-yellow);
    border-radius: 15px;
    left: 50%;
    padding: 10px;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    p {
        font-weight: 500;
        text-align: center;
    }
    div {
        display: flex;
        justify-content: space-evenly;
        margin-top: 8px;
        button {
            cursor: pointer;
            padding: 10px;
            text-transform: uppercase;
        }
    }
`

export default AreYouSure;