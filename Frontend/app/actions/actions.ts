'use server'

import axios from "axios";
import { cookies } from "next/headers";

// Create an axios instance
const apiInstance = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

interface ResponseType<T> {
    data: T,
    status: Number,
}

export const adminLogin = async (data: { username: string; password: string }) => {
    try {
        const response: ResponseType<Login> = await apiInstance.post("auth/admin/login", data);
        cookies().set("access_token", response.data.access);
        cookies().set("refresh_token", response.data.refresh);
        
        return {
            success: true,
            message: "ورود موفقیت آمیز بود.",
        };
    } catch(err: any) {
        if(err.response && err.response.status == 401) {
            return {
                success: false,
                message: "نام کاربری یا رمز عبور نادرست است!",
            };
        }
        return {
            success: false,
            message: "خطایی ناشناخته رخ داد است!",
        };
    }
    
};
