import Image from "next/image";

// Components
import HeaderNavigations from "./header_navigation";
import HeaderSearchBox from "./heaedr_search_box";
import HeaderPhoneNumber from "./header_phone_number";

// Images
import logoImage from "@/public/images/logo.png";

// Icons
import UserIcon from "@/app/_components/icons/user_icon";
import PhoneIcon from "@/app/_components/icons/phone_icon";

import Link from "next/link";

export default function Header() {
  return (
    <header className='w-full pt-[20px] pl-[44px] pr-[63.4px]'>
      <div className='w-full flex flex-col gap-[31px] border-b border-b-[#707070] pb-[12.5px]'>
        {/* ------------------------------------------ First Row -------------------------------------------- */}
        <section className='flex justify-between items-center'>
          {/* Logo */}
          <div className='w-[201.56px] h-[40px]'>
            <Link href={"/"}>
              <Image
                src={logoImage}
                alt='logo'
                width={0}
                height={0}
                sizes='100vw'
                style={{ width: "100%", height: "100%" }}
              />
            </Link>
          </div>

          {/* Search Box */}
          <HeaderSearchBox />

          {/* Account Info */}
          <div className='w-[209px] h-[40px] flex justify-between items-center border border-[#707070] rounded-[5px] px-[10px] hover:bg-[#8e64dc46] cursor-pointer'>
            <span className='text-[16px] text-[#707070] font-YekanBakhMedium'>
              حساب کاربری
            </span>

            <UserIcon color='#A08CAF' />
          </div>
        </section>

        {/* ------------------------------------------ Second Row -------------------------------------------- */}
        <section className='flex justify-between items-center'>
          {/* Navigation */}
          <HeaderNavigations />

          {/* Phone Info */}
          <div className='flex items-center gap-[15px]'>
            <HeaderPhoneNumber />

            <PhoneIcon />
          </div>
        </section>
      </div>
    </header>
  );
}
