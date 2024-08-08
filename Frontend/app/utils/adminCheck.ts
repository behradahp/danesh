"use client";

// Constants
import { url } from "@/app/constants/url";

export const adminCheck = async () => {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");

  if (!access_token || !refresh_token) {
    return {
      success: false,
      error: "Unauthorize",
    };
  }

  let output: {
    success: boolean,
    error: string
  } = {
    success: false,
    error: "",
  };

  await fetch(`${url}auth/panel/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then((response) => {
      if(response.ok) {
        output = {
          success: true,
          error: ""
        }
      } else {
        throw new Error("")
      }
    })
    .catch(() => {
      const tokenData = new FormData();
      tokenData.append("refresh", refresh_token!);

      fetch(`${url}auth/token/refresh/`, {
        method: "POST",
        body: tokenData,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("")
          }
        })
        .then((data) => {
          localStorage.setItem("access_token", data.access);
          localStorage.setItem("refresh_token", data.refresh);
          output = {
            success: true,
            error: "",
          };
        })
        .catch((error) => {
          output = {
            success: false,
            error: error,
          };
        });
    });

    return output
};
