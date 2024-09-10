'use client'

import { getInfo } from "@/app/actions/actions";
import { toFarsiDigits } from "@/app/functions/toEnglishDigits";
import { useEffect, useState } from "react";

export default function HeaderPhoneNumber() {
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    useEffect(() => {
        const fetchInfo = async() => {
            const res = await getInfo();
            const data: About = res.data;
            setPhoneNumber(data.phone);
        }

        fetchInfo();
    }, []);
  return (
    <span className='text-[18px] text-[#666666] font-YekanBakhMedium'>
      {toFarsiDigits(phoneNumber)}
    </span>
  );
}
