import Link from "next/link";

// Svgs
import LenovoBrand from "@/app/_components/svgs/brands/lenovo";
import AppleBrand from "../svgs/brands/apple";
import XiaomiBrand from "../svgs/brands/xiaomi";
import DellBrand from "../svgs/brands/dell";
import AsusBrand from "../svgs/brands/asus";
import AcerBrand from "../svgs/brands/acer";

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
          <LenovoBrand />
        </Link>
        <Link href={""}>
          <AppleBrand />
        </Link>
        <Link href={""}>
          <XiaomiBrand />
        </Link>
        <Link href={""}>
          <DellBrand />
        </Link>
        <Link href={""}>
          <AsusBrand />
        </Link>
        <Link href={""}>
          <AcerBrand />
        </Link>
      </div>
    </section>
  );
}
