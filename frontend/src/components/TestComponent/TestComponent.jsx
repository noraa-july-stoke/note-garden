
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkLoadCollaborations } from '../../store/collaborations';
import { thunkLoadComments } from '../../store/comments';
import { thunkLoadNotes } from '../../store/notes';
import { thunkLoadNotebooks } from '../../store/notebooks';
import { thunkLoadPals } from '../../store/pals';
import { thunkLoadPalPosts, thunkLoadPosts } from '../../store/posts';
import { thunkLoadReactions } from '../../store/reactions';
import ExampleComponent from "./ExampleComponent";

const TestComponent = () => {

    const dispatch = useDispatch();
    const collaborations = useSelector(state => state.collaborations);
    const comments = useSelector(state => state.comments);
    const notes = useSelector(state => state.notes)
    const notebooks = useSelector(state => state.notebooks)
    const pals = useSelector(state => state.pals)

    useEffect(() => {
        dispatch(thunkLoadCollaborations());
        dispatch(thunkLoadComments());
        dispatch(thunkLoadNotes());
        dispatch(thunkLoadNotebooks());
        dispatch(thunkLoadPals());
        dispatch(thunkLoadPosts());
        dispatch(thunkLoadReactions());
        dispatch(thunkLoadPalPosts());
    }, [dispatch]);
    return <ExampleComponent/>
}

export default TestComponent;
