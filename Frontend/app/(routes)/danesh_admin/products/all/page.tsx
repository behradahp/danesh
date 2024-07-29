"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Audio } from "react-loader-spinner";

// Components
import PanelLayout from "@/app/_components/admin_panel/panel_layout";
import ProductCard from "@/app/_components/common/product_card";

// Icons
import SearchIcon from "@/app/_components/icons/search_icon";
import LeftChevron from "@/app/_components/icons/left_chevron";
import ProductEditIcon from "@/app/_components/icons/product_edit_icon";
import ProductAdminIcon from "@/app/_components/icons/product_admin_icon";

// api
import { getCategories, getProducts } from "@/app/actions/actions";

export default function AllProducts() {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const res = await getCategories();

      setLoading(false);

      setCategories(res.data);
    };

    fetchCategories();

    const fetchProducts = async () => {
      setLoading(true);
      const res = await getProducts();

      setLoading(false);

      setProducts(res.data);
    };

    fetchProducts();
  }, []);

  return (
    <PanelLayout section_id='2'>
      <div className='flex-grow w-[100%] pt-[26px] px-[30px] dsk:px-[62px] overflow-y-auto'>
        {/* ---------------------------- Title & Search ----------------------------------- */}
        <div className='flex items-center gap-[280px]'>
          <span className='text-[24px] text-back font-YekanBakhBold'>
            محصولات
          </span>

          <div className='w-[382px] h-[48px] flex items-center px-[20px] bg-white rounded-[10px]'>
            <input
              type='text'
              className='flex-grow outline-none placeholder:text-[16px] placeholder:text-[#263238] placeholder:font-YekanBakhMedium text-[16px] text-[#263238] font-YekanBakhMedium'
              placeholder='جستجو'
            />

            <SearchIcon color='black' />
          </div>
        </div>

        <div className='h-[35px]'></div>

        {/* ---------------------------- All Products ---------------------------- */}
        <div className='flex justify-between items-center mb-[10px]'>
          <span className='text-[16px] text-[#263238] font-YekanBakhMedium'>
            همه‌ محصولات
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

        {loading ? (
          <Audio height={20} width={20} color='black' />
        ) : products && products.length != 0 ? (
          <div className='w-full flex flex-wrap gap-[22px]'>
            {products?.map((product, index) => {
              if (index < 5) {
                return (
                  <div key={product.id.toString()}>
                    <ProductCard data={product} />
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <span className='text-[18px] text-[#2632389b] font-YekanBakhMedium'>
            هنوز هیچ محصولی به سایت اضافه نشده است!
          </span>
        )}

        <div className='h-[30px]'></div>

        {/* ---------------------------- Category Products ---------------------------- */}
        {loading ? (
          <Audio height={20} width={20} color='black' />
        ) : categories && categories.length != 0 ? (
          categories.map((item) => {
            let productIndex = 0;
            return (
              <>
                <div key={item.id.toString()}>
                  <div className='flex justify-between items-center mb-[10px]'>
                    <span className='text-[16px] text-[#263238] font-YekanBakhMedium'>
                      {item.name}
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

                  {products &&
                  products.filter((product) => product.category_id == item.id)
                    .length != 0 ? (
                    <div className='w-full flex flex-wrap gap-[22px]'>
                      {products?.map((product) => {
                        if (product.category_id == item.id) {
                          if (productIndex < 5) {
                            productIndex += 1;
                            return (
                              <div key={product.id.toString()}>
                                <ProductCard data={product} />
                              </div>
                            );
                          }
                        }
                      })}
                    </div>
                  ) : (
                    <span className='text-[18px] text-[#2632389b] font-YekanBakhMedium'>
                      محصولی در این دسته بندی وجود ندارد!
                    </span>
                  )}
                </div>

                <div className='h-[30px]'></div>
              </>
            );
          })
        ) : (
          <span className='text-[18px] text-[#2632389b] font-YekanBakhMedium'>
            هنوز هیچ دسته بندی به سایت اضافه نشده است!
          </span>
        )}
      </div>
    </PanelLayout>
  );
}
