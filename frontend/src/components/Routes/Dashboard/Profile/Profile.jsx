//=======================================================================
// HEADER HERE
//======================================================================
//       __  __  ___        __  __          ___         __  __  _______
//  |\ |/  \|  \|__    |\/|/  \|  \|  ||   |__    ||\/||__)/  \|__)|/__`
//  | \|\__/|__/|___   |  |\__/|__/\__/|___|___   ||  ||   \__/|  \|.__/
//=======================================================================
import React from 'react';
//=======================================================================
//       __  __             ___     ___         __  __  _______
//  |   /  \/  ` /\ |      |__||   |__    ||\/||__)/  \|__)|/__`
//  |___\__/\__,/~~\|___   |  ||___|___   ||  ||   \__/|  \|.__/
//=======================================================================
// COMPONENTS
// HELPERS
// CONTEXTS
// STYLES
import './Profile.css'
//=======================================================================

const Profile = ({ user }) => {
  const { avatarUrl, username, firstName, lastName, email } = user;

  return (
    <div className="profile-container">
      <div className="avatar-container">
        <img src={avatarUrl} alt={`${username}'s avatar`} />
      </div>
      <div className="user-info">
        <h2>{username}</h2>
        <h3>
          {firstName} {lastName}
        </h3>
        <p>Email: {email}</p>
      </div>
    </div>
  );
};

export default Profile;
