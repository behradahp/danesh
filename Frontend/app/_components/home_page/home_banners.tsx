import Image from "next/image";

// Images
import leftImage from "@/public/images/home_banners/Designer.jpg";
import rightImage from "@/public/images/home_banners/Designer (5).jpg";

export default function HomeBanners() {
  return (
    <section className='flex gap-[23px] px-[45px]'>
      {/* ------------------------------- Right Banner ----------------------------*/}
      <div className='w-[40%] h-[450px] flex flex-col justify-between items-center bg-gradient-to-b from-[#63469A] to-[#8D64DC] rounded'>
        {/* <span className='text-[28px] text-white font-YekanBakhMedium'>
          خدمات نرم افزاری و سخت افزاری
        </span> */}

        <div className='w-[100%] h-[100%]'>
          <Image
            src={rightImage}
            alt='right_banner_image'
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* <span className='text-[28px] text-white font-YekanBakhMedium'>
          بهترین قیمت بازار
        </span> */}
      </div>

      {/* ------------------------------- Left Banner ----------------------------*/}
      <div className='relative w-[60%] h-[450px] flex flex-col justify-between items-center rounded'>
        <span className='absolute right-[30px] top-[20px] text-[28px] text-white font-YekanBakhMedium'>
          خدمات نرم افزاری و سخت افزاری
        </span>

        <div className='w-[100%] h-[100%]'>
          <Image
            src={leftImage}
            alt='right_banner_image'
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* <span className='w-full flex justify-end text-[28px] text-white font-YekanBakhMedium'>
          بهترین قیمت بازار
        </span> */}
      </div>
    </section>
  );
}
