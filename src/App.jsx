import { useState, useEffect } from "react";
import HomePage from "./HomePage";
import UserTypeSelection from "./UserTypeSelection";
import UserAuth from "./UserAuth";
import "./index.css";

export default function App() {
  const [screen, setScreen] = useState("loading");
  const [userType, setUserType] = useState(null);
  const [user, setUser] = useState(null);

  // Check for existing session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setScreen("home");
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('currentUser');
        setScreen("userTypeSelection");
      }
    } else {
      setScreen("userTypeSelection");
    }
  }, []);

  // Handle user type selection (user or counsellor)
  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setScreen('auth');
  };

  // Handle successful login/signup
  const handleLogin = (type, userData) => {
    const userWithSession = {
      ...userData,
      userType: type,
      sessionStart: new Date().toISOString()
    };
    
    setUser(userWithSession);
    
    // Save to localStorage for session persistence
    localStorage.setItem('currentUser', JSON.stringify(userWithSession));
    
    // Navigate to home page
    setScreen("home");
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setUserType(null);
    localStorage.removeItem('currentUser');
    setScreen("userTypeSelection");
  };

  // Handle back to user type selection
  const handleBackToUserTypeSelection = () => {
    setScreen("userTypeSelection");
    setUserType(null);
  };

  // Loading screen
  if (screen === "loading") {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid rgba(255,255,255,0.3)',
            borderTop: '4px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }} />
          <h2>Loading CybeVodars...</h2>
        </div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <>
      {/* User Type Selection Screen */}
      {screen === "userTypeSelection" && (
        <UserTypeSelection onUserTypeSelect={handleUserTypeSelect} />
      )}

      {/* Authentication Screen (Login/Signup) */}
      {screen === "auth" && (
        <UserAuth 
          onBack={handleBackToUserTypeSelection}
          onLogin={handleLogin}
          userType={userType}
        />
      )}

      {/* Home Page - Your Original Dashboard */}
      {screen === "home" && (
        <HomePage 
          onOpenChat={() => {
            // You can implement these pages later
            alert("Chat page coming soon! Create ChatPage.jsx to enable this feature.");
          }}
          onOpenJournal={() => {
            alert("Journal page coming soon! Create JournalPage.jsx to enable this feature.");
          }}
          onOpenResourceHub={(target) => {
            if (target === "dailyTasks") {
              alert("Daily Tasks page coming soon! Create DailyTasksPage.jsx to enable this feature.");
            } else {
              alert("Resource Hub page coming soon! Create ResourceHubPage.jsx to enable this feature.");
            }
          }}
          user={user} // Pass user data to HomePage
          onLogout={handleLogout} // Add logout functionality
        />
      )}
    </>
  );
}