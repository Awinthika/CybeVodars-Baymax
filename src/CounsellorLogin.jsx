// CounsellorLogin.jsx
import React, { useState } from 'react';

const CounsellorLogin = ({ onBack, onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    licenseNumber: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login validation logic here
    if (formData.email && formData.password && formData.licenseNumber) {
      onLogin('counsellor', formData);
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '90%'
      }}>
        <h2 style={{ color: '#333', marginBottom: '1.5rem' }}>Counsellor Login</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            style={{
              padding: '0.75rem',
              fontSize: '1rem',
              border: '1px solid #ddd',
              borderRadius: '5px',
              outline: 'none'
            }}
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            style={{
              padding: '0.75rem',
              fontSize: '1rem',
              border: '1px solid #ddd',
              borderRadius: '5px',
              outline: 'none'
            }}
            required
          />
          
          <input
            type="text"
            placeholder="License Number"
            value={formData.licenseNumber}
            onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
            style={{
              padding: '0.75rem',
              fontSize: '1rem',
              border: '1px solid #ddd',
              borderRadius: '5px',
              outline: 'none'
            }}
            required
          />
          
          <button
            type="submit"
            style={{
              padding: '0.75rem',
              fontSize: '1.1rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1e7e34'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
          >
            Login as Counsellor
          </button>
        </form>
        
        <button
          onClick={onBack}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            fontSize: '0.9rem',
            backgroundColor: 'transparent',
            color: '#666',
            border: '1px solid #ddd',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Back to Role Selection
        </button>

        <div style={{ marginTop: '1rem' }}>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            Need to register as a counsellor? <a href="#" style={{ color: '#28a745', textDecoration: 'none' }}>Apply here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CounsellorLogin;