import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkLoadNotebooks } from "../../store/notebooks";
import { thunkLoadNotebookNotes } from '../../store/notes';
import NotebookForm from '../CreateForms/NotebookForm';
import TextNotebook from './TextNotebook';
import "./UserNotebooks.css"
import { ColorContext } from '../../context/ColorContext';

const UserNotebooks = () => {
    const dispatch = useDispatch();
    const notebooks = useSelector(state => state.notebooks?.userTextNotebooks);
    const [notebookAdded, setNotebookAdded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [isDeleted, setIsDeleted] = useState(false);
    const { bgColor, changeBgColor } = useContext(ColorContext);

    useEffect(() => {
        dispatch(thunkLoadNotebooks());
        if (activeTab !== 0) dispatch(thunkLoadNotebookNotes(activeTab))
        setIsDeleted(false)
        setNotebookAdded(false)
    }, [dispatch, notebookAdded, activeTab, isEditing, isDeleted]);
    const colors = ['#F7931E', '#FF5733', '#C70039', '#87CEEB', '#FF69B4', '#FF007F', '#FFC300', '#00FFFF', '#E6E6FA', '#32CD32', '#900C3F', '#2E8B57', '#36454F', '#FFC0CB', '#DC143C', '#EEE8AA', '#DAA520', '#40E0D0', '#00A86B', '#008080', '#581845', '#006266', '#009432', '#1B1464', '#833471', '#BB2B1F', '#ED4C67', '#0066CC', '#27AE60', '#E67E22', '#D35400', '#8E44AD', '#2C3E50', '#34495E', '#7F8C8D'];

    return (
        <div className="notebooks-component-container">
            <div className="side-panel-container" style={{ backgroundColor: bgColor }}>
                <div className="tabs-container">
                    <div className="add-notebook-container notebook-tab" style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}>
                        <NotebookForm setNotebookAdded={setNotebookAdded} notebookId={0} />
                    </div>
                    {Object.values(notebooks).map((notebook, index) => {
                        const color = colors[index % colors.length];
                        return (
                            <div
                                key={notebook.id}
                                className={activeTab === notebook.id ? 'notebook-tab active-tab' : 'notebook-tab'}
                                onClick={() => {
                                    setActiveTab(notebook.id)
                                    setIsEditing(false)
                                }}
                                style={{ backgroundColor: color }}
                            >
                                <h4>{notebook.name}</h4>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="tab-content">
                <TextNotebook notebook={notebooks[activeTab]} tabState={{ activeTab, setActiveTab }} setNotebookAdded={setNotebookAdded} deletedState={{ isDeleted, setIsDeleted }} editState={{ isEditing, setIsEditing }} />
            </div>
        </div>
    );
};

export default UserNotebooks;
