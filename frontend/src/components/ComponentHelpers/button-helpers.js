import { useDispatch } from "react-redux";
import { thunkDeleteComment } from "../../store/comments";
// reusable button content
export const DeleteReducer = (type, toDelete) => {
  const dispatch = useDispatch();
  switch (type) {
    case "COMMENT": {
      const onClick = async (e) => {
        e.preventDefault();
        dispatch(thunkDeleteComment(toDelete));
      };
      const deleteText = "X";
      return { onClick, deleteText };
    }
    default: // "null case";
      return { deleteText: null, onClick: () => {} }; // null case with "null function";
  }
};
