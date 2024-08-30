"use client";

import { useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

export default function CategoryCard({
  name,
  image,
  id,
}: {
  name: string;
  image: StaticImageData;
  id: number;
}) {
  const [iconColor, setIconColor] = useState<string | undefined>(undefined);

  return (
    <Link href={""}>
      <div
        className='w-[190px] h-[222px] flex flex-col items-center justify-between pt-[28px] pb-[18px] bg-[#F8F8F8] rounded hover:bg-[#8e64dc46]'
        onMouseEnter={() => setIconColor("#8D64DC")}
        onMouseLeave={() => setIconColor(undefined)}
      >
        <span className='text-[24px] text-[#929292] font-YekanBakhMedium text-center'>
          {name}
        </span>

        <div className='w-[150px] h-[100px]'>
          <Image
            src={image}
            alt='right_banner_image'
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </Link>
  );
}
