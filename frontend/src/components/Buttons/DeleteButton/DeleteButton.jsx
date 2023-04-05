import { DeleteReducer } from "../../ComponentHelpers/button-helpers";
import "./DeleteButton.css";
//reusable delete button for deleting anything out of my database
const DeleteButton = ({ type, className, toDelete }) => {
  const { onClick, deleteText } = DeleteReducer(type, toDelete);
  return (
    <button className={className} type="button" onClick={onClick}>
      {deleteText}
    </button>
  );
};

export default DeleteButton;
