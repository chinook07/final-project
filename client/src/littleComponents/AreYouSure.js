// This component gives the user a chance at redeption before opening up the fences of a habitat and causing some damage.

import { useContext } from "react";
import styled from "styled-components";

import {AiOutlineWarning} from "react-icons/ai"
import { DinoContext } from "../barebones/DinoContext";

const AreYouSure = ({ exhibitId, species, closeForm }) => {

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
            <Warning>
                <AiOutlineWarning size={100}/>
                <p>Are you sure you want to shut off the habitat perimeter fence of the {species.toLowerCase()}? If done so, loss of like may occur.</p>
            </Warning>
            
            <Actions>
                <button onClick={closeForm}>cancel</button>
                <button onClick={disablePeri}>confirm</button>
            </Actions>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: var(--c-red);
    border: 4px dashed var(--c-yellow);
    border-radius: 15px;
    left: 50%;
    padding: 20px;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    
    div {
        display: flex;
        
    }
`

const Warning = styled.div`
    align-items: center;
    svg {
        margin-right: 15px;
    }
    p {
        font-weight: 500;
        text-align: center;
    }
`

const Actions = styled.div`
    
    justify-content: space-evenly;
    margin-top: 8px;
    button {
        cursor: pointer;
        padding: 10px;
        text-transform: uppercase;
    }
`

export default AreYouSure;