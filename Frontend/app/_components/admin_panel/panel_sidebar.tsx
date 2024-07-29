import Image from "next/image";

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
    name: "اضافه کردن محصولات",
    icon: AddProductIcon,
    url: "",
  },
  {
    id: 4,
    name: "درباره ما",
    icon: AboutIcon,
    url: "/",
  },
];

export default function PanelSidebar({ section_id }: { section_id: string }) {
  return (
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
        onClick={() => logout()}
      >
        <LogoutIcon color='black' />

        <span className='text-[16px] text-black font-YekanBakhMedium'>
          خروج
        </span>
      </div>
    </aside>
  );
}
