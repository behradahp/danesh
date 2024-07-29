"use client";
import { redirect } from "next/navigation";

export const adminCheck = async () => {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");

  if(!access_token || !refresh_token) {
    return {
      success: false,
      error: "Unauthorize",
    }
  }

  await fetch("http://127.0.0.1:8000/auth/panel/", {
    method: "GET",
    headers: {
       'Authorization': `Bearer ${access_token}`,
    }
  })
  .then((response) => {
    if(response.status === 401) {
      throw new Error("Token Expired, Trying to refresh...");
    } else {
      return {
        success: true,
        error: "",
      }
    }
  })
  .catch((error) => {
    console.log(error);

    const tokenData = new FormData();
    tokenData.append("refresh", refresh_token!);

    fetch("http://127.0.0.1:8000/auth/token/refresh/", {
      method: "POST",
      body: tokenData,
    })
    .then((response) => {
      if(response.ok) return response.json();

      throw new Error("Refreshing token faild!");
    })
    .then((data) => {
      console.log("Data refreshed successfuly");
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      return {
        success: true,
        error: "",
      }
    })
    .catch((error) => {
      return {
        success: false,
        error: error,
      }
    })
  })

  // switch (method.toLowerCase()) {
  //   case "post":
  //     if (!data) {
  //       return {
  //         success: false,
  //         data: {},
  //         error: "data is empty",
  //       };
  //     }

  //     try {
  //       const response = axios.post(url, data, header);
  //       return {
  //         success: true,
  //         data: response,
  //         error: "",
  //       };
  //     } catch (err: any) {
  //       return {
  //         success: false,
  //         data: {},
  //         error: err.message,
  //       };
  //     }

  //   case "get":
  //     try {
  //       const response = axios.post(url, header);
  //       return {
  //         success: true,
  //         data: response,
  //         error: "",
  //       };
  //     } catch (err: any) {
  //       return {
  //         success: false,
  //         data: {},
  //         error: err.message,
  //       };
  //     }
  // }
}