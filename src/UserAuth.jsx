import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Heart, AlertCircle, CheckCircle } from 'lucide-react';

const UserAuth = ({ onBack, onLogin, userType }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
    specialization: '',
    experience: '',
    phone: ''
  });

  const specializations = [
    'Clinical Psychology',
    'Counseling Psychology', 
    'Marriage & Family Therapy',
    'Substance Abuse Counseling',
    'Child & Adolescent Psychology',
    'Cognitive Behavioral Therapy',
    'Trauma Therapy',
    'Other'
  ];

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setMessage({ type: 'error', text: 'Email and password are required' });
      return false;
    }

    if (!isLogin) {
      if (!formData.fullName) {
        setMessage({ type: 'error', text: 'Full name is required' });
        return false;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setMessage({ type: 'error', text: 'Passwords do not match' });
        return false;
      }

      if (formData.password.length < 6) {
        setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
        return false;
      }

      if (userType === 'counsellor' && (!formData.licenseNumber || !formData.specialization)) {
        setMessage({ type: 'error', text: 'License number and specialization are required for counsellors' });
        return false;
      }
    }

    return true;
  };

  // MongoDB Connection Helper
  const connectToMongoDB = async (operation, data) => {
    try {
      // In a real app, this would be an API call to your backend
      // For now, we'll simulate with localStorage + some validation
      
      if (operation === 'login') {
        const users = JSON.parse(localStorage.getItem(`${userType}_users`) || '[]');
        const user = users.find(u => u.email === data.email && u.password === data.password);
        
        if (user) {
          return { success: true, user };
        } else {
          return { success: false, message: 'Invalid email or password' };
        }
      } else if (operation === 'signup') {
        const users = JSON.parse(localStorage.getItem(`${userType}_users`) || '[]');
        const existingUser = users.find(u => u.email === data.email);
        
        if (existingUser) {
          return { success: false, message: 'User already exists with this email' };
        }
        
        const newUser = {
          id: Date.now().toString(),
          ...data,
          createdAt: new Date().toISOString(),
          userType
        };
        
        users.push(newUser);
        localStorage.setItem(`${userType}_users`, JSON.stringify(users));
        
        return { success: true, user: newUser };
      }
    } catch (error) {
      return { success: false, message: 'Database connection error' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const result = await connectToMongoDB(
        isLogin ? 'login' : 'signup',
        formData
      );

      if (result.success) {
        setMessage({ type: 'success', text: isLogin ? 'Login successful!' : 'Account created successfully!' });
        
        setTimeout(() => {
          onLogin(userType, result.user);
        }, 1500);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    paddingLeft: '3rem',
    fontSize: '1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    outline: 'none',
    transition: 'all 0.3s ease',
    backgroundColor: 'white'
  };

  const inputFocusStyle = {
    borderColor: userType === 'counsellor' ? '#43e97b' : '#4facfe',
    boxShadow: `0 0 0 3px ${userType === 'counsellor' ? 'rgba(67, 233, 123, 0.1)' : 'rgba(79, 172, 254, 0.1)'}`
  };

  const buttonGradient = userType === 'counsellor' 
    ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '1rem'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '2.5rem',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '500px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              marginRight: '1rem',
              borderRadius: '50%',
              transition: 'background 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.background = 'rgba(0,0,0,0.1)'}
            onMouseOut={(e) => e.target.style.background = 'none'}
          >
            <ArrowLeft size={20} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Heart size={24} style={{ color: userType === 'counsellor' ? '#43e97b' : '#4facfe' }} />
            <h2 style={{ margin: 0, color: '#333', fontSize: '1.5rem' }}>
              {userType === 'counsellor' ? 'Counsellor' : 'User'} {isLogin ? 'Login' : 'Sign Up'}
            </h2>
          </div>
        </div>

        {message.text && (
          <div style={{
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: message.type === 'error' ? '#fee2e2' : '#dcfce7',
            color: message.type === 'error' ? '#dc2626' : '#16a34a',
            border: `1px solid ${message.type === 'error' ? '#fecaca' : '#bbf7d0'}`
          }}>
            {message.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {!isLogin && (
            <div style={{ position: 'relative' }}>
              <User style={{ position: 'absolute', left: '0.75rem', top: '0.75rem', color: '#94a3b8' }} size={20} />
              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          )}

          <div style={{ position: 'relative' }}>
            <Mail style={{ position: 'absolute', left: '0.75rem', top: '0.75rem', color: '#94a3b8' }} size={20} />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock style={{ position: 'absolute', left: '0.75rem', top: '0.75rem', color: '#94a3b8' }} size={20} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '0.75rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#94a3b8'
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {!isLogin && (
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: '0.75rem', top: '0.75rem', color: '#94a3b8' }} size={20} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '0.75rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94a3b8'
                }}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          )}

          {!isLogin && userType === 'counsellor' && (
            <>
              <input
                type="text"
                placeholder="License Number"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />

              <select
                value={formData.specialization}
                onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                style={{...inputStyle, paddingLeft: '0.75rem'}}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="">Select Specialization</option>
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Years of Experience"
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.875rem',
              fontSize: '1.1rem',
              background: loading ? '#94a3b8' : buttonGradient,
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '600',
              boxShadow: loading ? 'none' : '0 8px 15px rgba(0, 0, 0, 0.1)'
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.15)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
              }
            }}
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '1.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #e2e8f0'
        }}>
          <p style={{ color: '#666', margin: '0 0 1rem 0' }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage({ type: '', text: '' });
              setFormData({
                fullName: '',
                email: '',
                password: '',
                confirmPassword: '',
                licenseNumber: '',
                specialization: '',
                experience: '',
                phone: ''
              });
            }}
            style={{
              background: 'none',
              border: 'none',
              color: userType === 'counsellor' ? '#43e97b' : '#4facfe',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              textDecoration: 'underline'
            }}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAuth;