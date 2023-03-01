import React, { useState } from 'react';
import ErrorModal from '../ErrorModal';


//Hard coded boilerplate for now--finish l8r
const ExampleComponent = () => {
    const [errors, setErrors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [inputVal, setInputVal] = useState("");
    const [modalKey, setModalKey] = useState(0);
    const handleSubmit = (event) => {
        event.preventDefault();
        // const newErrors = []
        // if (inputVal.length < 3){
        //     newErrors.push("too short!!!")
        // }
        // Perform form validation here later
        const validationErrors = ['Error 1', 'Error 2', 'Error 3'];
        setErrors(validationErrors);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalKey(modalKey + 1);
    };

    const handleChange = e => {
        setInputVal(e.target.value)
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input type="text" value={inputVal} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
            {showModal && <ErrorModal key={modalKey} errors={errors} onClose={handleCloseModal} />}
        </div>
    );
};

export default ExampleComponent;
