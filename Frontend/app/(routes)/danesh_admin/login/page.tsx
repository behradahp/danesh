"use client";
import axios from "axios";
import { FormEvent } from "react";
import Image from "next/image";

// Images
import adminLoginImage from "@/public/images/admin-login.png";

export default function AdminLogin() {
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

    console.log("waiting...");
    const response = await axios.post("http://127.0.0.1:8000/admin/login/?next=/admin/", {
      body: data,
    });
    console.log("Done.");

    console.log(response);
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
            ورود
          </button>
        </form>

        {/* message */}
        <span className='text-[14px] text-[#B91919] font-YekanBakhMedium'>
          نام کاربری یا رمز عبور نادرست است
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
