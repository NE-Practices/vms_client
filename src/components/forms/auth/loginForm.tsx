import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import API_ENDPOINTS from "../../../constants/api";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post(API_ENDPOINTS.auth.login, data);

      if (response.status !== 200) {
        toast.error(response.data.message || "Login failed");
        return;
      }

      const result = response.data;
      if (result.data.token) {
        localStorage.setItem("token", result.data.token);
      }
      console.log("Login successful:", result.data.token);

      toast.success("Login successful");
      onLoginSuccess();
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md mx-auto p-6 rounded space-y-6 bg-white text-black"
    >
      <div>
        <h2 className="text-2xl font-bold">Login</h2>
        <h1>Enter credentials to access your account</h1>
      </div>
      <div>
        <label htmlFor="email" className="block mb-1 font-medium text-black">
          Email
        </label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className="border-black focus:ring-red-500 py-6"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block mb-1 font-medium text-black">
          Password
        </label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          className="border-black focus:ring-red-500  py-6"
        />
        {errors.password && (
          <p className="text-black text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gray-700 hover:bg-gray-800 focus:ring-red-500 py-6"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>

      <div className="flex justify-between text-sm text-black">
        <a href="/auth/forgotPassword" className="text-black hover:underline">
          Forgot password?
        </a>
        <a href="/auth/register" className="text-red-600 hover:underline">
          Register here
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
