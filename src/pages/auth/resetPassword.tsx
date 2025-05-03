import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ResetConfirmForm from '../../components/forms/auth/resetConfirm';

const ResetPasswordPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  const handleResetSuccess = () => {
    navigate('/auth/login');
  };

  return (
    <div className="w-full">
      <ResetConfirmForm email={email} onResetSuccess={handleResetSuccess} />
    </div>
  );
};

export default ResetPasswordPage;
