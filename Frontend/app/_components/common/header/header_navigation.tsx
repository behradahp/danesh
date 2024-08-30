"use client";

import { useState } from "react";
import Link from "next/link";

// Icons
import MenuIcon from "@/app/_components/icons/menu_icon";

// Common Links
const COMMONLINKS = ["لپ تاپ", "گیمینگ", "ماوس و کیبورد", "هارد"];

export default function HeaderNavigations() {
  const [isCategoryMenuHoverd, setIsCategoryMenuHoverd] =
    useState<boolean>(false);

  return (
    <nav className='flex items-center'>
      {/* Categories */}
      <div
        className='w-[128px] flex justify-between items-center ml-[16px] cursor-pointer'
        onMouseEnter={() => setIsCategoryMenuHoverd(true)}
        onMouseLeave={() => setIsCategoryMenuHoverd(false)}
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

      {/* Common Links */}
      <div className='flex gap-[25px] pr-[16px] border-r border-r-[#707070]'>
        {COMMONLINKS.map((item, index) => {
          return (
            <Link key={index} href={"#"}>
              <span className='text-[18px] text-[#707070] font-YekanBakhMedium hover:text-[#8D64DC]'>
                {item}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
