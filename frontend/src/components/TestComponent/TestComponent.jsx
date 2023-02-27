
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkLoadCollaborations } from '../../store/collaborations';
import { thunkLoadComments } from '../../store/comments';
import { thunkLoadNotes } from '../../store/notes';

const TestComponent = () => {

    const dispatch = useDispatch();
    const collaborations = useSelector(state => state.collaborations?.userCollaborations);
    const comments = useSelector(state => state.ccomments?.userComments);


    useEffect(() => {

        dispatch(thunkLoadCollaborations());
        dispatch(thunkLoadComments());
        dispatch(thunkLoadNotes());
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
