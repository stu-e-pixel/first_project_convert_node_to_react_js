/* eslint-disable @typescript-eslint/no-explicit-any */
import {createAsyncThunk} from "@reduxjs/toolkit"
// import {User} from "./types"
import type {logincreadential,registerdata} from "../../api/endpoints/authApi"
import {authApi} from "../../api/endpoints/authApi"


export const loginUser = createAsyncThunk(
    'auth/login',
    async(credentials:logincreadential,{rejectWithValue})=>{
        try {
            const response = await authApi.login(credentials)
            return response.data
            
        } catch (error:any) {
            return rejectWithValue(error.response?.data?.message || "login failed")
        }
    }
)

export const registerUser=createAsyncThunk(
    'auth/register',
    async(data:registerdata,{rejectWithValue})=>{
        try {
            const response  = await authApi.register(data)
            return response.data
            
        } catch (error:any) {
            return rejectWithValue(error.response?.data?.message || "register faild")
        }
    }
)

export const logoutUser=createAsyncThunk(
    'auth/logout',
    async(_,{rejectWithValue})=>{
        try {
            await authApi.logout();
            localStorage.removeItem('token')
        } catch (error:any) {
            return rejectWithValue(error.response?.data?.message || "logout faild")
        }
    }
)