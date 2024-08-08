import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

// Icons
import DarkThemeIcon from "../icons/dark_theme_icon";

// Constants
import { url } from "@/app/constants/url";

export default function PanelHeader({ isUserPage }: { isUserPage: boolean }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const getProfile = async () => {
    const res = await axios.get(`${url}auth/updateUser/1/`);
    setProfile(res.data);
  };

  useEffect(() => {
    getProfile();

    const userJson = localStorage.getItem("user");

    if (userJson) setUser(JSON.parse(userJson));
  }, [localStorage.getItem("user")]);

  return (
    <header className='flex-shrink-0 w-[100%] h-[94px] flex justify-between items-center px-[20px] dsk:px-[100px] bg-white shadow-header'>
      <div className='flex gap-[20px]'>
        {/* ------------------------ Mobile Menu Icon ---------------------- */}
        <div className='dsk:hidden w-[48px] h-[48px] flex flex-col gap-[5px] justify-center items-center border border-[#EBEBEB] rounded-[10px]'>
          <div className='w-[70%] h-[3px] bg-black rounded-[100px]'></div>
          <div className='w-[70%] h-[3px] bg-black rounded-[100px]'></div>
          <div className='w-[70%] h-[3px] bg-black rounded-[100px]'></div>
        </div>

        {/* Admin Info */}
        <Link href={"/danesh_admin/user"}>
          <div
            className={` w-[200px] dsk:w-[240px] h-[48px] flex items-center gap-[10px] dsk:gap-[10px] pr-[22px] rounded-[10px] hover:border-2 hover:border-[#EBEBEB] hover:pr-[20px]`}
          >
            <div className='w-[45px] h-[45px]'>
              <Image
                loader={
                  profile
                    ? () => `${url}${profile.image}`
                    : () => `{url}api/image/user-default.png`
                }
                src={
                  profile
                    ? `${url}${profile.image}`
                    : `{url}api/image/user-default.png`
                }
                alt='user image'
                width={0}
                height={0}
                sizes='100vw'
                style={{ width: "100%", height: "100%" }}
              />
            </div>

            <span className='mt-[8px] text-[16px] text-black font-YekanBakhMedium'>
              {user ? user.username : "---"}
            </span>
          </div>
        </Link>
      </div>

      {/* ------------------------ Theme Icon ---------------------- */}
      <div className='w-[48px] h-[48px] flex justify-center items-center rounded-[10px] cursor-not-allowed'>
        <DarkThemeIcon />
      </div>
    </header>
  );
}
