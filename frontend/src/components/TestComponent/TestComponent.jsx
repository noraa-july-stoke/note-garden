
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkLoadCollaborations } from '../../store/collaborations';
import { thunkLoadComments } from '../../store/comments';
import { thunkLoadNotes } from '../../store/notes';
import { thunkLoadNotebooks } from '../../store/notebooks';
import { thunkLoadPals } from '../../store/pals';
const TestComponent = () => {

    const dispatch = useDispatch();
    const collaborations = useSelector(state => state.collaborations?.userCollaborations);
    const comments = useSelector(state => state.comments?.userComments);
    const notes = useSelector(state => state.notes)
    const notebooks = useSelector(state => state.notebooks)
    const pals = useSelector(state => state.pals)

    useEffect(() => {
        dispatch(thunkLoadCollaborations());
        dispatch(thunkLoadComments());
        dispatch(thunkLoadNotes());
        dispatch(thunkLoadNotebooks());
        dispatch(thunkLoadPals());
    }, [dispatch]);
    return (
        <div>
            {
                // comments?.map(comment => <div>{comment.content}</div>)
            }
            {
                // collaborations?.map(collaboration => <div>{collaboration.authorId}, {collaboration.collaboratorId {}</div>)
            }
        </div>
    );
}

export default TestComponent;
