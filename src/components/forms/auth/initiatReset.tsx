import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'sonner';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import API_ENDPOINTS from '../../../constants/api';

interface InitiateResetFormProps {
  onInitiateSuccess: (email: string) => void;
}

const InitiateResetForm: React.FC<InitiateResetFormProps> = ({ onInitiateSuccess }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<{ email: string }>();

  const onSubmit = async (data: { email: string }) => {
    try {
      const response = await axios.put(API_ENDPOINTS.auth.resetPasswordInitiate, { email: data.email },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        toast.success('Reset password email sent successfully');
        onInitiateSuccess(data.email);
      } else {
        toast.error(response.data.message || 'Failed to send reset password email');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto p-6  rounded space-y-6 bg-white text-black">
      <h2 className="text-2xl font-semibold text-black">Reset Password</h2>
      <div>
        <label htmlFor="email" className="block mb-1 font-medium text-black">Email</label>
        <Input id="email" type="email" {...register('email', { required: 'Email is required' })} className="border-black focus:ring-red-500" />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full bg-red-700 hover:bg-red-800 focus:ring-red-500">
        {isSubmitting ? 'Sending...' : 'Send Reset Email'}
      </Button>
    </form>
  );
};

export default InitiateResetForm;
