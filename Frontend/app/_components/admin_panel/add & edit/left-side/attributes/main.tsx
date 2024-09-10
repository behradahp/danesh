import { Dispatch, SetStateAction, useState } from "react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import BrandAttribute from "./brand";
import DesktopModal from "@/app/_components/common/modals/desktop_modal";
import CustomAttributes from "./custom_attributes";
import ColorAttribute from "./color";

// Icons
import AddImageIcon from "@/app/_components/icons/add_image_icon";
import EditIcon from "@/app/_components/icons/edit_icon";

const ProductAttributes = ({
  productData,
  setProductData,
  reset,
  isInitialData,
}: {
  productData: ProductData;
  setProductData: Dispatch<SetStateAction<ProductData>>;
  reset: boolean;
  isInitialData?: boolean;
}) => {
  const [isAddAttributesOpen, setIsAddAttributesOpen] =
    useState<boolean>(false);
  const [attributeKey, setAttributeKey] = useState<string>("");
  const [attributeValue, setAttributeValue] = useState<string>("");
  const [attributeEditValue, setAttributeEditValue] = useState<number | null>(
    null
  );
  const [addAttributeHover, setAddAttributeHove] = useState<boolean>(false);

  const handleAddAttribute = () => {
    if (!attributeKey) {
      toast.error("ویژگی خالی است!", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
        closeOnClick: true,
        hideProgressBar: false,
        pauseOnHover: false,
      });
      return;
    }

    if (!attributeValue) {
      toast.error("مقدار خالی است!", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
        closeOnClick: true,
        hideProgressBar: false,
        pauseOnHover: false,
      });
      return;
    }

    setProductData({
      ...productData,
      attributes: [
        ...productData.attributes,
        {
          key: attributeKey,
          value: attributeValue,
        },
      ],
    });

    setAttributeKey("");
    setAttributeValue("");
    setAttributeEditValue(null);

    setIsAddAttributesOpen(false);
  };

  const handleDeleteAttribute = (key: string, value: string) => {
    const newAttributeList = productData.attributes.filter(
      (item) => item.key != key && item.value != value
    );

    setProductData({
      ...productData,
      attributes: newAttributeList,
    });
  };

  const handleEditAttribute = () => {
    const newAttributeList = productData.attributes;
    newAttributeList[attributeEditValue!].key = attributeKey;
    newAttributeList[attributeEditValue!].value = attributeValue;

    setProductData({
      ...productData,
      attributes: newAttributeList,
    });

    setIsAddAttributesOpen(false);
    setAttributeEditValue(null);
  };
  return (
    <>
      <div className='w-full m-h-[387px] border-2 border-[#E0E0E0] rounded-[10px] overflow-y-auto'>
        {/* Title */}
        <div className='flex'>
          <div className='w-[145.5px] h-[48.5px] flex justify-center items-center border-b-2 border-l-2 border-[#E0E0E0]'>
            <span className='text-[16px] text-[#4E5A60] font-YekanBakhMedium'>
              ویژگی
            </span>
          </div>
          <div className='flex-grow h-[48.5px] flex justify-center items-center border-b-2 border-[#E0E0E0]'>
            <span className='text-[16px] text-[#4E5A60] font-YekanBakhMedium'>
              نوع یا مقدار
            </span>
          </div>
        </div>

        {/* Brand */}
        <BrandAttribute
          productData={productData}
          setProductData={setProductData}
        />

        {/* Brand */}
        <ColorAttribute
          productData={productData}
          setProductData={setProductData}
          reset={reset}
        />

        <CustomAttributes
          productData={productData}
          setProductData={setProductData}
          reset={reset}
          isInitialData={isInitialData}
        />
        
        {productData.attributes.map((item, index) => {
          return (
            <div key={index} className='relative flex'>
              <div className='w-[145.5px] h-[48.5px] flex justify-center items-center border-b-2 border-l-2 border-[#E0E0E0]'>
                <span className='text-[16px] text-black font-YekanBakhMedium'>
                  {item.key}
                </span>
              </div>
              <div className='flex-grow h-[48.5px] flex justify-center items-center border-b-2 border-[#E0E0E0]'>
                <span className='text-[16px] text-black font-YekanBakhMedium'>
                  {item.value.slice(0, 35)}
                  {item.value.length > 30 ? "..." : ""}
                </span>
              </div>

              <div className='absolute inset-0 w-full h-full flex items-center pr-[130.5px] opacity-[0.01] hover:opacity-[1] transition-all ease-linear duration-200'>
                <div
                  className='w-[30px] h-[30px] flex justify-center items-center border border-[#4e5a60] rounded-[5px] hover:bg-[#c1d1da8a] transition-all ease-linear duration-150 cursor-pointer'
                  onClick={() => {
                    setAttributeEditValue(index);
                    setIsAddAttributesOpen(true);
                    setAttributeKey(item.key);
                    setAttributeValue(item.value);
                  }}
                >
                  <EditIcon color='#6695FF' />
                </div>
              </div>
            </div>
          );
        })}
        <div
          className='w-full h-[48.5px] flex items-center justify-center gap-[31.8px] cursor-pointer'
          onClick={() => setIsAddAttributesOpen(true)}
          onMouseEnter={() => setAddAttributeHove(true)}
          onMouseLeave={() => setAddAttributeHove(false)}
        >
          <AddImageIcon color={addAttributeHover ? "#6695FF" : undefined} />
          <span
            className={`text-[16px] ${
              addAttributeHover ? "text-[#6695FF]" : "text-[#4E5A60]"
            } font-YekanBakhMedium`}
          >
            اضافه کردن ویژگی
          </span>
        </div>
      </div>

      {/* Attributes Modal */}
      <DesktopModal
        isOpen={isAddAttributesOpen}
        title='اضافه کردن ویژگی'
        handleCloseModal={() => {
          setIsAddAttributesOpen(false);
          setAttributeEditValue(null);
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
            onChange={(e) => setAttributeKey(e.target.value)}
            defaultValue={
              attributeEditValue != null &&
              productData.attributes[attributeEditValue] != undefined
                ? productData.attributes[attributeEditValue!].key
                : ""
            }
          />

          <span className='text-[16px] text-[#4E5A60] font-YekanBakhMedium mt-[10px]'>
            نوع یا مقدار
          </span>

          <input
            type='text'
            className='w-[426px] border border-[#E0E0E0] rounded-[10px] p-[5px] font-YekanBakhMedium'
            onChange={(e) => {
              setAttributeValue(e.target.value);
            }}
            defaultValue={
              attributeEditValue != null &&
              productData.attributes[attributeEditValue] != undefined
                ? productData.attributes[attributeEditValue!].value
                : ""
            }
          />

          <div className='w-ful flex justify-evenly mt-[10px]'>
            <button
              className={`${
                attributeEditValue == null
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              } w-[169px] h-[35px] flex justify-center items-center rounded-[10px] border border-[#4E5A60]`}
              onClick={(e) => {
                if (attributeEditValue == null) return;

                handleDeleteAttribute(
                  productData.attributes[attributeEditValue].key,
                  productData.attributes[attributeEditValue].value
                );

                setIsAddAttributesOpen(false);
              }}
              disabled={attributeEditValue == 100 ? true : false}
            >
              <span className='text-[14px] text-[#4E5A60] font-YekanBakhMedium'>
                حذف
              </span>
            </button>
            <button
              className='w-[169px] h-[35px] flex justify-center items-center rounded-[10px] bg-[#6695FF]'
              onClick={
                attributeEditValue != null
                  ? handleEditAttribute
                  : handleAddAttribute
              }
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

export default ProductAttributes;
