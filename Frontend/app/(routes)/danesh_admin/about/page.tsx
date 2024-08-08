"use client";

import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import PanelLayout from "@/app/_components/admin_panel/panel_layout";

// api
import { editInfo, getInfo } from "@/app/actions/actions";

interface Info {
  about: string;
  email: string;
  phone: string;
  address: string;
}

export default function AboutUs() {
  const [info, setInfo] = useState<Info>({
    about: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const fetchInfo = async () => {
    const res = await getInfo();
    setInfo({
      about: res.data.about,
      email: res.data.email,
      phone: res.data.phone,
      address: res.data.address,
    });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleEditInfo = async () => {
    setLoading(true);

    const data = new FormData();
    data.append("about", info.about);
    data.append("email", info.email);
    data.append("phone", info.phone);
    data.append("address", info.address);

    const res = await editInfo({data});

    if(res.success) {
      toast.success("اطلاعات با موفقیت تغییر کرد!", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
        closeOnClick: true,
        hideProgressBar: false,
        pauseOnHover: false,
      });
      fetchInfo();
    } else {
      toast.error("مشکلی پیش آمده. دوباره امتحان کنید!", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
        closeOnClick: true,
        hideProgressBar: false,
        pauseOnHover: false,
      });
    }

    setLoading(false);
  }

  return (
    <PanelLayout section_id='4'>
      <div className='flex-grow w-[100%] pt-[26px] px-[30px] dsk:px-[62px] overflow-y-auto'>
        {/* ---------------------------- Title ----------------------------------- */}
        <div className='flex gap-[700px]'>
            <span className='text-[24px] text-back font-YekanBakhBold'>
              درباره ما
            </span>

            <button
              className='w-[200px] h-[35px] flex justify-center items-center text-[14px] text-white font-YekanBakhMedium bg-[#6695FF] rounded-[5px]'
              onClick={handleEditInfo}
            >
              {loading ? (
                <Audio height={20} width={20} color='white' />
              ) : (
                "تایید"
              )}
            </button>
          </div>

        <div className='h-[35px]'></div>

        <div className='flex justify-between'>
          {/* About */}
          <div className='w-[454px] h-[337px] flex flex-col gap-[20px] py-[21px] px-[36px] bg-white rounded-[10px]'>
            <span className='text-[16px] text-back font-YekanBakhMedium'>
              درباره ما
            </span>

            <textarea className='w-full max-h-[253px] min-h-[253px] border-2 border-[#EBEBEB] rounded-[10px] p-[10px]' value={info.about} onChange={(e) => setInfo({...info, about: e.target.value})}></textarea>
          </div>

          {/* Info */}
          <div className='flex flex-col gap-[25px]'>
            {/* email */}
            <div className='flex flex-col gap-[12px]'>
              <span className='text-[16px] text-back font-YekanBakhRegular'>
                ایمیل
              </span>

              <input
                type='text'
                className='w-[478px] bg-white border border-[#E0E0E0] rounded-[10px] p-[5px]'
                value={info.email} onChange={(e) => setInfo({...info, email: e.target.value})}
              />
            </div>

            {/* phone */}
            <div className='flex flex-col gap-[12px]'>
              <span className='text-[16px] text-back font-YekanBakhRegular'>
                تلفن
              </span>

              <input
                type='text'
                className='w-[478px] bg-white border border-[#E0E0E0] rounded-[10px] p-[5px]'
                value={info.phone} onChange={(e) => setInfo({...info, phone: e.target.value})}
              />
            </div>

            {/* address */}
            <div className='flex flex-col gap-[12px]'>
              <span className='text-[16px] text-back font-YekanBakhRegular'>
                نشانی
              </span>

              <textarea className='w-[478px] max-h-[97px] min-h-[97px] border-2 border-[#EBEBEB] rounded-[10px] p-[10px]'  value={info.address} onChange={(e) => setInfo({...info, address: e.target.value})}></textarea>
            </div>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
}
