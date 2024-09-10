'use client'

import { useEffect, useRef, useState } from "react";

const ProductPagePriceAndOptions = ({
  price,
  discountPrice,
}: {
  price: string;
  discountPrice: string;
}) => {
  const ref = useRef(null);

  const [scrollY, setScrollY] = useState(0);
  const [fullHeight, setFullHeight] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [componentHeight, setComponentHeight] = useState(0);

  useEffect(() => {
    // setFullHeight(document.body.offsetHeight);
    // setScreenHeight(window.outerHeight);
    // setComponentHeight(ref ? ref.current!.clientHeight : 0)

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
    ref={ref}
      className={`py-[16px] px-[48px] h-min bg-[#F6F6F7] rounded`}
    //   style={
    //     scrollY <= 100
    //       ? {}
    //       : scrollY > 100 && scrollY < fullHeight - screenHeight - componentHeight - 150
    //       ? {
    //           position: "fixed",
    //           top: `50%`,
    //           left: "55px",
    //           transform: "translateY(-50%)",
    //         }
    //       : {
    //           position: "fixed",
    //           bottom: `30px`,
    //           left: "55px",
    //         }
    //   }
    >
      <div
        className={`${
          discountPrice === price ? "hidden" : ""
        } w-full flex justify-end line-through`}
      >
        <span className='text-[20px] text-[#707070] font-YekanBakhMedium'>
          {Number(price).toLocaleString("fa")}
        </span>
      </div>
      <div className='w-full flex justify-end'>
        <span className='text-[20px] text-[#707070] font-YekanBakhMedium'>
          تومان {Number(discountPrice).toLocaleString("fa")}
        </span>
      </div>

      <button className='mt-[13px] w-[309px] h-[52px] flex justify-center items-center bg-[#8D64DC]/60 rounded text-[20px] text-[#263238] font-YekanBakhMedium'>
        تماس بگیرید
      </button>

      <div className='mt-[27px] w-[309px] h-[80px] flex flex-col justify-center items-center py-[16px] border-2 border-dashed border-[#B5A0DC] rounded'>
        <span className='text-[18px] text-[#707070] font-YekanBakhMedium'>
          خرید اقساطی
        </span>
        <span className='text-[18px] text-[#707070] font-YekanBakhMedium'>
          ۷ روز ضمانت بازگشت کالا
        </span>
      </div>
    </div>
  );
};

export default ProductPagePriceAndOptions;
