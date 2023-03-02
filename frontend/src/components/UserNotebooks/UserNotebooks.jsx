import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkLoadNotebooks } from "../../store/notebooks";
import { thunkLoadNotebookNotes } from '../../store/notes';
import NotebookForm from '../CreateForms/NotebookForm';
import TextNotebook from './TextNotebook';
import "./UserNotebooks.css"

const UserNotebooks = () => {
    const dispatch = useDispatch();

    const notebooks = useSelector(state => state.notebooks?.userTextNotebooks);
    const [notebookAdded, setNotebookAdded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        dispatch(thunkLoadNotebooks());
        dispatch(thunkLoadNotebookNotes(activeTab))
    }, [dispatch, notebookAdded, activeTab, isEditing]);

    return (
        <div className="notebooks-container">
            <div className="tabs">
                {Object.values(notebooks).map(notebook => (
                    <div
                        key={notebook.id}
                        className={activeTab === notebook.id ? 'active' : ''}
                        onClick={() => setActiveTab(notebook.id)}
                    >
                        {notebook.name}
                    </div>
                ))}
            </div>
            <div className="tab-content">
                <TextNotebook notebook={notebooks[activeTab]} setNotebookAdded={setNotebookAdded} editState={{isEditing, setIsEditing}}/>
            </div>
            <NotebookForm setNotebookAdded={setNotebookAdded} notebookId={0} />
        </div>
    );
};

export default UserNotebooks;
