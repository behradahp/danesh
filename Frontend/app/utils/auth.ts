"use client";

import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { redirect } from "next/navigation";

// Constants
import {url} from "@/app/constants/url";

// Create an axios instance
const apiInstance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

interface ResponseType<T> {
  data: T;
  status: number;
}

interface UserData extends JwtPayload {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  image: string;
  email: string;
  phone: string;
}

export const adminLogin = async (data: {
  username: string;
  password: string;
}) => {
  try {
    const response: ResponseType<Login> = await apiInstance.post(
      "auth/admin/login",
      data
    );
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);

    const userData: UserData = jwtDecode(response.data.access);

    return {
      success: true,
      message: "ورود موفقیت آمیز بود.",
      data: userData,
    };
  } catch (err: any) {
    if (err.response && err.response.status == 401) {
      return {
        success: false,
        message: "نام کاربری یا رمز عبور نادرست است!",
        data: null,
      };
    }
    return {
      success: false,
      message: "خطایی ناشناخته رخ داد است!",
      data: null,
    };
  }
};

export const logout = () => {
  try {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return true;
  } catch(err) {
    return false;
  }
};