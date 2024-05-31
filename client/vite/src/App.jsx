import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";
import NavBar from './components/NavBar';
import Global from './components/Global';
import Stories from './components/Stories';
import Profile from './components/Profile';
import Mission from './components/Mission';
import RecipeCard from './components/RecipeCard';
import RecipePage from './components/RecipePage';
import Footer from './components/Footer';


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
        <Route path="/" element={<Global user={userData} />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/profile" element={<Profile user={userData} />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/recipes" element={<RecipeCard user={userData}/>} />
        <Route path="/recipes/:id" element={<RecipePage user={userData} />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
