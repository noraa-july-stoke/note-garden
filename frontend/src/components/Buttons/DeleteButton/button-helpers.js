import {useDispatch} from 'react-redux';
import { thunkLoadNotebooks, thunkDeleteTextNotebook } from '../../../store/notebooks';

//I had to define this as a function component to make it work;
export const DeleteReducer = (type, setIsDeleted, id) => {
    const dispatch = useDispatch();
    switch (type) {
        case "TEXT_NOTEBOOK": {
            const onClick = async (e) => {
                e.preventDefault();
                dispatch(thunkDeleteTextNotebook(id));
                dispatch(thunkLoadNotebooks());
                setIsDeleted(false)
                console.log("FUCKKKKKKKK", id)
            };
            return onClick;
        }
        // case "NOTE": {
        //     const onClick = async (e) => {
        //         e.preventDefault();
        //         // dispatch(thunkDeleteTextNote(id));
        //         dispatch(thunkLoadNotebooks());
        //     };
        //     return onClick;
        // }
        default: {
            return () => { }; // empty funcccccc.
        }
    }
};
