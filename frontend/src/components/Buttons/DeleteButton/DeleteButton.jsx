
import { deleteReducer } from "./button-helpers";
import "./DeleteButton.css";

const DeleteButton = ({type, setIsDeleted, id}) => {
    const onClick = deleteReducer(type, id, setIsDeleted)
    console.log(onClick)
    return <button onClick={onClick}></button>
}

export default DeleteButton;
