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
  image: string;
  id: number;
}) {
  const [iconColor, setIconColor] = useState<string | undefined>(undefined);

  return (
    <Link href={""}>
      <div
        className='w-[200px] h-[222px] flex flex-col items-center pt-[28px] pb-[18px] bg-[#F8F8F8] rounded hover:bg-[#8e64dc46]'
        onMouseEnter={() => setIconColor("#8D64DC")}
        onMouseLeave={() => setIconColor(undefined)}
      >
        <span className='text-[24px] text-[#929292] font-YekanBakhMedium text-center'>
          {name}
        </span>

        <div className='flex-grow w-full flex justify-center items-center'>
          <Image
            loader={() => image}
            src={image}
            alt='category image'
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: "auto", height: "auto", maxHeight: "150px" }}
          />
        </div>
      </div>
    </Link>
  );
}
