import React from 'react';
import { Users, Heart, Shield, ArrowRight } from 'lucide-react';

const UserTypeSelection = ({ onUserTypeSelect }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '3rem',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '90%'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          color: 'white'
        }}>
          <Heart size={40} />
        </div>
        
        <h1 style={{ 
          color: '#333', 
          marginBottom: '1rem',
          fontSize: '2.5rem',
          fontWeight: '700'
        }}>
          BayMax
        </h1>
        <p style={{ 
          color: '#666', 
          marginBottom: '3rem',
          fontSize: '1.1rem',
          lineHeight: '1.6'
        }}>
          Your mental health companion. Choose your role to get started on your wellness journey.
        </p>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.5rem' 
        }}>
          <button
            onClick={() => onUserTypeSelect('user')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.5rem 2rem',
              fontSize: '1.2rem',
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 15px rgba(79, 172, 254, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 25px rgba(79, 172, 254, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 15px rgba(79, 172, 254, 0.3)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Users size={24} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: '600' }}>I'm a User</div>
                <div style={{ fontSize: '0.9rem', opacity: '0.9' }}>
                  Seeking support and guidance
                </div>
              </div>
            </div>
            <ArrowRight size={20} />
          </button>
          
          <button
            onClick={() => onUserTypeSelect('counsellor')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.5rem 2rem',
              fontSize: '1.2rem',
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 15px rgba(67, 233, 123, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 25px rgba(67, 233, 123, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 15px rgba(67, 233, 123, 0.3)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Shield size={24} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: '600' }}>I'm a Counsellor</div>
                <div style={{ fontSize: '0.9rem', opacity: '0.9' }}>
                  Professional mental health provider
                </div>
              </div>
            </div>
            <ArrowRight size={20} />
          </button>
        </div>
        
        <div style={{ 
          marginTop: '2rem', 
          padding: '1rem', 
          background: 'rgba(0, 0, 0, 0.05)', 
          borderRadius: '10px' 
        }}>
          <p style={{ 
            margin: 0, 
            fontSize: '0.9rem', 
            color: '#666' 
          }}>
            🔒 Your data is secure and confidential
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;