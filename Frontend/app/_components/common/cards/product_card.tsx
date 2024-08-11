import Image from "next/image";

// Images
import defaultImage from "@/public/images/default-image.jpg";

export default function ProductCard({
  data,
  url = "",
}: {
  data: Product;
  url?: string;
}) {
  return (
    <div className='w-[270px] flex flex-col items-center p-[10px] bg-white rounded-[10px] shadow-default hover:shadow-productHover cursor-pointer'>
      {/* Image */}
      <div className='w-[260px] h-[240px]'>
        <Image
          loader={
            !data.main_image
              ? () => defaultImage.src
              : () => url + data.main_image
          }
          src={!data.main_image ? defaultImage.src : url + data.main_image}
          alt='product-image'
          width={0}
          height={0}
          sizes='100vw'
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div className='h-[10px]'></div>

      {/* Title */}
      <span className='min-h-[60px] text-[14px] text-[#263238] font-YekanBakhBold'>
        {data.name.length > 50
          ? data.name.slice(0, 50).concat("...")
          : data.name}
      </span>

      {/* Price */}
      {data.discount == 0 ? (
        <div className='w-full flex justify-end  min-h-[40px]'>
          <span className='text-[14px] text-[#263238] font-YekanBakhMedium'>
            {Number(data.price).toLocaleString("fa")} تومان
          </span>
        </div>
      ) : (
        <div className='w-full flex justify-between'>
          <div className='w-[36px] h-[36px] flex justify-center items-center rounded-[100px] bg-[#D80C27]'>
            <span className='text-[15px] text-white font-YekanBakhMedium'>
              {Number(data.discount).toLocaleString("fa")}٪
            </span>
          </div>

          <div className='flex flex-col items-end'>
            <span className='text-[14px] text-[#263238] font-YekanBakhMedium'>
              {Number(data.discount_price).toLocaleString("fa")} تومان
            </span>
            <span className='text-[14px] text-[#263238] font-YekanBakhMedium line-through'>
              {Number(data.price).toLocaleString("fa")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
