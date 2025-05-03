import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../../../components/ui/button";
import API_ENDPOINTS from "../../../constants/api";
import { Input } from "../../../components/ui/input";

const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    names: z.string().min(1, { message: "Names is required" }),
    telephone: z.string().min(1, { message: "Telephone is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormInputs = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onRegisterSuccess: (email: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const response = await axios.post(API_ENDPOINTS.auth.register, {
        email: data.email,
        names: data.names,
        telephone: data.telephone,
        password: data.password,
      });

      if (response.status !== 201) {
        toast.error(response.data.message || "Registration failed");
        return;
      }

      const result = response.data.data;
      if (result.token) {
        localStorage.setItem("token", result.token);
      }

      toast.success("Registration successful");
      onRegisterSuccess(data.email);
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
        <h2 className="text-2xl font-semibold text-black">Register</h2>
        <h1>Enter credentials to create account</h1>
      </div>

      <div>
        <label htmlFor="email" className="block mb-1 font-medium text-black">
          Email
        </label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className="border-black focus:ring-red-500  py-6"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="names" className="block mb-1 font-medium">
          Names
        </label>
        <Input
          id="names"
          className=" py-6"
          type="text"
          {...register("names")}
        />
        {errors.names && (
          <p className="text-red-600 text-sm mt-1">{errors.names.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="telephone" className="block mb-1 font-medium">
          Telephone
        </label>
        <Input
          id="telephone"
          className=" py-6"
          type="text"
          {...register("telephone")}
        />
        {errors.telephone && (
          <p className="text-red-600 text-sm mt-1">
            {errors.telephone.message}
          </p>
        )}
      </div>

      <div className="relative">
        <label htmlFor="password" className="block mb-1 font-medium">
          Password
        </label>
        <Input
          id="password"
          className=" py-6"
          type={showPassword ? "text" : "password"}
          {...register("password")}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-[20px] text-gray-500  py-6"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="relative">
        <label htmlFor="confirmPassword" className="block mb-1 font-medium">
          Confirm Password
        </label>
        <Input
          id="confirmPassword"
          className=" py-6"
          type={showConfirmPassword ? "text" : "password"}
          {...register("confirmPassword")}
        />
        <button
          type="button"
          onClick={toggleConfirmPasswordVisibility}
          className="absolute right-3 top-[45px] text-gray-500"
          tabIndex={-1}
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
        {errors.confirmPassword && (
          <p className="text-red-600 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gray-700 hover:bg-gray-800 py-6 focus:ring-red-500"
      >
        {isSubmitting ? "Registering..." : "Register"}
      </Button>

      <p className="text-center  text-sm text-black">
        Already have an account?{" "}
        <a href="/auth/login" className="text-red-600 hover:underline">
          Login here
        </a>
      </p>
    </form>
  );
};

export default RegisterForm;
