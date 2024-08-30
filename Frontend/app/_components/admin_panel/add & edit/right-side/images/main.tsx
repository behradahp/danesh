import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { FileUploader } from "react-drag-drop-files";

// Components
import DesktopModal from "@/app/_components/common/modals/desktop_modal";

// Icons
import AddImageIcon from "@/app/_components/icons/add_image_icon";
import ImageDeleteIcon from "@/app/_components/icons/image_delete_icon";

interface MainImage {
  file: File;
  url: string;
}

const fileTypes = ["JPG", "PNG", "GIF", "JPG", "TIFF", "WEBP"];

const ProductImages = ({
  productMainImage,
  productImages,
  productData,
  setProductData,
  reset,
}: {
  productMainImage?: string,
  productImages?: string[],
  productData: ProductData;
  setProductData: Dispatch<SetStateAction<ProductData>>;
  reset: boolean;
}) => {
  const [showableImages, setShowableImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<MainImage | null>(null);
  const [modalMainImage, setModalMainImage] = useState<string>("");
  const [addImageHover, setAddImageHover] = useState<boolean>(false);
  const [isImagesModalOpen, setIsImagesModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if(productMainImage) {
      setMainImage({
        file: productData.main_image!,
        url: productMainImage,
      });

      setModalMainImage(productMainImage);
    }

    if(productImages) {
      setShowableImages(productImages);
    }
  }, [productMainImage, productImages, productData.main_image])

  const handleAddImages = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files!.length) {
      const files: File[] = [];
      const showableImagesList: string[] = [];
      for (let index = 0; index < e.target.files.length; index++) {
        files.push(e.target.files[index]);
        showableImagesList.push(URL.createObjectURL(e.target.files[index]));
      }

      if (productData.main_image == null) {
        setMainImage({
          file: files[0],
          url: showableImagesList[0],
        });
        
        setProductData({...productData, main_image: files[0], images: [...files.splice(1)]});
        setShowableImages([...showableImages, ...showableImagesList.splice(1)]);

        setModalMainImage(showableImagesList[0]);

        return;
      }

      setProductData({...productData, images: [...productData.images, ...files]});
      setShowableImages([...showableImages, ...showableImagesList]);
    }
  };

  const handleAddDropedImages = (imageFiles: File[]) => {
    console.log(imageFiles)

    if (imageFiles && imageFiles.length) {
      const files: File[] = [];
      const showableImagesList: string[] = [];
      for (let index = 0; index < imageFiles.length; index++) {
        files.push(imageFiles[index]);
        showableImagesList.push(URL.createObjectURL(imageFiles[index]));
      }

      if (productData.main_image == null) {
        setMainImage({
          file: files[0],
          url: showableImagesList[0],
        });
        
        setProductData({...productData, main_image: files[0], images: [...files.splice(1)]});
        setShowableImages([...showableImages, ...showableImagesList.splice(1)]);

        setModalMainImage(showableImagesList[0]);

        return;
      }

      setProductData({...productData, images: [...productData.images, ...files]});
      setShowableImages([...showableImages, ...showableImagesList]);
    }
  };

  const handleChangeMainImage = () => {
    if (modalMainImage == mainImage?.url) return;

    const index = showableImages.findIndex((image) => image == modalMainImage);

    const newShowableImages = showableImages.filter(
      (image) => image != modalMainImage
    );
    const newProductImages = productData.images.filter(
      (image) => image != productData.images[index]
    );

    if (mainImage != null) {
      newProductImages.push(mainImage.file);
      newShowableImages.push(mainImage.url);
    }

    setMainImage({
      file: productData.images[index],
      url: showableImages[index],
    });

    setProductData({...productData, main_image: productData.images[index], images: newProductImages});
    setShowableImages(newShowableImages);
  };

  const handleDeleteImage = (index: number) => {
    const newShowableImages = showableImages.filter(
      (image) => image != showableImages[index]
    );
    const newProductImages = productData.images.filter(
      (image) => image != productData.images[index]
    );

    setProductData({...productData, images: newProductImages});
    setShowableImages(newShowableImages);
  };

  useEffect(() => {
    if(reset) {
      setShowableImages([]);
      setMainImage(null);
      setModalMainImage("");
    }
  }, [reset])

  return (
    <>
      {/* title */}
      <div className='flex items-center gap-[10px] mb-[5px]'>
        <span className='text-[16px] text-[#4E5A60] font-YekanBakhMedium'>
          تصاویر محصول
        </span>

        <span
          className={`${
            mainImage != null ? "" : "hidden"
          } text-[13px] text-[#633333] font-YekanBakhMedium cursor-pointer`}
          onClick={() => {
            setProductData({...productData, main_image: null, images: []});
            setShowableImages([]);
            setMainImage(null);
          }}
        >
          حذف تصاویر
        </span>
      </div>

      {/* images */}
      <FileUploader handleChange={handleAddDropedImages} name='file' types={fileTypes} multiple={true}>
      <div className='w-full flex gap-[7px] p-[8px] border-2 border-[#EBEBEB] rounded-[10px]'>
        {/* Add */}
        <label htmlFor='product_images'>
          <input
            type='file'
            id='product_images'
            accept='image/*'
            className='hidden'
            multiple
            onChange={(e) => handleAddImages(e)}
          />
          <div
            className='w-[150px] h-[160px] flex justify-center items-center border border-dashed border-[#707070] rounded-[10px] cursor-pointer hover:border-solid hover:border-[#C6D7FF]'
            onMouseEnter={() => setAddImageHover(true)}
            onMouseLeave={() => setAddImageHover(false)}
          >
            <AddImageIcon color={addImageHover ? "#6695FF" : undefined} />
          </div>
        </label>

        {/* Other Images */}
        <div className='flex-shrink-0 w-[160px] flex flex-row-reverse flex-wrap gap-[8px]'>
          {[0, 0, 0, 0].map((item, index) => {
            return (
              <div
                key={index}
                className='relative w-[75px] h-[75px] border border-[#EBEBEB] rounded-[10px] p-[3px]'
                onClick={() => setIsImagesModalOpen(true)}
              >
                {showableImages[index] != undefined ? (
                  <Image
                    loader={() => showableImages[index]}
                    src={showableImages[index]}
                    alt='product-images'
                    width={0}
                    height={0}
                    sizes='100vw'
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <></>
                )}

                <div
                  className={`${
                    index == 3 && showableImages.length > 4 ? "" : "hidden"
                  } absolute inset-0 w-full h-full flex justify-center items-center rounded-[10px] bg-black/30 cursor-pointer`}
                  onClick={() => setIsImagesModalOpen(true)}
                >
                  <span className='text-16px] text-white font-YekanBakhMedium'>
                    +{(showableImages.length - 4).toLocaleString("fa")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Image */}
        <div
          className='w-[150px] h-[160px] border border-[#EBEBEB] rounded-[10px] p-[3px]'
          onClick={() => setIsImagesModalOpen(true)}
        >
          {mainImage != null ? (
            <Image
              loader={() => mainImage.url}
              src={mainImage.url}
              alt='product-images'
              width={0}
              height={0}
              sizes='100vw'
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      </FileUploader>

      {/* Images Modal */}
      <DesktopModal
        isOpen={isImagesModalOpen}
        title='تصاویر محصول'
        handleCloseModal={() => setIsImagesModalOpen((prev) => !prev)}
      >
        <button
          className='absolute left-[30px] top-[30px] bg-[#6695FF] py-[5px] px-[10px] rounded-[5px] text-white font-YekanBakhMedium'
          onClick={handleChangeMainImage}
        >
          عکس اصلی
        </button>

        {/* showed Image */}
        <div className='w-full flex justify-center'>
          <div className='w-[450px] h-[450px]'>
            <Image
              loader={() => modalMainImage}
              src={modalMainImage}
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
          <div
            className={`relative border-2 border-[#b69a67] p-[5px] rounded-[10px] cursor-pointer`}
            onClick={() =>
              setModalMainImage(mainImage != null ? mainImage.url : "")
            }
          >
            <div className='absolute inset-0 w-full h-full rounded-[10px] z-[10] opacity-[0.001] hover:opacity-[1] transition-all duration-150'>
              <div
                className='absolute left-[-10px] top-[-10px] bg-[#bf3d3d] rounded-[100px] hover:scale-125 transition-all duration-150'
                onClick={(e) => {
                  e.stopPropagation();
                  setMainImage(null);
                }}
              >
                <ImageDeleteIcon color='white' />
              </div>
            </div>

            <div className='relative w-[75px] h-[75px] flex justify-center'>
              <span className='absolute top-[-23px] text-[12px] text-[#b69a67] font-YekanBakhMedium'>
                عکس اصلی
              </span>
              {mainImage != null ? (
                <Image
                  loader={mainImage != null ? () => mainImage.url : () => ""}
                  src={mainImage != null ? mainImage.url : ""}
                  alt='main-image'
                  width={0}
                  height={0}
                  sizes='100vw'
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
          {showableImages.map((image, index) => {
            return (
              <div
                key={index}
                className={`relative ${
                  image == modalMainImage
                    ? "border-2 border-[#A4C0FF]"
                    : "border border-[#EBEBEB]"
                } p-[5px] rounded-[10px] cursor-pointer`}
                onClick={() => setModalMainImage(image)}
              >
                <div className='absolute inset-0 w-full h-full rounded-[10px] z-[10] opacity-[0.001] hover:opacity-[1] transition-all duration-150'>
                  <div
                    className='absolute left-[-5px] top-[-5px] bg-[#bf3d3d] rounded-[100px] hover:scale-125 transition-all duration-150'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteImage(index);
                    }}
                  >
                    <ImageDeleteIcon color='white' />
                  </div>
                </div>
                <div className='w-[75px] h-[75px]'>
                  <Image
                    loader={() => image}
                    src={image}
                    alt='main-image'
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

export default ProductImages;
