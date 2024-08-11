"use client";

import { useState } from "react";
import Link from "next/link";

export default function CategoryCard({
  name,
  Icon,
  id,
}: {
  name: string;
  Icon: ({ color }: { color?: string }) => JSX.Element;
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

        <Icon color={iconColor} />
      </div>
    </Link>
  );
}
