"use client";

import { useState } from "react";

// api
import datas from "./data";
import { createProduct } from "../actions/actions";

export default function Home() {
  // const handleAddProduct = async () => {
  //   for (let data of datas) {
  //     let productData = new FormData();

  //     productData.append("category_id", "2");
  //     productData.append("name", data.attributes.title_fa);
  //     productData.append(
  //       "description",
  //       data.attributes.description
  //         ? data.attributes.description
  //         : " No description"
  //     );
  //     productData.append("price", data.attributes.main_price.toString());

  //     productData.append("main_image", data.attributes.featured_image[0]);

  //     for (let image of data.attributes.images) {
  //       productData.append("images", image);
  //     }

  //     const res = await createProduct(productData);
  //   }
  // };

  return (
    <div>
      {/* <button onClick={() => handleAddProduct()}>get</button> */}
    </div>
  );
}
