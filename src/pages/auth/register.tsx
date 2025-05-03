import React, { useState } from 'react';
import RegisterForm from '../../components/forms/auth/RegisterForm';
import VerifyConfirmForm from '../../components/forms/auth/verifyConfirm';
import { useNavigate } from 'react-router-dom';
import API_ENDPOINTS from '../../constants/api';
import axios from 'axios';
import { toast } from 'sonner';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();

const handleRegisterSuccess = async (registeredEmail: string) => {
  setEmail(registeredEmail);
  try {
    await axios.put(API_ENDPOINTS.auth.resetPasswordInitiate, {
      email: registeredEmail,
    });
    console.log('Verification code sent to email:', registeredEmail);
    toast.success("Verification code sent to your email");
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      toast.error(error.response.data.message);
      console.log('Error sending verification code:', error.response.data.message);
    } else {
      toast.error('Failed to send verification code. Please try again.');
    }
  }
};


  const handleVerifySuccess = () => {
    navigate('/auth/login');
  };

  return (
    <div className='w-full'>
      {!email ? (
        <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
      ) : (
        <VerifyConfirmForm email={email} onVerifySuccess={handleVerifySuccess} />
      )}
    </div>
  );
};

export default RegisterPage;
