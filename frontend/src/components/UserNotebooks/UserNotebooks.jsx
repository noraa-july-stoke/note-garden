import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkLoadNotebooks } from "../../store/notebooks";
import { thunkLoadNotebookNotes } from '../../store/notes';
import NotebookForm from '../CreateForms/NotebookForm';
import TextNotebook from './TextNotebook';
// import CustomComponent from '../CustomComponent';

const UserNotebooks = () => {
    const dispatch = useDispatch();

    const notebooks = useSelector(state => state.notebooks?.userTextNotebooks);
    const notes = useSelector(state => state.notes?.notebookNotes)

    const [notebookAdded, setNotebookAdded] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    // const [tabState, setTabState] = useState(notes)

    useEffect(() => {
        dispatch(thunkLoadNotebooks());
        dispatch(thunkLoadNotebookNotes(activeTab))
    }, [dispatch, notebookAdded, activeTab]);

    // might need this later?
    // const renderTextNotebook = tabState => {
    //     return (<TextNotebook tabState={tabState}/>)
    // };

    return (
        <div className="notebooks-container">
            <ul className="tabs">
                {Object.values(notebooks).map(notebook => (
                    <li
                        key={notebook.id}
                        className={activeTab === notebook.id ? 'active' : ''}
                        onClick={() => setActiveTab(notebook.id)}
                    >
                        {notebook.name}
                    </li>
                ))}
            </ul>
            <div className="tab-content">
                <TextNotebook notebookId={activeTab} />
            </div>
            <NotebookForm setNotebookAdded={setNotebookAdded} />
        </div>
    );
};

export default UserNotebooks;
