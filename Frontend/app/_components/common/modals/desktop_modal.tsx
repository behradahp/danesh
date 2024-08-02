"use client";

import { FC } from "react";
import Image from "next/image";

// Icons
import CloseIcon from "@/app/_components/icons/close_icon";

interface DesktopModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  handleCloseModal: () => void;
}

const DesktopModal: FC<DesktopModalProps> = ({
  isOpen,
  title,
  children,
  handleCloseModal,
}) => {
  if (isOpen) {
    return (
      <div className='hidden fixed inset-0 dsk:flex justify-center items-center w-[100%] h-[100%] bg-black/45 z-[1000]'>
        <div className='bg-white p-[10px] rounded-[3px] border border-[#CFCFCF]'>
          {/* Header */}
          <div className='flex justify-between items-center rounded-[3px] px-[10px]'>
            <span className='text-[18px] font-YekanBakhMedium py-[8px] border-b-[3px] border-b-[#A4C0FF] rounded-b-[5px]'>
              {title}
            </span>

            <div className='cursor-pointer' onClick={handleCloseModal}>
              <CloseIcon />
            </div>
          </div>

          {/* Content */}
          <div className="relative">{children}</div>
        </div>
      </div>
    );
  }
  return <></>;
};

export default DesktopModal;
