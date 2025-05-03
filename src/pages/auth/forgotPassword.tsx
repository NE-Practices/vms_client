import React from 'react';
import InitiateResetForm from '../../components/forms/auth/initiatReset';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();

  const handleInitiateSuccess = (email: string) => {
    navigate('/auth/resetPassword', { state: { email } });
  };

  return (
    <div className="w-full ">
      <InitiateResetForm onInitiateSuccess={handleInitiateSuccess} />
    </div>
  );
};

export default ForgotPasswordPage;
