"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Components
import ProductCard from "../common/cards/product_card";

// Icons
import LeftChevron from "../icons/left_chevron";

// Api
import { getDiscountProducts } from "@/app/actions/actions";

// Consts
import { url } from "@/app/constants/url";

export default function DiscountProducts() {
  const [isShowAllHovered, setIsShowAllHovered] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchDiscountProducts = async () => {
      const res = await getDiscountProducts({ limit: "5" });
      const data: Product[] = res.data;
      setProducts(data);
    };

    fetchDiscountProducts();
  }, []);

  return (
    <section className='flex flex-col gap-[45px] px-[45px] bg-[#8e64dc38] pt-[46.6px] pb-[64px]'>
      {/* Title */}
      <div className='w-full flex justify-between'>
        <span className='text-[30px] text-[#707070] font-YekanBakhMedium'>
          محصولات تخفیف دار
        </span>

        <Link
          href={""}
          className='flex items-center gap-[18px]'
          onMouseEnter={() => setIsShowAllHovered(true)}
          onMouseLeave={() => setIsShowAllHovered(false)}
        >
          <span
            className={`text-[20px] ${
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
        {products.map((item) => {
          return (
            <div key={item.id}>
              <ProductCard data={item} url={url}/>
            </div>
          );
        })}
      </div>
    </section>
  );
}
