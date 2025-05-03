import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/forms/auth/loginForm';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/dashboard/overview');
  };

  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
};

export default LoginPage;
