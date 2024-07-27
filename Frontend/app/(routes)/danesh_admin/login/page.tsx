"use client";
import axios from "axios";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { Audio } from 'react-loader-spinner'
import { useRouter } from 'next/navigation'

// Images
import adminLoginImage from "@/public/images/admin-login.png";

// api
import { adminLogin } from "@/app/actions/actions";

interface MessageInterface {
  success: boolean,
  message: string,
}

export default function AdminLogin() {
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageInterface>({
    success: true,
    message: "",
  })

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    const usernameInput = form.elements.namedItem(
      "username"
    ) as HTMLInputElement;
    const passwordInput = form.elements.namedItem(
      "password"
    ) as HTMLInputElement;

    const data = {
      username: usernameInput.value,
      password: passwordInput.value,
    };

    setLoading(true);

    const response = await adminLogin(data);

    setLoading(false);
    setMessage({
      success: response.success,
      message: response.message,
    });

    if(response.success) router.push('/danesh_admin/panel');
  };

  return (
    <main className='w-[100vw] h-[100vh] flex justify-center items-center bg-[#F8F8F8]'>
      {/* Login Form */}
      <section className='w-[496px] h-[372px] flex flex-col items-center gap-[26px] py-[32px] bg-white rounded-[20px] shadow-default'>
        {/* Title */}
        <span className='text-[18px] text-[#263238] font-YekanBakhMedium'>
          خوش آمدید
        </span>

        {/* Inputs Form */}
        <form
          action=''
          autoComplete='off'
          className='flex flex-col items-center gap-[26px]'
          onSubmit={handleLogin}
        >
          {/* Inputs */}
          <div className='flex flex-col gap-[5px]'>
            <label htmlFor='username' className="text-[14px] text-[#8CA3AF] font-YekanBakhMedium">نام کاربری</label>
            <input
              type='text'
              id='username'
              name='username'
              autoComplete='off'
              className='min-w-[300px] p-[10px] border border-[#9ACAEE] rounded-[10px] text-[14px] font-YekanBakhMedium'
            />

            <label htmlFor='password' className="text-[14px] text-[#8CA3AF] font-YekanBakhMedium">رمز عبور</label>
            <input
              type='password'
              id='password'
              name='password'
              autoComplete='new-password'
              className='min-w-[300px] p-[10px] border border-[#9ACAEE] rounded-[10px] text-[14px] font-YekanBakhMedium'
            />
          </div>

          {/* Submit Button */}
          <button className='w-[300px] h-[35px] flex justify-center items-center rounded-[10px] bg-[#407BFF] text-[14px] text-white font-YekanBakhMedium'>
            {
              loading ? <Audio height={20} width={20} color="white"/> : "ورود"
            }
            
          </button>
        </form>

        {/* message */}
        <span className={`text-[14px] ${message.success ? 'text-[#31b919]' : 'text-[#B91919]'} font-YekanBakhMedium`}>
          {message.message}
        </span>
      </section>

      {/* Login Image */}
      <div className='w-[500px] h-[372.61px]'>
        <Image
          src={adminLoginImage}
          alt='admin login image'
          width={0}
          height={0}
          sizes={"100vw"}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </main>
  );
}
