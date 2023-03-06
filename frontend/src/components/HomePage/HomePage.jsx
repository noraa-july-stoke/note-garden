import { useEffect } from "react";
import {useHistory} from "react-router-dom";
import ASCIIText from '../ASCII/ASCIIText';
import AuthForms from "../Forms/AuthForms/AuthForms";
import './HomePage.css';
//Import authforms

const HomePage = ({ sessionUser, bgColor }) => {
    const history = useHistory();
    const notebookClick = e => {
        e.preventDefault();
        history.push('/notebooks');
    }

    const newNoteClick = e => {
        e.preventDefault()
        history.push('/new-note');
    }

    return (
        <div className="home-body-container">
            {!sessionUser && <AuthForms />}
            {sessionUser &&
                <div className="buttons-container">
                    <button style={{backgroundColor: bgColor}} className="home-nav-button" onClick={notebookClick}>Go To Notebooks</button>
                    <button style={{ backgroundColor: bgColor }} className="home-nav-button" onClick={newNoteClick}>Create New Note</button>
                </div>

            }
            <ASCIIText />
        </div>
    )
}
export default HomePage;
