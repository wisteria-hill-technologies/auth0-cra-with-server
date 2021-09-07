import React, { useEffect, useState, FC } from "react";

interface ProfileProps {
  user?: { picture?: string; name?: string; email?: string };
}

const Profile:FC<ProfileProps> = ({ user }) => {

  // useEffect(() => {
  //   const getUserMetadata = async () => {
  //     try {
  //       const response = await fetch('/api/user_details', {
  //         headers: { 'Content-Type': 'application/json', 'x-csrf-token': window.csrfToken },
  //         credentials: 'include'
  //       });
  //
  //       console.log('user_details response >>', response);
  //       if (!response.ok) {
  //         return;
  //       }
  //       const { user } = await response.json();
  //       setUser(user);
  //     } catch (e) {
  //       console.log('error message>>>', e);
  //     }
  //   };
  //   getUserMetadata();
  // }, []);

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