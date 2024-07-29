"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'

// Components
import PanelSidebar from "./panel_sidebar";
import PanelHeader from "./panel_header";
import { adminCheck } from "@/app/utils/adminCheck";

export default function PanelLayout({
  children,
  section_id,
}: Readonly<{
  children: React.ReactNode;
  section_id: string;
}>) {
  const router = useRouter()
  const pathname = usePathname();

  useEffect(() => {
    const checkAdminUser = async () => {
      const response:
        | {
            success: boolean;
            error: string;
          }
        | undefined = await adminCheck();

      if (response && !response.success) {
        router.push("/auth/admin_login");
      }
    };

    checkAdminUser();
  }, [pathname]);

  return (
    <>
      <main className='w-[100vw] h-[100vh] bg-[#F8F8F8] flex'>
        {/* ------------------------ SideBar ---------------------- */}
        <PanelSidebar section_id={section_id} />

        {/* ------------------------ Header & Content ---------------------- */}
        <section className='w-[100%] dsk:max-w-[calc(100vw-307px)] h-[100vh] flex flex-col'>
          {/* ------------------------ Header ---------------------- */}
          <PanelHeader />

          {/* ------------------------ Content ---------------------- */}
          {children}
        </section>
      </main>
    </>
  );
}
