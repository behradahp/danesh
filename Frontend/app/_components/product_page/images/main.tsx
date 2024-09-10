'use client'

import Image from "next/image";
import { useState } from "react";
import DesktopModal from "../../common/modals/desktop_modal";

const ProductpageImages = ({
  images,
  discountPercent,
}: {
  images: Image[];
  discountPercent: number;
}) => {
  const [showedImageId, setShowedImageId] = useState<string>("0");
  const [isImagesModalOpen, setIsImagesModalOpen] = useState<boolean>(false);
  return (
    <>
      <div className='relative w-[450px] flex flex-col gap-[23px]'>
        {/* discount Percent */}
        <div className='absolute top-[27px] right-[22px] w-[36px] h-[36px] flex justify-center items-center bg-[#D80C27] rounded-[100px]'>
          <span className='text-[16px] text-white font-YekanBakhMedium'>
            {discountPercent.toLocaleString("fa")}٪
          </span>
        </div>

        {/* Main Image */}
        <div className='w-full h-[400px]'>
          <Image
            loader={() =>
              images.filter((image) => image.id == showedImageId)[0].image
            }
            src={images.filter((image) => image.id == showedImageId)[0].image}
            alt='main_image'
            sizes='100vw'
            width={0}
            height={0}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Other Images */}
        <div className='w-full flex gap-[52px]'>
          {images
            .filter((image) => image.id != showedImageId)
            .slice(0, 3)
            .map((image, index) => {
              return (
                <div
                  key={image.id}
                  className='relative w-[108px] h-[108px] p-[7px] bg-white cursor-pointer'
                  onClick={
                    index == 2 ? () => {} : () => setShowedImageId(image.id)
                  }
                >
                  {images.length > 3 && index == 2 ? (
                    <div className='absolute inset-0 w-full h-full flex justify-center items-center bg-black/40 rounded-[6px]' onClick={() => setIsImagesModalOpen(true)}>
                      <span className='text-[16px] text-white font-YekanBakhMedium'>
                        {(images.length - 2).toLocaleString("fa")}+
                      </span>
                    </div>
                  ) : (
                    <></>
                  )}
                  <Image
                    loader={() => image.image}
                    src={image.image}
                    alt='image'
                    sizes='100vw'
                    width={0}
                    height={0}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              );
            })}
        </div>
      </div>

      {/* Images Modal */}
      <DesktopModal
        isOpen={isImagesModalOpen}
        title='تصاویر محصول'
        handleCloseModal={() => setIsImagesModalOpen((prev) => !prev)}
      >
        {/* showed Image */}
        <div className='w-full flex justify-center'>
          <div className='w-[450px] h-[450px]'>
            <Image
              loader={() =>
                images.filter((image) => image.id == showedImageId)[0].image
              }
              src={images.filter((image) => image.id == showedImageId)[0].image}
              alt='main-image'
              width={0}
              height={0}
              sizes='100vw'
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        {/* Other Images */}
        <div className='w-[800px] max-w-[800px] flex gap-[10px] overflow-x-auto overflow-y-auto pb-[10px] pt-[20px] pr-[10px] pl-[10px]'>
          {images.map((image, index) => {
            return (
              <div
                key={image.id}
                className={`${
                  image.id == showedImageId
                    ? "border-2 border-[#A4C0FF]"
                    : "border border-[#EBEBEB]"
                } p-[5px] rounded-[10px] cursor-pointer`}
                onClick={() => setShowedImageId(image.id)}
              >
                <div className='w-[75px] h-[75px]'>
                  <Image
                    loader={() => image.image}
                    src={image.image}
                    alt='image'
                    width={0}
                    height={0}
                    sizes='100vw'
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className='h-[5px]'></div>
      </DesktopModal>
    </>
  );
};

export default ProductpageImages;
