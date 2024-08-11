import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Images
import lenovoImage from "@/public/images/popular_brands/lenovo-1-logo-svgrepo-com.png";
import asusImage from "@/public/images/popular_brands/asus-6630-logo-svgrepo-com.png";
import xiaomiImage from "@/public/images/popular_brands/xiaomi-logo-svgrepo-com.png";
import dellImage from "@/public/images/popular_brands/dell-2-logo-svgrepo-com.png";
import appleImage from "@/public/images/popular_brands/apple-black-logo-svgrepo-com.png";
import samsungImage from "@/public/images/popular_brands/samsung-1-logo-svgrepo-com.png";

export default function PopularBrands() {
  return (
    <section className='flex flex-col gap-[45px] px-[45px]'>
      {/* Title */}
      <span className='text-[30px] text-[#707070] font-YekanBakhMedium'>
        برندهای محبوب
      </span>

      {/* Brands */}
      <div className='w-full flex justify-between items-center'>
        <Link href={""}>
          <Image src={lenovoImage} alt='brand' />
        </Link>
        <Link href={""}>
          <Image src={asusImage} alt='brand' />
        </Link>
        <Link href={""}>
          <Image src={xiaomiImage} alt='brand' />
        </Link>
        <Link href={""}>
          <Image src={dellImage} alt='brand' />
        </Link>
        <Link href={""}>
          <Image src={appleImage} alt='brand' />
        </Link>
        <Link href={""}>
          <Image src={samsungImage} alt='brand' />
        </Link>
      </div>
    </section>
  );
}
