import {useDispatch} from 'react-redux';
import { thunkLoadNotebooks, thunkDeleteTextNotebook } from '../../../store/notebooks';

export const deleteReducer = (type, id, setIsDeleted) => {
    const dispatch = useDispatch();
    switch (type) {
        case "TEXT_NOTEBOOK": {
            const onClick = async (e) => {
                e.preventDefault();
                dispatch(thunkDeleteTextNotebook(id));
                dispatch(thunkLoadNotebooks());
                setIsDeleted(false)
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
