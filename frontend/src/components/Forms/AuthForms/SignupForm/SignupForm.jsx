//======================================================================
//   _____  _
//  /  ___|(_)
//  \ `--.  _   __ _  _ __   _   _  _ __  ______
//   `--. \| | / _` || '_ \ | | | || '_ \|______|
//  /\__/ /| || (_| || | | || |_| || |_) |
//  \____/ |_| \__, ||_| |_| \__,_|| .__/
//      ______  __/ |              | |
//      |  ___||___/               |_|
//      | |_  ___   _ __  _ __ ___
//      |  _|/ _ \ | '__|| '_ ` _ \
//      | | | (_) || |   | | | | | |
//      \_|  \___/ |_|   |_| |_| |_|
//======================================================================
//       __  __  ___        __  __          ___         __  __  _______
//  |\ |/  \|  \|__    |\/|/  \|  \|  ||   |__    ||\/||__)/  \|__)|/__`
//  | \|\__/|__/|___   |  |\__/|__/\__/|___|___   ||  ||   \__/|  \|.__/
//=======================================================================
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
//=======================================================================
//       __  __             ___     ___         __  __  _______
//  |   /  \/  ` /\ |      |__||   |__    ||\/||__)/  \|__)|/__`
//  |___\__/\__,/~~\|___   |  ||___|___   ||  ||   \__/|  \|.__/
//=======================================================================
// COMPONENTS
import ErrorModal from "../../../ErrorModal";
import FormInput from "../../FormInput";
// HELPERS
import * as sessionActions from "../../../../store/session";
// CONTEXTS
import { useModal } from "../../../../context/Modal";
//=======================================================================
const defaultFields = {
  email: "",
  username: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
};
//=======================================================================
const SignupForm = ({ bgColor, toggleForm }) => {
  //==========================================
  //   VARIABLE DECLARATIONS, INITIALIZERS,
  //       STATE VARIABLE ASSIGNMENTS
  //==========================================
  const dispatch = useDispatch();
  const { closeModal, setModalContent } = useModal();
  const [formFields, setFormFields] = useState(defaultFields);
  const { email, username, firstName, lastName, password, confirmPassword} = formFields;
  // eslint-disable-next-line
  const [errors, setErrors] = useState([]);

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
    if (password !== confirmPassword) {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
      setModalContent(
        <ErrorModal
          errors={[
            "Confirm Password field must be the same as the Password field",
          ]}
        />
      );
    } else {
      setErrors([]);
      try {
        await dispatch(
          sessionActions.signup({
            email,
            username,
            firstName,
            lastName,
            password,
          })
        );
      } catch (error) {
        const data = await error.json();
        setErrors(Object.values(data.errors));
        if (!Array.isArray(data.errors)) {
          setModalContent(<ErrorModal errors={Object.values(data?.errors)} />);
        } else {
          setModalContent(<ErrorModal errors={[data.errors[0].message]} />);
        }
      }
    }
  };

    const onChange = (e) => {
      const { name, value } = e.target;
      setFormFields({ ...formFields, [name]: value });
    };

  //====================================
  //            JSX BODY
  //====================================
  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div className="form-container">
        <h2>Sign Up</h2>
        {/* <label className="auth-credentials"> */}
        <FormInput
          label="Email: "
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          style={{ backgroundColor: bgColor }}
          required
        />
        <FormInput
          label="Username: "
          type="text"
          name="username"
          value={username}
          onChange={onChange}
          style={{ backgroundColor: bgColor }}
          required
        />
        <FormInput
          label="First name: "
          type="text"
          name="firstName"
          value={firstName}
          onChange={onChange}
          style={{ backgroundColor: bgColor }}
          required
        />
        <FormInput
          label="Last name: "
          type="text"
          name="lastName"
          value={lastName}
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
        <FormInput
          label="Confirm password: "
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChange}
          style={{ backgroundColor: bgColor }}
          required
        />
        <div className="buttons-container">
          <button className="auth-button" type="submit">
            Sign Up
          </button>
        </div>
        <button type="button" onClick={toggleForm} className="auth-button">
          Login instead.
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
