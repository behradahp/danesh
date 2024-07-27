"use server";

import { cookies } from "next/headers";

import axios from "axios";

interface ResponseType {
  data: any;
  status: Number;
}

export default async function authFetch(
  url: string,
  method: string,
  data?: any
) {
  const access_token = cookies().get("access_token");
  const refresh_token = cookies().get("refresh_token");

  //  Check if token is exist
  if (!access_token) {
    return {
      success: false,
      data: {},
      error: "Unauthorized",
    };
  }

  const header = {
    headers: { Authorization: `Bearer ${access_token!.value}` },
  };

  //  Check if token expired
  try {
    await axios.get("http://localhost:8000/auth/panel/", header);
  } catch (err) {
    const tokenData = new FormData();
    tokenData.append("refresh", refresh_token!.value);

    try {
      const tokenResponse = await axios.post('http://localhost:8000/auth/token/refresh/', {
        refresh: refresh_token?.value
      });

      // header.headers = { Authorization: `Bearer ${tokenResponse.data.access}` };
      cookies().set("access_token", tokenResponse.data.access);
      cookies().set("refresh_token", tokenResponse.data.refresh);
    } catch (err: any) {
      return {
        success: false,
        data: 1,
        error: err.response.data,
      };
    }
  }

  switch (method.toLowerCase()) {
    case "post":
      if (!data) {
        return {
          success: false,
          data: {},
          error: "data is empty",
        };
      }

      try {
        const response = axios.post(url, data, header);
        return {
          success: true,
          data: response,
          error: "",
        };
      } catch (err: any) {
        return {
          success: false,
          data: {},
          error: err.message,
        };
      }

    case "get":
      try {
        const response = axios.post(url, header);
        return {
          success: true,
          data: response,
          error: "",
        };
      } catch (err: any) {
        return {
          success: false,
          data: {},
          error: err.message,
        };
      }
  }
}
