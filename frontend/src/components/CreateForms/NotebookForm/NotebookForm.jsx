import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAddTextNotebook, thunkLoadNotebooks } from "../../../store/notebooks";

//add errors in here
const NotebookForm = ({setNotebookAdded, notebook, editState}) => {

    const [name, setName] = useState(notebook?.id ? notebook?.name : "");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newNotebook = {
            name
        };
        if (notebook?.id) {
            let {isEditing, setIsEditing} = editState
            dispatch(thunkAddTextNotebook(newNotebook, notebook?.id))
            setIsEditing(false);
        }
        else { dispatch(thunkAddTextNotebook(newNotebook, false))};
        dispatch(thunkLoadNotebooks())
        reset();
        setNotebookAdded(true);
    };

    const reset = () => {
        setName("");
    };

    return (
        <div className="input-box">
           {/* { !notebook?.name ? <h1>Create Notebook</h1> : null} */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Title"
                    name="title"
                />
                {/* <button type="submit">Submit</button> */}
            </form>
        </div>
    );
};

export default NotebookForm;
