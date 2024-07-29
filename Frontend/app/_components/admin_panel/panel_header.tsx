// Icons
import { useEffect, useState } from "react";
import DarkThemeIcon from "../icons/dark_theme_icon";
import UserIcon from "../icons/user_icon";

export default function PanelHeader() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userJson = localStorage.getItem("user");

    if(userJson) setUser(JSON.parse(userJson));
  }, []);

  return (
    <header className='flex-shrink-0 w-[100%] h-[94px] flex justify-between items-center px-[20px] dsk:px-[100px] bg-white'>
      <div className='flex gap-[20px]'>
        {/* ------------------------ Mobile Menu Icon ---------------------- */}
        <div className='dsk:hidden w-[48px] h-[48px] flex flex-col gap-[5px] justify-center items-center border border-[#EBEBEB] rounded-[10px]'>
          <div className='w-[70%] h-[3px] bg-black rounded-[100px]'></div>
          <div className='w-[70%] h-[3px] bg-black rounded-[100px]'></div>
          <div className='w-[70%] h-[3px] bg-black rounded-[100px]'></div>
        </div>

        {/* Admin Info */}
        <div className='w-[200px] dsk:w-[240px] h-[48px] flex items-center gap-[10px] dsk:gap-[37px] pr-[22px] border border-[#EBEBEB] rounded-[10px] cursor-not-allowed'>
          <UserIcon color='black' />

          <span className='text-[16px] text-black font-YekanBakhMedium'>
            {user ? user.username : "---"}
          </span>
        </div>
      </div>

      {/* ------------------------ Theme Icon ---------------------- */}
      <div className='w-[48px] h-[48px] flex justify-center items-center border border-[#EBEBEB] rounded-[10px] cursor-not-allowed'>
        <DarkThemeIcon />
      </div>
    </header>
  );
}
