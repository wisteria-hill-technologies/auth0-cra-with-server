import React, {useEffect} from 'react';

const Dashboard = () => {
  useEffect(() => {
    console.log('csrfToken >>>', window.csrfToken);
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hello, welcome!</p>
    </div>
  );
};

export default Dashboard;