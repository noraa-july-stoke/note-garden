import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkLoadNotebooks } from "../../store/notebooks";
import NotebookForm from '../CreateForms/NotebookForm';
// import CustomComponent from '../CustomComponent';

const UserNotebooks = () => {
    const dispatch = useDispatch();

    const notebooks = useSelector(state => state.notebooks?.userTextNotebooks);
    const notebookContent = Object.values(notebooks).map(notebook => (
        <div key={notebook.id} onClick={() => setActiveTab(notebook.id)}>
            {notebook.name}
        </div>
    ));
    const [notebookAdded, setNotebookAdded] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        dispatch(thunkLoadNotebooks());
    }, [dispatch, notebookAdded]);

    const renderCustomComponent = (notebookId) => {
        // return the custom component based on the clicked notebook
        // return <CustomComponent notebookId={notebookId} />;
        return (<div>Hello from {notebookId}</div>)
    };

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
                {Object.values(notebooks).map(notebook => (
                    <div key={notebook.id} style={{ display: activeTab === notebook.id ? 'block' : 'none' }}>
                        {renderCustomComponent(notebook.id)}
                    </div>
                ))}
            </div>
            <NotebookForm setNotebookAdded={setNotebookAdded} />
        </div>
    );
};

export default UserNotebooks;
