"use client";

import { useState } from "react";

export default function AppleBrand() {
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <svg
      id='apple-black-logo-svgrepo-com'
      xmlns='http://www.w3.org/2000/svg'
      width='91.165'
      height='98.901'
      viewBox='0 0 91.165 98.901'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <path
        id='apple-black-logo-svgrepo-com-2'
        data-name='apple-black-logo-svgrepo-com'
        d='M76.139,52.543C76.3,67.51,91,72.491,91.165,72.554a51.477,51.477,0,0,1-7.748,14.066c-4.667,6.025-9.51,12.028-17.139,12.152-7.5.122-9.907-3.927-18.478-3.927s-11.247,3.8-18.343,4.049c-7.364.246-12.973-6.515-17.678-12.518C2.164,74.1-5.184,51.68,4.682,36.547a28.1,28.1,0,0,1,23.167-12.4c7.232-.122,14.057,4.3,18.478,4.3s12.713-5.315,21.433-4.534c3.651.134,13.9,1.3,20.478,9.81-.53.29-12.227,6.305-12.1,18.818M62.049,15.791c3.91-4.181,6.541-10,5.823-15.791A26.356,26.356,0,0,0,51.38,7.5c-3.623,3.7-6.8,9.622-5.939,15.3,6.282.429,12.7-2.82,16.609-7'
        transform='translate(0)'
        fill={isHover ? 'black' : '#ebebeb'}
      />
    </svg>
  );
}
