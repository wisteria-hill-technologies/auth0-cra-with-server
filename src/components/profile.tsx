import React, { FC } from "react";

interface ProfileProps {
  user?: { picture?: string; name?: string; email?: string };
}

const Profile:FC<ProfileProps> = ({ user }) => {
  return (
    user ? (
      <div>
        <img src={user?.picture} alt={user?.name} />
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
      </div>
    ) : (
      <div>
        <h2>No User Data</h2>
      </div>
    )
  );
};

export default Profile;