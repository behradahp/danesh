"use client";

import { useState } from "react";
import Link from "next/link";

// Components
import ProductCard from "../common/cards/product_card";

// Icons
import LeftChevron from "../icons/left_chevron";

// Sample Products
const product: Product = {
  id: 1,
  category_id: 1,
  name: "لپ تاپ لنوو مدل legion Y530",
  description: "string",
  discount: 0,
  price: 50000000,
  main_image: "https://daneshapi.liara.run/media/1_QshXgGu.webp",
  discount_price: "50000000",
  images: [],
  attributes: [],
  published_date: "",
  admin_username: "",
  last_update_date: "",
  lats_update_admin_username: "",
};

export default function SuggestedProducts() {
  const [isShowAllHovered, setIsShowAllHovered] = useState<boolean>(false);

  return (
    <section className='flex flex-col gap-[31px] px-[45px]'>
      {/* Title */}
      <div className='w-full flex justify-between'>
        <span className='text-[24px] text-[#707070] font-YekanBakhMedium'>
          محصولات پیشنهادی
        </span>

        <Link
          href={""}
          className='flex items-center gap-[18px]'
          onMouseEnter={() => setIsShowAllHovered(true)}
          onMouseLeave={() => setIsShowAllHovered(false)}
        >
          <span
            className={`text-[24px] ${
              isShowAllHovered ? "text-[#8D64DC]" : "text-[#707070]"
            } font-YekanBakhMedium mt-[4px]`}
          >
            مشاهده همه
          </span>

          <LeftChevron color={isShowAllHovered ? "#8D64DC" : "#707070"} />
        </Link>
      </div>

      {/* Products */}
      <div className='w-full flex gap-[24px]'>
        <ProductCard data={product} />
        <ProductCard data={product} />
        <ProductCard data={product} />
        <ProductCard data={product} />
        <ProductCard data={product} />
      </div>
    </section>
  );
}
