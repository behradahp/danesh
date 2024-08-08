'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Images
import logo from "@/public/images/logo.png";

// Icons
import DashboardIcon from "@/app/_components/icons/dashboard_icon";
import ShowProductsIcon from "@/app/_components/icons/show_products_icon";
import AddProductIcon from "@/app/_components/icons/add_product_icon";
import AboutIcon from "@/app/_components/icons/about_icon";
import LogoutIcon from "@/app/_components/icons/logout_icon";

// api
import { logout } from "@/app/utils/auth";
import Link from "next/link";

// Interfaces
interface Section {
  id: Number;
  name: string;
  icon: ({ color }: { color: string }) => React.JSX.Element;
  url: string;
}

// Const Variables
const sections: Section[] = [
  {
    id: 1,
    name: "داشبورد",
    icon: DashboardIcon,
    url: "/danesh_admin/dashboard",
  },
  {
    id: 2,
    name: "مشاهده محصولات",
    icon: ShowProductsIcon,
    url: "/danesh_admin/products/all",
  },
  {
    id: 3,
    name: "اضافه کردن محصول",
    icon: AddProductIcon,
    url: "/danesh_admin/products/add",
  },
  {
    id: 4,
    name: "درباره ما",
    icon: AboutIcon,
    url: "/danesh_admin/about",
  },
];

export default function PanelSidebar({ section_id }: { section_id: string }) {
  const router = useRouter();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

  const handleLogout = () => {
    const res = logout();

    if(res) {
      router.push("/auth/admin_login");
    }
  }
  
  return (
    <>
    <aside className='hidden w-[307px] h-[100vh] dsk:flex flex-col items-center bg-white pt-[40px] pb-[52px] shadow-default'>
      {/* ------------------------ Logo ---------------------- */}
      <Image src={logo} alt='logo' />

      {/* ------------------------ Sections ---------------------- */}
      <section className='flex flex-col gap-[20px] mt-[54px]'>
        {sections.map((item) => {
          return (
            <Link key={item.id.toString()} href={item.url}>
              <div
                className={`w-[240px] h-[48px] flex items-center gap-[38px] pr-[21px] rounded-[10px] cursor-pointer ${
                  section_id === item.id.toString()
                    ? "bg-[#C6D7FF]"
                    : "hover:bg-[#c6d7ff50]"
                }`}
              >
                <item.icon
                  color={`${
                    section_id === item.id.toString() ? "#007DFC" : "black"
                  }`}
                />

                <span className='text-[16px] text-black font-YekanBakhMedium'>
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </section>

      {/* ------------------------ Logout ---------------------- */}
      <div className='flex-grow'></div>
      <div
        className={`w-[240px] h-[48px] flex items-center gap-[38px] pr-[21px] rounded-[10px] cursor-pointer hover:bg-[#c6d7ff50]`}
        onClick={() => setIsLogoutModalOpen(true)}
      >
        <LogoutIcon color='black' />

        <span className='text-[16px] text-black font-YekanBakhMedium'>
          خروج
        </span>
      </div>
    </aside>

    <div className={`${isLogoutModalOpen ? '' : 'hidden'} absolute inset-0 w-fll h-full flex justify-center items-center bg-black/30 z-[100000000]`}>
        <div className="w-[480px] h-[199px] flex flex-col items-center gap-[49px] py-[37px] px-[55px] bg-white border-1 border-[#707070]">
          <span className="text-[16px] text-black font-YekanBakhMedium">آیا از خروج از حساب کاربری اطمینان داربد؟</span>

          <div className="w-full flex justify-between">
            <button className="w-[169px] h-[35px] flex justify-center items-center rounded-[10px] border border-[#707070] font-YekanBakhMedium" onClick={() => setIsLogoutModalOpen(false)}>انصراف</button>
            <button className="w-[169px] h-[35px] flex justify-center items-center rounded-[10px] bg-[#6695FF] text-white font-YekanBakhMedium" onClick={handleLogout}>تایید</button>
          </div>
        </div>
    </div>
    </>
  );
}
