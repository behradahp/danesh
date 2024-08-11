/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Audio } from "react-loader-spinner";
import useClickOutside from "@/app/hooks/useClickOutside";

// Constants
import { url } from "@/app/constants/url";

// Components
import PanelLayout from "@/app/_components/admin_panel/panel_layout";
import ProductCard from "@/app/_components/common/cards/admin_product_card";

// Icons
import SearchIcon from "@/app/_components/icons/search_icon";
import LeftChevron from "@/app/_components/icons/left_chevron";
import SortIcon from "@/app/_components/icons/sort_icon";

// api
import { getProducts } from "@/app/actions/actions";

export default function CategoryProducts() {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[] | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[] | null>(null);

  const [sortOptionValue, setSortOptionValue] = useState<string | null>(null);
  const [isSortOptionsOpen, setIsSortOptionsOpen] = useState<boolean>(false);
  const [sortResult, setSortResult] = useState<Product[] | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await getProducts();

      setLoading(false);

      setProducts(res.data);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults(null);
      return;
    }

    const timeout = setTimeout(() => {
      setSortOptionValue(null);
      const results: Product[] = products!.filter((item) =>
        item.name.includes(searchQuery)
      );

      console.log(results);

      setSearchResults(results);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  useEffect(() => {
    console.log(sortOptionValue);

    if (!sortOptionValue) {
      setSortResult(undefined);
      return;
    }

    switch (sortOptionValue) {
      case "جدیدترین":
        const result = products?.toSorted(
          (a, b) => Date.parse(b.published_date) - Date.parse(a.published_date)
        );
        setSortResult(result);
        break;
      case "ارزان ترین":
        const result1 = products?.toSorted(
          (a, b) => Number(a.discount_price) - Number(b.discount_price)
        );
        setSortResult(result1);
        break;
      case "گران ترین":
        const result2 = products?.toSorted(
          (a, b) => Number(b.price) - Number(a.price)
        );
        setSortResult(result2);
        break;
    }
  }, [sortOptionValue]);

  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    setIsSortOptionsOpen(false);
  });

  return (
    <PanelLayout section_id='2'>
      <div className='flex-grow w-[100%] pt-[26px] px-[30px] dsk:px-[62px] overflow-y-auto'>
        {/* ---------------------------- Title & Search & Sort ----------------------------------- */}
        <div className='w-full flex items-center justify-between'>
          <span className='text-[24px] text-back font-YekanBakhBold'>
            محصولات
          </span>

          <div className='flex gap-[22px]'>
            {/* ---------------------------- Search ----------------------------------- */}
            <div className='w-[382px] h-[48px] flex items-center px-[20px] bg-white rounded-[10px]'>
              <input
                type='text'
                className='flex-grow outline-none placeholder:text-[16px] placeholder:text-[#263238] placeholder:font-YekanBakhMedium text-[16px] text-[#263238] font-YekanBakhMedium'
                placeholder='جستجو'
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <SearchIcon color='black' />
            </div>

            {/* ---------------------------- Sort ----------------------------------- */}
            <div
              className='relative w-[382px] h-[48px] flex items-center justify-between px-[20px] bg-white rounded-[10px] cursor-pointer'
              onClick={() => setIsSortOptionsOpen((prev) => !prev)}
              ref={ref}
            >
              <span className='text-[16px] text-[#263238] font-YekanBakhMedium cursor-pointer'>
                {sortOptionValue ?? "مرتب کردن"}
              </span>

              <SortIcon />

              {/* Options */}
              <div
                className={`${
                  isSortOptionsOpen ? "" : "hidden"
                } absolute left-0 top-[50px] w-[382px] h-[124px] flex flex-col justify-between bg-white py-[16px] px-[30px] shadow-default`}
              >
                <span
                  className={`${
                    sortOptionValue ? "" : "hidden"
                  } text-[12px] text-red-700 font-YekanBakhMedium cursor-pointer`}
                  onClick={() => setSortOptionValue(null)}
                >
                  حذف
                </span>
                <div
                  className='w-full rounded-[7px] pr-[5px] hover:bg-[#C6D7FF]'
                  onClick={() => setSortOptionValue("جدیدترین")}
                >
                  <span className='text-[16px] text-[#263238] font-YekanBakhMedium'>
                    جدیدترین
                  </span>
                </div>
                <div
                  className='w-full rounded-[7px] hover:bg-[#C6D7FF] pr-[5px]'
                  onClick={() => setSortOptionValue("ارزان ترین")}
                >
                  <span className='text-[16px] text-[#263238] font-YekanBakhMedium'>
                    ارزان ترین
                  </span>
                </div>
                <div
                  className='w-full rounded-[7px] hover:bg-[#C6D7FF] pr-[5px]'
                  onClick={() => setSortOptionValue("گران ترین")}
                >
                  <span className='text-[16px] text-[#263238] font-YekanBakhMedium'>
                    گران ترین
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='h-[35px]'></div>

        {/* ---------------------------- Search Results ----------------------------------- */}
        <div className={`${searchResults ? "" : "hidden"}`}>
          <div className='flex justify-between items-center mb-[10px]'>
            <span className='text-[16px] text-[#263238] font-YekanBakhMedium'>
              نتیجه جستجو
            </span>

            <Link href={""}>
              <div className='flex items-center gap-[10px]'>
                <span className='text-[16px] text-[#263238] font-YekanBakhMedium'>
                  مشاهده همه{" "}
                </span>
                <LeftChevron color='#263238' />
              </div>
            </Link>
          </div>

          <div className='w-full flex flex-wrap gap-[22px]'>
            {searchResults?.length != 0 ? (
              searchResults?.map((item, index) => {
                if (index < 10) {
                  return (
                    <div key={item.id.toString()}>
                      <ProductCard data={item} />
                      <span>111</span>
                    </div>
                  );
                }
              })
            ) : (
              <span className='text-[18px] text-[#2632389b] font-YekanBakhMedium'>
                محصولی پیدا نشد!
              </span>
            )}
          </div>
        </div>

        {/* ---------------------------- Products ----------------------------------- */}
        <div className={`${searchResults ? "hidden" : ""}`}>
          {/* ---------------------------- All Products ---------------------------- */}
          {loading ? (
            <Audio height={20} width={20} color='black' />
          ) : sortResult ? (
            <div className='w-full flex flex-wrap gap-[22px]'>
              {sortResult?.map((product) => {
                return (
                  <div key={product.id.toString()}>
                    <ProductCard data={product} />
                  </div>
                );
              })}
            </div>
          ) : products && products.length != 0 ? (
            <div className='w-full flex flex-wrap gap-[22px]'>
              {products?.map((product) => {
                return (
                  <div key={product.id.toString()}>
                    <ProductCard data={product} />
                  </div>
                );
              })}
            </div>
          ) : (
            <span className='text-[18px] text-[#2632389b] font-YekanBakhMedium'>
              این دسته بندی محصولی ندارد!
            </span>
          )}
        </div>
      </div>
    </PanelLayout>
  );
}
