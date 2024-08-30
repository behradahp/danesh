import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { productColors } from "@/app/constants/product_colors";

// Components
import DesktopModal from "@/app/_components/common/modals/desktop_modal";

// Icons
import EditIcon from "@/app/_components/icons/edit_icon";

const ColorAttribute = ({
  productData,
  setProductData,
  reset,
}: {
  productData: ProductData;
  setProductData: Dispatch<SetStateAction<ProductData>>;
  reset: boolean;
}) => {
  const [isBrandAttributeModalOpen, setIsBrandAttributeModalOpen] =
    useState<boolean>(false);
  const [selectedColors, setSelectedColors] = useState<Color[]>([]);

  const handleSelectColor = (selectedColor: Color) => {
    for(let color of selectedColors) {
      if(color.hex === selectedColor.hex) {
        const newColorList = selectedColors.filter((color) => color.hex != selectedColor.hex);
        setSelectedColors(newColorList);
        return;
      }
    }

    setSelectedColors([...selectedColors, selectedColor]);
  }

  const isSelectedColor = (selectedColor: Color) => {
    for(let color of selectedColors) {
      if(color.hex === selectedColor.hex) {
        return true;
      }
    }

    return false;
  }

  useEffect(() => {
    if(reset) {
      setSelectedColors([]);
    }

    setSelectedColors(productData.colors);
  }, [reset, productData])

  return (
    <>
      <div className='relative flex'>
        <div className='w-[145.5px] h-[48.5px] flex justify-center items-center border-b-2 border-l-2 border-[#E0E0E0]'>
          <span className='text-[16px] text-black font-YekanBakhMedium'>
            ‌رنگ‌ها
          </span>
        </div>
        <div className='flex-grow h-[48.5px] flex justify-center items-center border-b-2 border-[#E0E0E0]'>
        <div className='w-full flex flex-wrap gap-[10px] p-[10px] rounded'>
            {productData.colors.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`w-[20px] h-[20px] border-[1px] border-black rounded-[100px] cursor-pointer`}
                  style={{ backgroundColor: item.hex }}
                ></div>
              );
            })}
          </div>
        </div>

        <div className='absolute inset-0 w-full h-full flex items-center pr-[130.5px] opacity-[0.01] hover:opacity-[1] transition-all ease-linear duration-200'>
          <div
            className='w-[30px] h-[30px] flex justify-center items-center border border-[#4e5a60] rounded-[5px] hover:bg-[#c1d1da8a] transition-all ease-linear duration-150 cursor-pointer'
            onClick={() => {
              setIsBrandAttributeModalOpen(true);
            }}
          >
            <EditIcon color='#6695FF' />
          </div>
        </div>
      </div>

      {/* Attributes Modal */}
      <DesktopModal
        isOpen={isBrandAttributeModalOpen}
        title='اضافه کردن ویژگی'
        handleCloseModal={() => {
          setIsBrandAttributeModalOpen(false);
        }}
      >
        <div className='flex flex-col gap-[10px] p-[17px]'>
          {/* title */}
          <span className='text-[16px] text-[#4E5A60] font-YekanBakhMedium'>
            ویژگی
          </span>

          <input
            type='text'
            className='w-[426px] border border-[#E0E0E0] rounded-[10px] p-[5px] font-YekanBakhMedium'
            defaultValue={"رنگ"}
            disabled={true}
          />

          <span className='text-[16px] text-[#4E5A60] font-YekanBakhMedium mt-[10px]'>
            رنگ‌ها
          </span>

          <div className='w-[426px] flex flex-wrap gap-[10px] p-[10px] rounded'>
            {productColors.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${isSelectedColor(item) ? 'border-[4px] border-green-700' : 'border-[1px] border-black'} w-[30px] h-[30px] rounded-[100px] cursor-pointer`}
                  style={{ backgroundColor: item.hex }}
                  onClick={() => handleSelectColor(item)}
                ></div>
              );
            })}
          </div>

          <div className='w-ful flex justify-evenly mt-[10px]'>
            <button
              className={`w-[169px] h-[35px] flex justify-center items-center rounded-[10px] border border-[#4E5A60] cursor-not-allowed`}
              disabled={true}
            >
              <span className='text-[14px] text-[#4E5A60] font-YekanBakhMedium'>
                حذف
              </span>
            </button>
            <button
              className='w-[169px] h-[35px] flex justify-center items-center rounded-[10px] bg-[#6695FF]'
              onClick={() => {
                setIsBrandAttributeModalOpen(false);
                setProductData({ ...productData, colors: selectedColors });
              }}
            >
              <span className='text-[14px] text-white font-YekanBakhMedium'>
                تایید
              </span>
            </button>
          </div>
        </div>
      </DesktopModal>
    </>
  );
};

export default ColorAttribute;
