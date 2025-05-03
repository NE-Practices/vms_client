import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/button';
import API_ENDPOINTS from '../../../constants/api';

interface VerifyConfirmFormProps {
  email: string;
  onVerifySuccess: () => void;
}

const VerifyConfirmForm: React.FC<VerifyConfirmFormProps> = ({ email, onVerifySuccess }) => {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only digits allowed
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verificationCode = code.join('');
    if (verificationCode.length !== 6) {
      toast.error('Please enter the 6-digit verification code');
      return;
    }
    try {
      const url = API_ENDPOINTS.auth.verifyAccountConfirm(verificationCode);
      const response = await axios.put(url, { email },{
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        toast.success('Email verified successfully');
        onVerifySuccess();
      } else {
        toast.error(response.data.message || 'Verification failed');
      }
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-md mx-auto p-6 rounded space-y-6 bg-white text-black"
    >
      <h2 className="text-2xl font-semibold text-black">Verify Email</h2>
      <div className="flex justify-between space-x-2">
        {code.map((digit, idx) => (
          <input
            key={idx}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            ref={(el: HTMLInputElement | null) => {
              inputsRef.current[idx] = el;
            }}
            className="w-12 h-12 text-center text-2xl border border-black rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        ))}
      </div>
      <div className='w-full flex gap-4 justify-between items-center'>
        <Button type="submit" className="w-1/2 bg-red-700 hover:bg-red-800 ">
          Verify Email
        </Button>
        <Button
          type="button"
          className='w-1/2'
          variant="outline"
          onClick={async () => {
            try {
              await axios.put(
                API_ENDPOINTS.auth.verifyAccountInitiate,
                {
                  email,
                },
                {
                  headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              toast.success("Verification code resent");
            } catch {
              toast.error("Failed to resend code");
            }
          }}
        >
          Resend Code
        </Button>
      </div>
    </form>
  );
};

export default VerifyConfirmForm;
