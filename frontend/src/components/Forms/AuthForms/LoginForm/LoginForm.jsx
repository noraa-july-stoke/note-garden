//======================================================================
//   _                    _
//  | |                  (_)
//  | |      ___    __ _  _  _ __    ______
//  | |     / _ \  / _` || || '_ \  |______|
//  | |____| (_) || (_| || || | | |
//  \_____/ \___/  \__, ||_||_| |_|
//    ______        __/ |
//    |  ___|      |___/
//    | |_  ___   _ __  _ __ ___
//    |  _|/ _ \ | '__|| '_ ` _ \
//    | | | (_) || |   | | | | | |
//    \_|  \___/ |_|   |_| |_| |_|
//======================================================================
//       __  __  ___        __  __          ___         __  __  _______
//  |\ |/  \|  \|__    |\/|/  \|  \|  ||   |__    ||\/||__)/  \|__)|/__`
//  | \|\__/|__/|___   |  |\__/|__/\__/|___|___   ||  ||   \__/|  \|.__/
//=======================================================================
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

//=======================================================================
//       __  __             ___     ___         __  __  _______
//  |   /  \/  ` /\ |      |__||   |__    ||\/||__)/  \|__)|/__`
//  |___\__/\__,/~~\|___   |  ||___|___   ||  ||   \__/|  \|.__/
//=======================================================================
// COMPONENTS
import ErrorModal from "../../../ErrorModal";
import FormInput from "../../Inputs/FormInput";
// HELPERS
import * as sessionActions from "../../../../store/session";
// CONTEXTS
import { useModal } from "../../../../context/Modal";

//=======================================================================
const defaultFields = {
  credential: "",
  password: "",
};
//=======================================================================
const LoginForm = ({ bgColor, toggleForm }) => {
  //==========================================
  //   VARIABLE DECLARATIONS, INITIALIZERS,
  //       STATE VARIABLE ASSIGNMENTS
  //==========================================
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { closeModal, setModalContent } = useModal();
  // const [credential, setCredential] = useState("");
  // const [password, setPassword] = useState("");
  const [formFields, setFormFields] = useState(defaultFields);
  const { credential, password } = formFields;

  //====================================
  //              HOOKS
  //====================================
  useEffect(() => {
    const handleClick = (e) => {
      // check if click target is outside the modal window
      const modal = document.querySelector(".error-container");
      if (modal && !modal.contains(e.target)) {
        closeModal();
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [closeModal]);

  //====================================
  //      HELPERS/EVENT LISTENERS
  //         ADDITIONAL LOGIC
  //====================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.login({ credential, password }))
      .then(() => {
        // reset the modal content to null if login succeeds
        setModalContent(null);
        closeModal();
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          // set the modal content to the ErrorModal component if there are errors
          setModalContent(<ErrorModal errors={Object.values(data.errors)} />);
        }
      });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  // const reset = () => {
  //   setFormFields(defaultFields);
  // };

  //====================================
  //            JSX BODY
  //====================================
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <h2>Log In</h2>
        <FormInput
          label="Username/Email: "
          type="text"
          name="credential"
          value={credential}
          onChange={onChange}
          style={{ backgroundColor: bgColor }}
          required
        />
        <FormInput
          label="Password: "
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          style={{ backgroundColor: bgColor }}
          required
        />
        <div className="auth-buttons-container">
          <button className="auth-button" type="submit">
            Log In
          </button>
          <button
            className="auth-button"
            type="submit"
            onClick={(e) => {
              setFormFields({
                credential: "greedo@jabbas-palace.com",
                password: "password",
              });
            }}>
            Demo User
          </button>
        </div>
        <button type="button" onClick={toggleForm} className="auth-button">
          Signup instead.
        </button>
      </div>
    </form>
  );
};
export default LoginForm;
