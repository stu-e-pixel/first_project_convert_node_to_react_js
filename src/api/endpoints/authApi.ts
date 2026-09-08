/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AuthResponse, LoginCredentials, SignupCredentials, User, VerifyCredentials } from "../../typescript/types";
import api from "../axiosconfig";





export const SignupUser = async (
  data: SignupCredentials,
): Promise<AuthResponse> => {
  const response = await api.post("/api/signup", data);
  return response.data;
};

export const resendVerificationOTP = async (email: string): Promise<{ message: string }> => {
  try {
    const response = await api.post('/api/resend-otp', { email });
    return response.data;
  } catch (error: any) {
    console.error('Error resending OTP:', error);
    throw error;
  }
};

export const verifyEmail = async(data:VerifyCredentials):Promise<AuthResponse>=>{
    const response = await api.post("/api/verify",data)
    return response.data
};

export const loginUser = async(data:LoginCredentials):Promise<AuthResponse>=>{
    const response = await api.post("/api/login",data)
    return response.data
};

export const profile = async():Promise<{user:User}>=>{
    const response = await api.get("/api/profile")
    return response.data
};

export const getAllUsers = async () => {
  const response = await api.get("/api/all-users");
  return response.data;
};
