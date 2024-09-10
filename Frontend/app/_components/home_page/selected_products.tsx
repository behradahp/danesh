import Image from "next/image";

// Effects
import BackgroundEffect1 from "@/app/_components/svgs/banner/background_effect_1";
import BackgroundEffect3 from "@/app/_components/svgs/banner/background_effect_3";
import BackgroundEffect2 from "@/app/_components/svgs/banner/background_effect_2";
import BackgroundEffect4 from "@/app/_components/svgs/banner/background_effect_4";
import BackgroundEffect5 from "@/app/_components/svgs/banner/background_effect_5";
import BackgroundEffect6 from "@/app/_components/svgs/banner/background_effect_6";

// Images
import rightImage from "@/public/images/selected_products/right.png";
import leftImage from "@/public/images/selected_products/left.png";

export default function SelectedProducts() {
  return (
    <section className='w-full flex justify-between px-[45px]'>
      {/* Left Side */}
      <div className='relative w-[48%] h-[269px] flex justify-around items-center bg-[#7EBCF2] rounded overflow-hidden'>
        <Image
          src={rightImage}
          alt='image'
          width={0}
          height={0}
          sizes='100vw'
          style={{ width: "auto", height: "auto" }}
          className='z-[2]'
        />

        <span className='max-w-[180px] text-center text-black text-[30px] font-YekanBakhBold'>
          تجهیزات اداری
        </span>

        {/* effects */}
        <div className='w-full absolute left-0 top-[20px] flex flex-col gap-[60px] z-[1] opacity-10'>
          <BackgroundEffect1 />
          <BackgroundEffect2 />
          <BackgroundEffect3 />
          <BackgroundEffect4 />
          <BackgroundEffect5 />
          <BackgroundEffect6 />
        </div>
      </div>

      {/* Right Side */}
      <div className='relative w-[48%] h-[269px] flex justify-around items-center bg-[#79F2AE] rounded overflow-hidden'>
        <Image
          src={leftImage}
          alt='image'
          width={0}
          height={0}
          sizes='100vw'
          style={{ width: "auto", height: "auto" }}
          className='z-[2]'
        />

        <span className='max-w-[180px] text-center text-black text-[30px] font-YekanBakhBold'>
          ویندوز و انواع نرم افزار
        </span>

        {/* effects */}
        <div className='w-full absolute left-0 top-[20px] flex flex-col gap-[60px] z-[1] opacity-10'>
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
