"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Components
import ProductCard from "../common/cards/product_card";

// Icons
import LeftChevron from "../icons/left_chevron";

// Api
import { getNewestProducts } from "@/app/actions/actions";

// Consts
import { url } from "@/app/constants/url";

export default function NewestProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isShowAllHovered, setIsShowAllHovered] = useState<boolean>(false);

  useEffect(() => {
    const fetchNewestProducts = async () => {
      const res = await getNewestProducts();
      const data: Product[] = res.data;
      setProducts(data);
    };

    fetchNewestProducts();
  }, []);

  return (
    <section className='flex flex-col gap-[31px] px-[45px]'>
      {/* Title */}
      <div className='w-full flex justify-between'>
        <span className='text-[24px] text-[#707070] font-YekanBakhMedium'>
          جدیدترین محصولات
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
