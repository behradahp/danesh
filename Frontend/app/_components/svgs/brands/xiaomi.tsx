"use client";

import { useState } from "react";

export default function XiaomiBrand() {
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <svg
      id='xiaomi-logo-svgrepo-com'
      xmlns='http://www.w3.org/2000/svg'
      width='80'
      height='80'
      viewBox='0 0 80 80'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <defs>
        <clipPath id='clip-path'>
          <path id='Path_7207' data-name='Path 7207' d='M0,0H80V80H0Z' />
        </clipPath>
      </defs>
      <path
        id='Path_7205'
        data-name='Path 7205'
        d='M0,0H80V80H0Z'
        fill={isHover ? '#F57921' : '#ebebeb'}
      />
      <g id='Group_2302' data-name='Group 2302' clip-path='url(#clip-path)'>
        <path
          id='Path_7206'
          data-name='Path 7206'
          d='M126.159,233.031V203.869a12,12,0,0,0-12-12H80.445a.469.469,0,0,0-.471.467v40.693a.468.468,0,0,0,.471.466h9.007a.469.469,0,0,0,.47-.469V201.089a.47.47,0,0,1,.471-.469h19.368a6.586,6.586,0,0,1,6.587,6.585v25.822a.469.469,0,0,0,.469.469h8.874a.468.468,0,0,0,.469-.466'
          transform='translate(-71.977 -172.684)'
          fill={isHover ? '#FAF9F5' : '#faf9f5'}
        />
      </g>
      <g id='Group_2304' data-name='Group 2304'>
        <g id='Group_2303' data-name='Group 2303' clip-path='url(#clip-path)'>
          <path
            id='Path_7208'
            data-name='Path 7208'
            d='M270.444,378.939a.468.468,0,0,1-.469.469h-9a.469.469,0,0,1-.471-.469V354.464a.47.47,0,0,1,.471-.47h9a.468.468,0,0,1,.469.47V378.94Z'
            transform='translate(-234.45 -318.595)'
            fill={isHover ? '#FAF9F5' : '#faf9f5'}
          />
        </g>
      </g>
      <g id='Group_2306' data-name='Group 2306'>
        <g id='Group_2305' data-name='Group 2305' clip-path='url(#clip-path)'>
          <path
            id='Path_7210'
            data-name='Path 7210'
            d='M630.506,233.031a.469.469,0,0,1-.471.469h-9a.471.471,0,0,1-.473-.469V192.346a.472.472,0,0,1,.473-.471h9a.47.47,0,0,1,.471.47Z'
            transform='translate(-558.504 -172.688)'
            fill={isHover ? '#FAF9F5' : '#faf9f5'}
          />
        </g>
      </g>
    </svg>
  );
}
