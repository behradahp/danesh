"use client";

// Constants
import { url } from "@/app/constants/url";

export async function urlToFile(imageUrl: string) {
  const requestOptions = {
    method: "GET",
  };

  const response = await fetch(
    `${url}api/image/${imageUrl.split("/").pop()}`,
    requestOptions
  );

  let blob = await response.blob();
  const imageName = imageUrl.split("/").pop();
  const fileExtension = imageUrl
    .split("")
    .reverse()
    .join("")
    .split(".")[0]
    .split("")
    .reverse()
    .join("");
  const type = `image/${fileExtension}`;
  return new File([blob], imageName!, { type });
}
