"use client";

import { useState } from "react";

// api
import datas from "./data";
import { createProduct } from "../actions/actions";

export default function Home() {
  const handleAddProduct = async () => {
    for (let data of datas) {
      let productData = new FormData();

      productData.append("category_id", "2");
      productData.append("name", data.attributes.title_fa);
      productData.append(
        "description",
        data.attributes.description
          ? data.attributes.description
          : " No description"
      );
      productData.append("price", data.attributes.main_price.toString());

      productData.append("main_image", data.attributes.featured_image[0]);

      for (let image of data.attributes.images) {
        productData.append("images", image);
      }

      const res = await createProduct(productData);
    }
  };

  const token = async () => {
    console.log("token")
    await fetch(
      "http://192.168.0.7:8000/auth/token/refresh/",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refresh:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNjU5MDA5MSwiaWF0IjoxNzIyMjcwMDkxLCJqdGkiOiJjNTJiMGEyZDAzMTQ0ZjIwOTM3MzI2MjRlNGY0MDNkYyIsInVzZXJfaWQiOjEsImZpcnN0X25hbWUiOiIiLCJsYXN0X25hbWUiOiIiLCJ1c2VybmFtZSI6ImJlaHJhZGFocCIsImVtYWlsIjoiYmVoLmFmc2hhcmlwb3JAZ21haWwuY29tIiwiaW1hZ2UiOiJkZWZhdWx0LmpwZyJ9.N4woUW2wFexoYqPOfndneAulxELxdf0CUmEqyO2NmNs"
        }),
      }
    )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })

  }

  return (
    <div>
      <button onClick={() => token()}>get</button>
    </div>
  );
}
