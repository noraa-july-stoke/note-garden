//=======================================================================
//  ______            _
//  | ___ \          | |
//  | |_/ /___   ___ | |_   ______
//  |  __// _ \ / __|| __| |______|
//  | |  | (_) |\__ \| |_
//  \_|   \___/ |___/ \__|
//  ______
//  |  ___|
//  | |_  ___   _ __  _ __ ___
//  |  _|/ _ \ | '__|| '_ ` _ \
//  | | | (_) || |   | | | | | |
//  \_|  \___/ |_|   |_| |_| |_|
//======================================================================
//       __  __  ___        __  __          ___         __  __  _______
//  |\ |/  \|  \|__    |\/|/  \|  \|  ||   |__    ||\/||__)/  \|__)|/__`
//  | \|\__/|__/|___   |  |\__/|__/\__/|___|___   ||  ||   \__/|  \|.__/
//=======================================================================
import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
//=======================================================================
//       __  __             ___     ___         __  __  _______
//  |   /  \/  ` /\ |      |__||   |__    ||\/||__)/  \|__)|/__`
//  |___\__/\__,/~~\|___   |  ||___|___   ||  ||   \__/|  \|.__/
//=======================================================================
// COMPONENTS
import FormInput from "../Inputs/FormInput";
import FormSelect from "../Inputs/FormSelect/FormSelect";
import FormTextArea from "../Inputs/FormTextArea";
import AddLinksInput from "../Inputs/AddLinksInput";
import PostPhotos from "./PostPhotos/PostPhotos";
import PostLink from "../../Cards/PostLink";
// HELPERS
// THUNKS
import { thunkAddPost } from "../../../store/posts";
// CONTEXTS
import { ColorContext } from "../../../context/ColorContext";
// STYLES
import "./PostForm.css";
//=======================================================================
const defaultFields = {
  caption: "",
  visibility: true,
  textContent: "",
};

//=======================================================================
const PostForm = () => {
  //==========================================
  //   VARIABLE DECLARATIONS, INITIALIZERS,
  //       STATE VARIABLE ASSIGNMENTS
  //==========================================
  const [formFields, setFormFields] = useState(defaultFields);
  const [link, setLink] = useState("");
  const [photos, setPhotos] = useState([]);
  const [showAddLink, setShowAddLink] = useState(false); // add state for toggling AddLinksInput
  const [showAddPhotos, setShowAddPhotos] = useState(false);
  const { caption, visibility, textContent } = formFields;
  const { bgColor } = useContext(ColorContext);
  const dispatch = useDispatch();
  //====================================
  //              HOOKS
  //====================================
  //====================================
  //      HELPERS/EVENT LISTENERS
  //         ADDITIONAL LOGIC
  //====================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(photos)
    await dispatch(
      thunkAddPost({ ...formFields, linkContent: link, photoContent: photos})
    );
    reset();
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const reset = () => {
    setFormFields(defaultFields);
    setLink("");
    setPhotos([]);
  };

  const toggleAddLink = () => {
    setShowAddLink(!showAddLink);
  };

  const toggleAddPhotos = () => {
    setShowAddPhotos(!showAddPhotos);
  };

  const handleRemoveLink = (index) => {
    setLink("");
  };

  //====================================
  //            JSX BODY
  //====================================
  return (
    <div className="post-form-container" style={{ backgroundColor: bgColor }}>
      <form onSubmit={handleSubmit}>
        <h2 className="new-post-title">Create a new post!</h2>
        <FormInput
          label="Title"
          type="text"
          name="caption"
          value={caption}
          onChange={onChange}
          style={{ backgroundColor: bgColor }}
          required
        />
        <FormSelect
          label="Visibility"
          name="visibility"
          options={[
            { label: "Public", value: false },
            { label: "Friends Only", value: true },
          ]}
          value={visibility}
          onChange={onChange}
          style={{ backgroundColor: bgColor }}
          required
        />
        <FormTextArea
          label="What are you thinking about?"
          style={{ backgroundColor: bgColor }}
          name="textContent"
          value={textContent}
          onChange={onChange}
        />
        <div className="post-buttons-container">
          <button className="post-button" type="submit">
            Post
          </button>
          <button
            className="post-button"
            type="button"
            onClick={toggleAddPhotos}>
            Add Photos
          </button>
          <button className="post-button" type="button" onClick={toggleAddLink}>
            Add URL Link
          </button>
        </div>
      </form>
      <div className="previews-container">
        {link && (
          <div className="link-container">
            <PostLink url={link} />
            <button
              className="remove-post-link-button"
              onClick={() => handleRemoveLink()}>
              X{" "}
            </button>
          </div>
        )}
        <div className="photos-container">
          {photos?.map((url, index) => (
            <div key={index} className="thumbnail-container">
              <img src={url} alt="preview" width="100" height="100" />
            </div>
          ))}
        </div>
      </div>
      {showAddLink && (
        <AddLinksInput
          linkState={{ link, setLink, toggleAddLink }}
          bgColor={bgColor}
        />
      )}
      {showAddPhotos && (
        <PostPhotos
          imageState={{ photos, setPhotos }}
          bgColor={bgColor}
          toggleAddPhotos={toggleAddPhotos}
        />
      )}
    </div>
  );
};
export default PostForm;
