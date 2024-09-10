"use client";

import { FormEvent, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useRouter } from "next/navigation";

// api
import { adminLogin } from "@/app/utils/auth";

interface MessageInterface {
  success: boolean;
  message: string;
}
const AdminLoginForm = () => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageInterface>({
    success: true,
    message: "",
  });
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

    if (response.success) {
      const userData = {
        id: response.data!.id,
        first_name: response.data!.first_name,
        last_name: response.data!.last_name,
        username: response.data!.username,
        image: response.data!.image,
        email: response.data!.email,
        phone: response.data!.phone,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      router.push("/danesh_admin/dashboard");
    }
  };
  
  return (
    <>
      {/* Inputs Form */}
      <form
        action=''
        autoComplete='on'
        className='flex flex-col items-center gap-[26px]'
        onSubmit={handleLogin}
      >
        {/* Inputs */}
        <div className='flex flex-col gap-[5px]'>
          <label
            htmlFor='username'
            className='text-[14px] text-[#8CA3AF] font-YekanBakhMedium'
          >
            نام کاربری
          </label>
          <input
            type='text'
            id='username'
            name='username'
            autoComplete='on'
            className='min-w-[300px] p-[10px] border border-[#E0E0E0] rounded-[10px] text-[14px] font-YekanBakhMedium'
          />

          <label
            htmlFor='password'
            className='text-[14px] text-[#8CA3AF] font-YekanBakhMedium'
          >
            رمز عبور
          </label>
          <input
            type='password'
            id='password'
            name='password'
            autoComplete='on'
            className='min-w-[300px] p-[10px] border border-[#E0E0E0] rounded-[10px] text-[14px] font-YekanBakhMedium'
          />
        </div>

        {/* Submit Button */}
        <button className='w-[300px] h-[35px] flex justify-center items-center rounded-[10px] bg-[#407BFF] text-[14px] text-white font-YekanBakhMedium'>
          {loading ? <Audio height={20} width={20} color='white' /> : "ورود"}
        </button>
      </form>

      {/* message */}
      <span
        className={`text-[14px] ${
          message.success ? "text-[#31b919]" : "text-[#B91919]"
        } font-YekanBakhMedium`}
      >
        {message.message}
      </span>
    </>
  );
};

export default AdminLoginForm;
