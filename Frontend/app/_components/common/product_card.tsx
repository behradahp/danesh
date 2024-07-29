import Image from "next/image";

// Icons
import ProductEditIcon from "@/app/_components/icons/product_edit_icon";
import ProductAdminIcon from "@/app/_components/icons/product_admin_icon";

export default function ProductCard({ data }: { data: Product }) {
  return (
    <div className='w-[200px] flex flex-col items-center gap-[20px] p-[10px] bg-white rounded-[10px]'>
      <div className='w-[190px] h-[180px]'>
        <Image
          loader={() => data.main_image}
          src={data.main_image}
          alt='product-image'
          width={0}
          height={0}
          sizes='100vw'
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <span className='text-[14px] text-[#263238] font-YekanBakhBold'>
        {data.name.slice(0, 50).concat("...")}
      </span>

      <div className='w-full flex justify-end'>
        <span className='text-[14px] text-[#263238] font-YekanBakhMedium'>
          {(Number(data.price) / 10).toLocaleString("fa")} تومان
        </span>
      </div>

      <div className='w-full flex justify-between'>
        <ProductEditIcon />

        <ProductAdminIcon />
      </div>
    </div>
  );
}
