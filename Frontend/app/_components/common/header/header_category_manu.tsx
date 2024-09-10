"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Icons
import MenuIcon from "@/app/_components/icons/menu_icon";
import DesktopModal from "../modals/desktop_modal";

// Api
import { getCategories } from "@/app/actions/actions";

export default function HeaderCategoryMenu() {
  const [isCategoryMenuHoverd, setIsCategoryMenuHoverd] =
    useState<boolean>(false);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      const data: Category[] = res.data;
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div
        className='w-[128px] flex justify-between items-center ml-[16px] cursor-pointer'
        onMouseEnter={() => setIsCategoryMenuHoverd(true)}
        onMouseLeave={() => setIsCategoryMenuHoverd(false)}
        onClick={() => setIsMenuOpen(true)}
      >
        <MenuIcon color={isCategoryMenuHoverd ? "#8D64DC" : undefined} />

        <span
          className={`text-[18px] ${
            isCategoryMenuHoverd ? "text-[#8D64DC]" : "text-[#707070]"
          } font-YekanBakhMedium`}
        >
          دسته بندی ها
        </span>
      </div>

      <DesktopModal
        isOpen={isMenuOpen}
        handleCloseModal={() => setIsMenuOpen(false)}
        title=''
      >
        <div className='w-[518px] flex flex-col gap-[10px] py-[14px] px-[16px]'>
          <Link href='' className="hover:bg-[#8e64dc46] p-[5px] rounded">
            <span className='text-[18px] text-[#707070] font-YekanBakhMedium'>
              همه محصولات
            </span>
          </Link>

          {categories.map((item) => {
            return (
              <Link href='' key={item.id}>
                <div className='flex  gap-[18px] hover:bg-[#8e64dc46] p-[5px] rounded'>
                  <div
                    className='Container mt-[5px]'
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  ></div>

                  <span className='text-[18px] text-[#707070] font-YekanBakhMedium'>
                    {item.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </DesktopModal>
    </>
  );
}
