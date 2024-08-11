import Image from "next/image";

// Components
import FooterQuickAccess from "./footer_auick_access";
import FooterInfo from "./footer_info";

// Images
import image1 from "@/public/images/footer_images/480687.png";
import image2 from "@/public/images/footer_images/samandehi.png";

export default function Footer() {
  return (
    <footer className='flex justify-between pt-[38px] px-[97px] pb-[40px] bg-[#ededed]'>
      <FooterInfo />

      <FooterQuickAccess />

      <div className='flex flex-col gap-[42px]'>
        <div className='w-[144px] h-[144px]'>
          <Image
            src={image1}
            alt='trust sign'
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className='w-[144px] h-[144px]'>
          <Image
            src={image2}
            alt='trust sign'
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </footer>
  );
}
