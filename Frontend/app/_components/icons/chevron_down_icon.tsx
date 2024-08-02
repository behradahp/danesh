import { useState } from "react";

export default function ChevronDownIcon() {
  const [color, setColor] = useState<string>("#4E5A60");
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16.828'
      height='9.414'
      viewBox='0 0 16.828 9.414'
      onMouseEnter={() => setColor("#007dfc")}
      onMouseLeave={() => setColor("#4E5A60")}
    >
      <path
        id='Path_6569'
        data-name='Path 6569'
        d='M19,12l-7,7L5,12'
        transform='translate(-3.586 -10.586)'
        fill='none'
        stroke={color}
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
      />
    </svg>
  );
}
