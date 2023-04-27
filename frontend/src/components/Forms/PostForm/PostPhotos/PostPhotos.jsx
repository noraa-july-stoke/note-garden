import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadPostImages } from "../../../../store/uploads";

const PostPhotos = ({ imageState, toggleAddPhotos }) => {
  const { photos, setPhotos } = imageState;
  const [imageFiles, setImageFiles] = useState([]);
  const [name, setName] = useState("");
  const [previews, setPreviews] = useState([]);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles([...imageFiles, ...files]);
    setPreviews([
      ...previews,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeImage = (index) => {
    const newImageFiles = [...imageFiles];
    newImageFiles.splice(index, 1);
    setImageFiles(newImageFiles);

  const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    imageFiles.forEach((image) => {
      formData.append("files", image);
    });
    formData.append("name", name);
    // eslint-disable-next-line
    const imgUrls = await dispatch(uploadPostImages(formData));
    console.log(imgUrls);
    setPhotos(imgUrls);
    setImageFiles([]);
    setPreviews([]);
    toggleAddPhotos()
  };

  return (
    <form>
      <button className="post-button" type="button" onClick={handleConfirm}>
        Confirm Selected Photos
      </button>
      <label htmlFor="file-input">
        <input
          className="post-button"
          id="file-input"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      </label>
      {previews.map((preview, index) => (
        <div key={preview}>
          <img src={preview} alt="preview" width="100" height="100" />
          <button type="button" onClick={() => removeImage(index)}>
            Remove
          </button>
        </div>
      ))}
    </form>
  );
};

export default PostPhotos;
