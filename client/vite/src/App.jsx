import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";
import Explore from './components/Explore'
import Profile from './components/Profile';
import About from './components/About';
import Family from './components/Family';
import RecipePage from './components/RecipePage';
import NavBar from './components/NavBar';


function App() {
  const { user } = useUser(); 
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      const userData = {
        clerk_id: user.id,
        firstName: user.firstName,
        lastName: user.lastName
      };
      console.log("User data:", userData);
      setUserData(userData);
      postUserData(userData);
    }
  }, [user]);

 const postUserData = (userData) => {
    fetch(`/api/users`, {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to send user data to backend');
        }
      })
      .catch(error => {
        console.error('Error sending user data to backend:', error);
      });
  };
  
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Explore user={userData} />} />
        <Route path="/profile" element={<Profile user={userData} />} />
        <Route path="/about" element={<About />} />
        <Route path="/family" element={<Family user={userData} />} />
        <Route path="/recipes/:id" element={<RecipePage user={userData}/>} />
      </Routes>
    </Router>
  );
}

export default App;
