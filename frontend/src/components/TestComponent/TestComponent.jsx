
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkLoadCollaborations } from '../../store/collaborations';

const TestComponent = () => {

    const dispatch = useDispatch();
    const collaborations = useSelector(state => state.collaborations?.userCollaborations);
    useEffect(() => {

        dispatch(thunkLoadCollaborations());
    }, [dispatch]);

    return (
        <div>
            hello
        </div>
    );
}

export default TestComponent;
