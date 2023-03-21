import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {uploadImage} from '../../store/uploads'

const ImageUploadForm = () => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');

    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("file", image);
      formData.append("name", name);
      // eslint-disable-next-line
      const imgUrl = dispatch(uploadImage(formData));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="file-input">Choose an image:</label>
                <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>
            <div>
                <label htmlFor="name-input">Name:</label>
                <input
                    id="image-name-input"
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                />
            </div>
            <button className="utility-button feedback-button" type="submit">Upload</button>
        </form>
    );
}

export default ImageUploadForm;
