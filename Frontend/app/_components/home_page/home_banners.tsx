import Image from "next/image";

// Images
import leftImage from "@/public/images/home_banners/left_banner_image.png";
import rightImage from "@/public/images/home_banners/right_banner_image.png";

export default function HomeBanners() {
  return (
    <section className='flex gap-[23px] px-[45px]'>
      {/* ------------------------------- Right Banner ----------------------------*/}
      <div className='w-[519px] h-[430px] flex flex-col justify-between items-center bg-gradient-to-b from-[#63469A] to-[#8D64DC] pt-[16px] pb-[32px] rounded'>
        <span className='text-[28px] text-white font-YekanBakhMedium'>
          خدمات نرم افزاری و سخت افزاری
        </span>

        <div className='w-[299px] h-[299px]'>
          <Image
            src={rightImage}
            alt='right_banner_image'
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <span className='text-[28px] text-white font-YekanBakhMedium'>
          بهترین قیمت بازار
        </span>
      </div>

      {/* ------------------------------- Left Banner ----------------------------*/}
      <div className='flex-grow h-[430px] flex flex-col justify-between items-center bg-gradient-to-b from-[#46326E] to-[#8D64DC] pt-[14px] pr-[19px] pb-[32px] pl-[40px] rounded'>
        <span className='w-full flex justify-start text-[28px] text-white font-YekanBakhMedium'>
          خدمات نرم افزاری و سخت افزاری
        </span>

        <div className='w-[583px] h-[291px]'>
          <Image
            src={leftImage}
            alt='right_banner_image'
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <span className='w-full flex justify-end text-[28px] text-white font-YekanBakhMedium'>
          بهترین قیمت بازار
        </span>
      </div>
    </section>
  );
}
