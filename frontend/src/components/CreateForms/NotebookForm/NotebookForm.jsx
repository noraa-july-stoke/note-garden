import { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { thunkAddTextNotebook, thunkLoadNotebooks } from "../../../store/notebooks";


//add errors in here
const NotebookForm = ({setNotebookAdded}) => {
    const [name, setName] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newNote = {
            name
        };
        dispatch(thunkAddTextNotebook(newNote));
        dispatch(thunkLoadNotebooks())
        reset();
        setNotebookAdded(true);
    };

    const reset = () => {
        setName("");
    };

    return (
        <div className="input-box">
            <h1>Create Notebook</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Title"
                    name="title"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default NotebookForm;
