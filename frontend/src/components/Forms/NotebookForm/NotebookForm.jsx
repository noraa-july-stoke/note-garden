import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  thunkAddTextNotebook,
  thunkLoadNotebooks,
} from "../../../store/notebooks";

//add errors in here
const NotebookForm = ({ notebook, notebooksController }) => {
  const { notebookFunctions, notebookDispatch } =
    notebooksController;
  const [name, setName] = useState(notebook?.id ? notebook?.name : "");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNotebook = {
      name,
    };
    if (notebook?.id) {
      await dispatch(thunkAddTextNotebook(newNotebook, notebook?.id));
      notebookDispatch(notebookFunctions.editing(false));
    } else {
      await dispatch(thunkAddTextNotebook(newNotebook, false));
      notebookDispatch(notebookFunctions.addNotebook());
    }
    dispatch(thunkLoadNotebooks());
    reset();
  };

  const reset = () => {
    setName("");
  };

  return (
    <div className="input-box">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder={
            notebook?.name ? "Name your notebook..." : "Add a notebook..."
          }
          name="title"
          className={
            notebook?.name ? "edit-notebook-form" : "add-notebook-form"
          }
        />
      </form>
    </div>
  );
};

export default NotebookForm;
