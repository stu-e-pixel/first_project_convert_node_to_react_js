/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../typescript/types/index";
import toast from "react-hot-toast";
import {
  getAllUsers,
  loginUser,
  profile,
  resendVerificationOTP,
  SignupUser,
  verifyEmail,
} from "../../api/endpoints/authApi";
import {
  removeAuthCookies,
  setAuthCookie,
} from "../../utils/cookieUtils";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  verificationEmail: string | null;
  users: User[];
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  verificationEmail: null,
  users: [],
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    userData: {
      name: string;
      email: string;
      phone: string;
      password: string;
      image:string;
      role: "admin"| "user";
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await SignupUser(userData);
      toast.success("Account created successfully! Please verify your email.");
      return {
        data: response.data,
        email: userData.email,
      };
    } catch (error: any) {
      const message = error.response?.data?.message || "Signup failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await loginUser(credentials);

      if (
        response.token
      ) {
        setAuthCookie(
          response.token
        );
      } else {
        console.error(" Token missing:", {
          token: response.token,
        });
      }

      toast.success("Welcome back! Login successful.");

      return {
        user: {
          _id: response.data?.id,
          name: response.data?.name,
          email: response.data?.email,
          phone: response.data?.phone,
          role: response.data?.role,
          isVerified: response.data?.isVerified,
          isActive: response.data?.isActive,
        },
        token: response.token,
      };
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";

      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const VerifyEmail = createAsyncThunk(
  "auth/VerifyEmail",
  async (data: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await verifyEmail(data);
      toast.success("Email verified successfully! You can now login.");
      return {
        message: response.message,
        email: data.email,
      };
    } catch (error: any) {
      const message = error.response?.data?.message || "Verification failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const resendVerification = createAsyncThunk(
  "auth/resendVerification",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await resendVerificationOTP(email);
      toast.success("New verification code sent to your email");
      return {
        message: response.message,
        email: email,
      };
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to resend verification code";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await profile();
      return response.user;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to fetch profile";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);


export const getAllUsersThunk = createAsyncThunk(
  "auth/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllUsers();

      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to fetch users";

      toast.error(message);

      return rejectWithValue(message);
    }
  },
);

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCreadentials: (
      state,
      action: PayloadAction<{ user: User; secretKey?: string }>,
    ) => {
      state.user = action.payload.user;
      state.error = null;
      state.isAuthenticated = true;
      
    },
    logout: (state) => {
      state.error = null;
      state.isAuthenticated = false;
      state.user = null;
      state.verificationEmail = null;
      toast.success("Logged out successfully");
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    

    setVerificationEmail: (state, action: PayloadAction<string>) => {
      state.verificationEmail = action.payload;
    },
    clearVerificationEmail: (state) => {
      state.verificationEmail = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        console.log("SIGNUP FULFILLED PAYLOAD:", action.payload);

        state.loading = false;
        state.verificationEmail = action.payload.email;
        state.error = null;

        console.log("VERIFICATION EMAIL SET:", state.verificationEmail);
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(VerifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(VerifyEmail.fulfilled, (state) => {
        state.loading = false;
        state.verificationEmail = null;
        state.error = null;
      })
      .addCase(VerifyEmail.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload as string;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
        removeAuthCookies();
      })
      .addCase(getAllUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })

      .addCase(getAllUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCreadentials,
  logout,
  setLoading,
  setError,
  setVerificationEmail,
  clearVerificationEmail,
  clearError,
} = AuthSlice.actions;
export default AuthSlice.reducer;
