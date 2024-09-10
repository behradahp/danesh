import Image from "next/image";

// Banner Components
import VerticalBackground from "@/app/_components/svgs/banner/vertical_background";
import HorizontalBackground from "@/app/_components/svgs/banner/horizontal_background";
import BackgroundEffect1 from "@/app/_components/svgs/banner/background_effect_1";
import BackgroundEffect3 from "@/app/_components/svgs/banner/background_effect_3";
import BackgroundEffect2 from "@/app/_components/svgs/banner/background_effect_2";
import BackgroundEffect4 from "@/app/_components/svgs/banner/background_effect_4";
import BackgroundEffect5 from "@/app/_components/svgs/banner/background_effect_5";
import BackgroundEffect6 from "@/app/_components/svgs/banner/background_effect_6";
import BannerObject1 from "@/app/_components/svgs/banner/banner_object_1";
import BannerObject2 from "@/app/_components/svgs/banner/banner_object_2";
import BannerObject3 from "@/app/_components/svgs/banner/banner_object_3";

// Banner Images
import leftImage from "@/public/images/home_banners/left.png";
import rightImage from "@/public/images/home_banners/right.png";

export default function HomeBanners() {
  return (
    <section dir="ltr" className="w-full flex justify-center">
      <section className='relative flex justify-center items-center w-[93%] h-[440px] bg-[#7EBCF2] overflow-hidden z-[1]'>
        {/* Title */}
        <div className='flex flex-col gap-[38px] z-[6]'>
          <h2 className='text-[32px] text-black font-YekanBakhBold'>
            با دانش، مطمئن خرید کنید
          </h2>
          <button className='bg-[#B6D0F2] rounded px-[27px] py-[12px]'>
            مشاهده محصولات پیشنهادی
          </button>
        </div>

        {/* vertical background */}
        <div className='absolute inset-0 z-[2]'>
          <VerticalBackground />
        </div>

        {/* horizontal background */}
        <div className='absolute right-0 z-[2]'>
          <HorizontalBackground />
        </div>

        {/* Left Image */}
        <div className='absolute inset-0 z-[5]'>
          <Image src={leftImage} alt='banner image' />
        </div>

        {/* Right Image */}
        <div className='absolute right-[14px] top-[144px] z-[5]'>
          <Image src={rightImage} alt='banner image' />
        </div>

        {/* effects */}
        <div className='w-full absolute left-0 top-[20px] flex flex-col gap-[70px] z-[3] opacity-10'>
          <BackgroundEffect1 />
          <BackgroundEffect2 />
          <BackgroundEffect3 />
          <BackgroundEffect4 />
          <BackgroundEffect5 />
          <BackgroundEffect6 />
        </div>

        {/* left bottom object */}
        <div className='absolute left-[27px] top-[370px] z-[4]'>
          <BannerObject1 />
        </div>

        {/* left top object */}
        <div className='absolute left-[291px] top-[44px] z-[4]'>
          <BannerObject2 />
        </div>

        {/* right top object */}
        <div className='absolute right-[128px] top-[88px] z-[4]'>
          <BannerObject3 />
        </div>
      </section>
    </section>
  );
}
