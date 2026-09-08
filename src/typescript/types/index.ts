export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  password?:string,
  role: 'admin' | 'user';
  image?:string;
  isVerified: boolean;
  isActive: boolean;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: string;
  image: File| null;
 color: ("Red" | "Blue" | "Black")[];
  size: ("S" | "M" | "L" | "XL")[];
  createdAt?: string;
  updatedAt?: string
}

export interface AuthResponse {
  status: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    image:string;
    role:"user"|"admin";
    isVerified: boolean;
    isActive: boolean;
  };
  token: string,
}


export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  phone: string;
  password: string;
  image:string
}

export interface VerifyCredentials {
  email: string;
  otp: string;
}

export interface ProductCreateData {
  name: string;
  description: string;
  price: string;
  image: File |null;
  color:string[];
  size:string[];
}

export interface GetAllProductResponse {
  success: boolean;
  totalproduct: number;
  data: Product[];
  currentpage: number;
  totalpage: number;
  message?: string;
}

export interface ProductFilter {
  name?: string;
  minprice?: number | string;
  maxprice?: number | string;
  page?: number;
  limit?: number;
}