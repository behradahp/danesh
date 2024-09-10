import Image from "next/image";

// Images
import adminLoginImage from "@/public/images/admin-login.png";
import AdminLoginForm from "@/app/_components/auth_pages/admin/form";

export default function AdminLogin() {
  return (
    <main className='w-[100vw] h-[100vh] flex flex-col-reverse dsk:flex-row justify-center items-center bg-[#F8F8F8]'>
      {/* Login Form */}
      <section className='w-[90vw] dsk:w-[496px] h-[372px] flex flex-col items-center gap-[26px] py-[32px] bg-white'>
        {/* Title */}
        <span className='text-[18px] text-[#263238] font-YekanBakhMedium'>
          خوش آمدید
        </span>

        {/* Form */}
        <AdminLoginForm />
      </section>

      {/* Login Image */}
      <div className='w-[90vw] dsk:w-[500px] h-[372.61px]'>
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
