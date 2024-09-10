import "./globals.css";
import { ToastContainer } from "react-toastify";
import Image from "next/image";
import NextTopLoader from 'nextjs-toploader';

import mobileUnavailable from "@/public/images/mobile_unavailable.jpg";

import {
  YekanBakhBold,
  YekanBakhFat,
  YekanBakhHairHeavy,
  YekanBakhHairLight,
  YekanBakhHairline,
  YekanBakhHairMedium,
  YekanBakhHairRegular,
  YekanBakhHairThin,
} from "@/fonts";

const fonts = [
  YekanBakhBold,
  YekanBakhFat,
  YekanBakhHairline,
  YekanBakhHairHeavy,
  YekanBakhHairLight,
  YekanBakhHairMedium,
  YekanBakhHairRegular,
  YekanBakhHairThin,
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='fa'
      dir='rtl'
      className={`${fonts.map((f) => f.variable).join(" ")}`}
    >
      <body>
        <ToastContainer />
        <NextTopLoader />
        <div className='hidden dsk:block'>{children}</div>

        <div className='dsk:hidden w-[100vw] h-[100vh] flex flex-col gap-[50px] justify-center items-center'>
          <div className='w-[95%] h-[345px]'>
            <Image
              src={mobileUnavailable}
              alt='mobileUnavailable'
              width={0}
              height={0}
              sizes='100vw'
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          <div className="flex flex-col items-center">
            <span className='text-[25px] font-YekanBakhMedium'>
              نسخه موبایل فعلا در دسترس نیست!
            </span>
            <span className='text-[30px] font-YekanBakhHeavy'>به زودی...</span>
          </div>
        </div>
      </body>
    </html>
  );
}
