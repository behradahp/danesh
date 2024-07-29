"use client";

// Components
import PanelLayout from "@/app/_components/admin_panel/panel_layout";
import CategoryIcon from "@/app/_components/icons/category_icon";
import { useEffect, useState } from "react";

// api
import { productsCategoryCount } from "@/app/actions/actions";

export default function AdminDashboard() {
  const [categories, setCategories] = useState<ProductCount | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const res = await productsCategoryCount();
      setLoading(false);

      setCategories(res.data);
    };

    fetchCategories();
  }, []);

  return (
    <PanelLayout section_id='1'>
      <div className='flex-grow w-[100%] pt-[26px] px-[30px] dsk:px-[62px] overflow-y-auto'>
        {/* ---------------------------- Title ----------------------------------- */}
        <span className='text-[24px] text-back font-YekanBakhBold'>
          داشبورد
        </span>

        <div className='h-[35px]'></div>

        {/* ---------------------------- Products Count ----------------------------------- */}
        <div className='max-w-[100%] flex gap-[10px] overflow-x-auto pb-[8px]'>
          {loading ? (
            <div>LOADING...</div>
          ) : categories ? (
            <>
              {categories.all != 0 ? (
                <div className='flex-shrink-0 w-[200px] h-[60px] flex justify-between items-center bg-white rounded-[8px] px-[10px] shadow-default'>
                  {/* ---------------------------- Icon ----------------------------------- */}
                  <div
                    className={`w-[30px] h-[30px] flex justify-center rounded-[100px]`}
                    style={{ backgroundColor: "#606036" }}
                  >
                    <CategoryIcon color='white' />
                  </div>

                  {/* ---------------------------- Category Info ----------------------------------- */}
                  <div dir='ltr' className='flex flex-col'>
                    <span className='text-[14px] text-[#0000009a] font-YekanBakhMedium'>
                      کل محصولات
                    </span>
                    <span className='text-[18px] font-YekanBakhBold'>
                      {categories.all.toString()}
                    </span>
                  </div>
                </div>
              ) : (
                <></>
              )}
              {categories.categories.map((item, index) => {
                return (
                  <div
                    key={index}
                    className='flex-shrink-0 w-[200px] h-[60px] flex justify-between items-center bg-white rounded-[8px] px-[10px] shadow-default'
                  >
                    {/* ---------------------------- Icon ----------------------------------- */}
                    <div
                      className={`w-[30px] h-[30px] flex justify-center rounded-[100px]`}
                      style={{ backgroundColor: item.color }}
                    >
                      <CategoryIcon color='white' />
                    </div>

                    {/* ---------------------------- Category Info ----------------------------------- */}
                    <div dir='ltr' className='flex flex-col'>
                      <span className='text-[14px] text-[#0000009a] font-YekanBakhMedium'>
                        {item.name}
                      </span>
                      <span className='text-[18px] font-YekanBakhBold'>
                        {item.count.toString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div>FAILED</div>
          )}
        </div>

        <div className='h-[46px]'></div>

        {/* ---------------------------- Notes & Calendar ---------------------------- */}
        <div className='w-[100%] flex gap-[20px]'>
          {/* ---------------------------- Notes ---------------------------- */}
          <div className='w-[450px] p-[20px] bg-white rounded-[10px]'>
            <span className='tet-[16px] font-YekanBakhMedium'>یادداشت ها</span>

            <textarea
              name=''
              id=''
              className='min-h-[253px] w-full border border-[#EBEBEB] rounded-[10px] p-[10px]'
            />
          </div>
        </div>
      </div>
    </PanelLayout>
  );
}
