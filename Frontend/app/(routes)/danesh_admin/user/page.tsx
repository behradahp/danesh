"use client";

import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import PanelLayout from "@/app/_components/admin_panel/panel_layout";
import Image from "next/image";

// Images
import axios from "axios";
import { url } from "@/app/constants/url";

interface FormData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  image: string;
}
export default function UserProfile() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    image: "",
  });

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isImageDeleted, setIsImageDeleted] = useState<boolean>(false);

  const getUser = async () => {
    const userJson = localStorage.getItem("user");
    if (!userJson) {
      toast.error("خطایی رخ داده است. لطفا دوباره تلاش کنید.!", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
        closeOnClick: true,
        hideProgressBar: false,
        pauseOnHover: false,
      });
      return;
    }
    const admin = JSON.parse(userJson);

    const res = await axios.get(`${url}auth/updateUser/1/`);

    localStorage.setItem("user", JSON.stringify({
      username: admin.username,
      email: admin.email,
      first_name: res.data.first_name,
      last_name: res.data.last_name,
      phone: res.data.phone,
      image: `${url}${res.data.image}`,
    }))

    setFormData({
      username: admin.username,
      email: admin.email,
      first_name: res.data.first_name,
      last_name: res.data.last_name,
      phone: res.data.phone,
      image: `${url}${res.data.image}`,
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleChangeUser = async () => {
    const data = new FormData();
    data.append("first_name", formData.first_name);
    data.append("last_name", formData.last_name);
    data.append("phone", formData.phone);

    if (uploadedImage != null) {
      data.append("image", uploadedImage);
      data.append("image_delete", "0");
    } else if (isImageDeleted) {
      data.append("image_delete", "1");
    } else {
      data.append("image_delete", "0");
    }

    const res = await axios.patch(
      `${url}auth/updateUser/1/`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.status == 200) {
      getUser();
      toast.success("اطلاعات به روز رسانی شد.", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
        closeOnClick: true,
        hideProgressBar: false,
        pauseOnHover: false,
      });
    } else {
      toast.error("خطایی رخ داده است. لطفا دوباره تلاش کنید.!", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
        closeOnClick: true,
        hideProgressBar: false,
        pauseOnHover: false,
      });
    }
  };

  return (
    <PanelLayout section_id='-1' isUserPage>
      <div className='flex-grow w-[100%] pt-[26px] px-[30px] dsk:px-[62px] overflow-y-auto'>
        {/* ---------------------------- Title ----------------------------------- */}
        <span className='text-[24px] text-back font-YekanBakhBold'>
          اطلاعات ادمین
        </span>

        <div className='h-[35px]'></div>

        {/* Profile image and submit button */}
        <div className='flex items-center gap-[60px] mr-[30px]'>
          {/* Image */}
          <div className='w-[170px] h-[170px] cursor-pointer hover:border hover:border-[#C6D7FF]'>
              <Image
                loader={
                  uploadedImage != null
                    ? () => URL.createObjectURL(uploadedImage)
                    : () => formData.image
                }
                src={
                  uploadedImage != null
                    ? URL.createObjectURL(uploadedImage)
                    : formData.image
                }
                alt='profil'
                width={0}
                height={0}
                sizes='100vw'
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          {/* <label htmlFor='profile_image'>
            <input
              type='file'
              id='profile_image'
              accept='image/*'
              className='hidden'
              onChange={(e) =>
                setUploadedImage(e.target.files ? e.target.files[0] : null)
              }
            />
            
          </label> */}

          {/* Buttons */}
          <div className='h-full flex flex-col justify-center gap-[10px]'>
            <button
              className='w-[169px] h-[35px] flex justify-center items-center bg-[#6695FF] rounded text-white font-YekanBakhMedium text-[16px]'
              onClick={handleChangeUser}
            >
              تایید
            </button>
            <button
              className='w-[169px] h-[35px] flex justify-center items-center border border-[#707070] rounded text-[#4E5A60] font-YekanBakhMedium text-[16px] cursor-pointer'
              onClick={(e) => {
                setUploadedImage(null);
                setIsImageDeleted(true);
                setFormData({...formData, image: `${url}media/user-default.png`})
              }}
            >
              حذف
            </button>
          </div>
        </div>

        <div className='h-[20px]'></div>

        {/* Username */}
        <div className='flex flex-col'>
          <span className='text-[16px] text-[#4E5A60] font-YekanBakhMedium mb-[5px]'>
            نام کاربری
          </span>

          <input
            type='text'
            className='w-[478px] border border-[#E0E0E0] rounded-[10px] p-[5px]'
            disabled
            value={formData.username}
          />
        </div>

        <div className='h-[20px]'></div>

        {/* Email */}
        <div className='flex flex-col'>
          <span className='text-[16px] text-[#4E5A60] font-YekanBakhMedium mb-[5px]'>
            ایمیل
          </span>

          <input
            type='text'
            className='w-[478px] border border-[#E0E0E0] rounded-[10px] p-[5px]'
            disabled
            value={formData.email}
          />
        </div>

        <div className='h-[20px]'></div>

        {/* First name */}
        <div className='flex flex-col'>
          <span className='text-[16px] text-[#4E5A60] font-YekanBakhMedium mb-[5px]'>
            نام
          </span>

          <input
            type='text'
            className='w-[478px] border border-[#E0E0E0] rounded-[10px] p-[5px]'
            value={formData.first_name}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
          />
        </div>

        <div className='h-[20px]'></div>

        {/* Last name */}
        <div className='flex flex-col'>
          <span className='text-[16px] text-[#4E5A60] font-YekanBakhMedium mb-[5px]'>
            نام خانوادگی
          </span>

          <input
            type='text'
            className='w-[478px] border border-[#E0E0E0] rounded-[10px] p-[5px]'
            value={formData.last_name}
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
          />
        </div>

        <div className='h-[20px]'></div>

        {/* Phone */}
        <div className='flex flex-col'>
          <span className='text-[16px] text-[#4E5A60] font-YekanBakhMedium mb-[5px]'>
            شماره موبایل
          </span>

          <input
            type='text'
            className='w-[478px] border border-[#E0E0E0] rounded-[10px] p-[5px]'
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>

        <div className='h-[20px]'></div>
      </div>
    </PanelLayout>
  );
}
