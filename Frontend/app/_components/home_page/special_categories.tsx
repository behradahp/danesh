import Image from "next/image";

// Effects
import BackgroundEffect1 from "@/app/_components/svgs/banner/background_effect_1";
import BackgroundEffect3 from "@/app/_components/svgs/banner/background_effect_3";
import BackgroundEffect2 from "@/app/_components/svgs/banner/background_effect_2";
import BackgroundEffect4 from "@/app/_components/svgs/banner/background_effect_4";
import BackgroundEffect5 from "@/app/_components/svgs/banner/background_effect_5";
import BackgroundEffect6 from "@/app/_components/svgs/banner/background_effect_6";

// Images
import rightImage from "@/public/images/special_categories/right.png";
import middleImage from "@/public/images/special_categories/middle.png";
import leftImage from "@/public/images/special_categories/left.png";

export default function SpecialCategories() {
  return (
    <section className='w-full flex justify-between px-[45px]'>
      {/* Right Side */}
      <div className='relative w-[458px] h-[269px] bg-[#E5B6F2] rounded overflow-hidden'>
        {/* Image */}
        <div className="absolute bottom-[80px] right-[150px] z-[2]">
          <Image
            src={rightImage}
            alt='image'
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: "auto", height: "auto" }}
          />
        </div>

        {/* Title */}
        <span className="absolute top-[166px] right-[25px] text-[32px] text-[#263238] font-YekanBakhMedium">هارد اکسترنال</span>

        {/* effects */}
        <div className='w-full absolute left-0 top-[20px] flex flex-col gap-[55px] z-[1] opacity-10'>
          <BackgroundEffect1 />
          <BackgroundEffect2 />
          <BackgroundEffect3 />
          <BackgroundEffect4 />
          <BackgroundEffect5 />
          <BackgroundEffect6 />
        </div>
      </div>

      {/* Middle Side */}
      <div className='relative w-[458px] h-[269px] bg-[#B6C5F2] rounded overflow-hidden'>
        {/* Image */}
        <div className="absolute top-[40px] right-[150px] z-[2]">
          <Image
            src={middleImage}
            alt='image'
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: "auto", height: "auto" }}
          />
        </div>

        {/* Title */}
        <span className="absolute top-[100px] right-[25px] text-[32px] text-[#263238] font-YekanBakhMedium">روتر بیسیم</span>

        {/* effects */}
        <div className='w-full absolute left-0 top-[20px] flex flex-col gap-[70px] z-[1] opacity-10'>
          <BackgroundEffect1 />
          <BackgroundEffect2 />
          <BackgroundEffect3 />
          <BackgroundEffect4 />
          <BackgroundEffect5 />
          <BackgroundEffect6 />
        </div>
      </div>

      {/* Left Side */}
      <div className='relative w-[458px] h-[269px] bg-[#B6F2D0] rounded overflow-hidden'>
        {/* Image */}
        <div className="absolute bottom-[20px] right-[170px] z-[2]">
          <Image
            src={leftImage}
            alt='image'
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: "auto", height: "auto" }}
          />
        </div>

        {/* Title */}
        <span className="absolute top-[50px] right-[25px] text-[32px] text-[#263238] font-YekanBakhMedium">لپ تاپ دست دوم</span>

        {/* effects */}
        <div className='w-full absolute left-0 top-[20px] flex flex-col gap-[70px] z-[1] opacity-10'>
          <BackgroundEffect1 />
          <BackgroundEffect2 />
          <BackgroundEffect3 />
          <BackgroundEffect4 />
          <BackgroundEffect5 />
          <BackgroundEffect6 />
        </div>
      </div>
    </section>
  );
}
