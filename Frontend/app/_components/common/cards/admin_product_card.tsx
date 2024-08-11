"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import moment from "jalali-moment";

// Icons
import ProductEditIcon from "@/app/_components/icons/product_edit_icon";
import ProductAdminIcon from "@/app/_components/icons/product_admin_icon";

// Images
import defaultImage from "@/public/images/default-image.jpg";
import {toFarsiDigits} from "@/app/functions/toEnglishDigits";

export default function AdminProductCard({
  data,
  url = "",
}: {
  data: Product;
  url?: string;
}) {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showAdmin, setShowAdmin] = useState<boolean>(false);
  return (
    <div className='relative w-[200px] flex flex-col items-center p-[10px] bg-white rounded-[10px] hover:shadow-default'>
      {/* Info */}
      <div className={`${showAdmin ? '' : 'hidden'} absolute left-0 top-[345px] w-[220px] bg-white shadow-default z-[10000] p-[10px] rounded`}>
        <div className='flex items-center'>
          <span>°</span>
          <div className="w-[5px]"></div>
          <span className='text-[12px] font-YekanBakhMedium'>
            اضافه شده در:
          </span>
          <div className="w-[15px]"></div>
          <span className='text-[12px] font-YekanBakhMedium'>
            {toFarsiDigits(moment(data.published_date.split(".")[0], 'YYYY-MM-DDTHH:mm:ss').locale('fa').format("YYYY-MM-DD / HH:mm:ss"))}
          </span>
        </div>

        <div className='flex items-center mr-[10px]'>
          <div className="w-[5px]"></div>
          <span className='text-[12px] font-YekanBakhMedium'>
            توسط:
          </span>
          <div className="w-[47px]"></div>
          <span className='text-[12px] font-YekanBakhMedium'>
            {data.admin_username}
          </span>
        </div>

        <div className='flex items-center'>
          <span>°</span>
          <div className="w-[5px]"></div>
          <span className='text-[12px] font-YekanBakhMedium'>
            آخرین ویرایش:
          </span>
          <div className="w-[15px]"></div>
          <span className='text-[12px] font-YekanBakhMedium'>
          {toFarsiDigits(moment(data.last_update_date.split(".")[0], 'YYYY-MM-DDTHH:mm:ss').locale('fa').format("YYYY-MM-DD / HH:mm:ss"))}
          </span>
        </div>

        <div className='flex items-center mr-[10px]'>
          <div className="w-[5px]"></div>
          <span className='text-[12px] font-YekanBakhMedium'>
            توسط:
          </span>
          <div className="w-[47px]"></div>
          <span className='text-[12px] font-YekanBakhMedium'>
            {data.lats_update_admin_username}
          </span>
        </div>
      </div>

      <div className='w-[190px] h-[180px]'>
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

      <span className='min-h-[60px] text-[14px] text-[#263238] font-YekanBakhBold'>
        {data.name.slice(0, 50).concat("...")}
      </span>

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

      <div className='h-[5px]'></div>

      <div className='w-full flex justify-between'>
        <Link href={`/danesh_admin/products/edit/${data.id}`}>
          <div
            className='min-h-[21px] flex items-center gap-[9px] cursor-pointer'
            onMouseEnter={() => setShowEdit(true)}
            onMouseLeave={() => setShowEdit(false)}
          >
            <ProductEditIcon color={showEdit ? "#007DFC" : "black"} />
            <span
              className={`${
                showEdit ? "" : "hidden"
              } text-[14px] text-black font-YekanBakhMedium`}
            >
              ویرایش
            </span>
          </div>
        </Link>

        <div
          className='min-h-[21px] flex items-center gap-[9px] cursor-pointer'
          onMouseEnter={() => setShowAdmin(true)}
          onMouseLeave={() => setShowAdmin(false)}
        >
          <ProductAdminIcon color={showAdmin ? "#007DFC" : "black"} />
        </div>
      </div>
    </div>
  );
}
