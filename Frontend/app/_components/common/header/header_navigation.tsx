import Link from "next/link";

// Components
import HeaderCategoryMenu from "./header_category_manu";

// Common Links
const COMMONLINKS = ["لپ تاپ", "گیمینگ", "ماوس و کیبورد", "هارد"];

export default function HeaderNavigations() {
  return (
    <nav className='flex items-center'>
      {/* Categories */}
      <HeaderCategoryMenu />

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
