import { Dispatch, SetStateAction, useEffect, useState } from "react";

// Components
import DesktopModal from "@/app/_components/common/modals/desktop_modal";

// Icons
import EditIcon from "@/app/_components/icons/edit_icon";

import customAttributes from "@/app/constants/default_attributes";

let categoryIds: number[] = [];

const CustomAttributes = ({
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
  const [isBrandAttributeModalOpen, setIsBrandAttributeModalOpen] =
    useState<boolean>(false);

  const [defaultAttributes, setDefaultAttributes] = useState<
    DefaultAttribute[]
  >([]);

  const [selectedAttribute, setSelectedAttribute] =
    useState<DefaultAttribute | null>(null);

  const [
    selectedproductDefaultAttributeIndex,
    setSelectedproductDefaultAttributeIndex,
  ] = useState<number>(-1);

  const updateCategoryIds = () => {
    categoryIds = [];
    for(const category of productData.categories) categoryIds.push(category.id);
  }

  const checkForChanges = () => {
    let firstOneChangableIds: number = 0;
    let secondOneChangableIds: number = 0;

    for(const categoryId of categoryIds) {
      if(categoryId === 1) firstOneChangableIds = 1;
      if(categoryId === 2) firstOneChangableIds = 2;
      if(categoryId === 6) firstOneChangableIds = 6;
    }

    for(const category of productData.categories) {
      if(category.id === 1) secondOneChangableIds = 1;
      if(category.id === 2) secondOneChangableIds = 2;
      if(category.id === 6) secondOneChangableIds = 6;
    }

    if(secondOneChangableIds === firstOneChangableIds) return false;

    return true;
  }

  useEffect(() => {
    if (!productData) return;

    if(isInitialData) {
      updateCategoryIds();
    }

    if(!checkForChanges()) return;

    for (const defaultCategories of customAttributes) {
      const attributesList: Attribute[] = [];
      for (const category of productData.categories) {
        if (defaultCategories.id === category.id) {
          for (const attribute of defaultCategories.attributes) {
            attributesList.push({
              key: attribute.title,
              value: attribute.unit === null ? "" : ` ${attribute.unit[0]}`,
            });
          }
          
          if (!isInitialData) {
            setProductData({
              ...productData,
              default_attributes: attributesList,
            });
          }

          setDefaultAttributes(defaultCategories.attributes);

          updateCategoryIds();
          return;
        }
      }
    }
    setProductData({ ...productData, default_attributes: [] });
    updateCategoryIds();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productData.categories]);

  useEffect(() => {
    if (reset) {
      setDefaultAttributes([]);
      setSelectedAttribute(null);
      setSelectedproductDefaultAttributeIndex(-1);
    }
  }, [reset]);

  return (
    <>
      {productData.default_attributes.map((attribute, index) => {
        return (
          <div key={index} className='relative flex'>
            <div className='w-[145.5px] h-[48.5px] flex justify-center items-center border-b-2 border-l-2 border-[#E0E0E0]'>
              <span className='text-[16px] text-black font-YekanBakhMedium'>
                {attribute.key}
              </span>
            </div>
            <div className='flex-grow h-[48.5px] flex justify-center items-center border-b-2 border-[#E0E0E0]'>
              <span dir="ltr" className='text-[16px] text-black font-YekanBakhMedium'>
                {attribute?.value.split(" ")[0] ? attribute?.value : ""}
              </span>
            </div>

            <div className='absolute inset-0 w-full h-full flex items-center pr-[130.5px] opacity-[0.01] hover:opacity-[1] transition-all ease-linear duration-200'>
              <div
                className='w-[30px] h-[30px] flex justify-center items-center border border-[#4e5a60] rounded-[5px] hover:bg-[#c1d1da8a] transition-all ease-linear duration-150 cursor-pointer'
                onClick={() => {
                  setSelectedproductDefaultAttributeIndex(index);
                  setSelectedAttribute(defaultAttributes[index]);
                  setIsBrandAttributeModalOpen(true);
                }}
              >
                <EditIcon color='#6695FF' />
              </div>
            </div>
          </div>
        );
      })}

      {/* Attributes Modal */}
      <DesktopModal
        isOpen={isBrandAttributeModalOpen}
        title='اضافه کردن ویژگی'
        handleCloseModal={() => {
          setIsBrandAttributeModalOpen(false);
        }}
      >
        {selectedproductDefaultAttributeIndex === -1 ? (
          <></>
        ) : (
          <div className='flex flex-col gap-[10px] p-[17px]'>
            {/* title */}
            <span className='text-[16px] text-[#4E5A60] font-YekanBakhMedium'>
              ویژگی
            </span>

            <input
              type='text'
              className='w-[426px] border border-[#E0E0E0] rounded-[10px] p-[5px] font-YekanBakhMedium'
              defaultValue={selectedAttribute?.title}
              disabled={true}
            />

            <span className='text-[16px] text-[#4E5A60] font-YekanBakhMedium mt-[10px]'>
              نوع یا مقدار
            </span>

            {selectedAttribute?.options !== null ? (
              <>
                <div className='w-[426px] flex gap-[10px]'>
                  {selectedAttribute?.options.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`px-[20px] border ${
                          selectedproductDefaultAttributeIndex != -1 &&
                          productData.default_attributes[
                            selectedproductDefaultAttributeIndex
                          ]?.value === item
                            ? "border-[#6695FF]"
                            : "border-[#E0E0E0]"
                        } rounded-[10px] hover:border-[#C6D7FF] cursor-pointer`}
                        onClick={() => {
                          if (selectedproductDefaultAttributeIndex === -1)
                            return;
                          const newDefaultAttributesList =
                            productData.default_attributes;
                          newDefaultAttributesList[
                            selectedproductDefaultAttributeIndex
                          ].value = item;
                          setProductData({
                            ...productData,
                            default_attributes: newDefaultAttributesList,
                          });
                        }}
                      >
                        <span className='text-[14px] text-black font-YekanBakhMedium'>
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : selectedAttribute.unit != null ? (
              <>
                <div className='w-[426px] flex gap-[10px]'>
                  <div
                    className='w-[36px] h-[36px] flex justify-center items-center border border-[#E0E0E0] rounded-[10px] hover:border-[#6695FF] cursor-pointer'
                    onClick={() => {
                      if (selectedproductDefaultAttributeIndex === -1) return;
                      const unit =
                        productData.default_attributes[
                          selectedproductDefaultAttributeIndex
                        ]?.value.split(" ")[1];

                      let unitIndex = selectedAttribute.unit?.indexOf(unit);
                      unitIndex! += 1;
                      if (unitIndex === selectedAttribute.unit!.length)
                        unitIndex = 0;

                      const newDefaultAttributesList =
                        productData.default_attributes;

                      newDefaultAttributesList[
                        selectedproductDefaultAttributeIndex
                      ].value =
                        newDefaultAttributesList[
                          selectedproductDefaultAttributeIndex
                        ]?.value.split(" ")[0] +
                        " " +
                        selectedAttribute!.unit![unitIndex!];

                      setProductData({
                        ...productData,
                        default_attributes: newDefaultAttributesList,
                      });
                    }}
                  >
                    {selectedproductDefaultAttributeIndex === -1
                      ? ""
                      : productData.default_attributes[
                          selectedproductDefaultAttributeIndex
                        ]?.value.split(" ")[1]}
                  </div>
                  <input
                    type='text'
                    className='flex-grow border border-[#E0E0E0] rounded-[10px] p-[5px] font-YekanBakhMedium'
                    onChange={(e) => {
                      if (selectedproductDefaultAttributeIndex === -1) return;
                      const newDefaultAttributesList =
                        productData.default_attributes;
                      newDefaultAttributesList[
                        selectedproductDefaultAttributeIndex
                      ].value =
                        e.target?.value +
                        " " +
                        newDefaultAttributesList[
                          selectedproductDefaultAttributeIndex
                        ]?.value.split(" ")[1];
                      setProductData({
                        ...productData,
                        default_attributes: newDefaultAttributesList,
                      });
                    }}
                    defaultValue={
                      selectedproductDefaultAttributeIndex == -1
                        ? ""
                        : productData.default_attributes[
                            selectedproductDefaultAttributeIndex
                          ]?.value.split(" ")[0]
                    }
                  />
                </div>
              </>
            ) : (
              <input
                type='text'
                className='w-[426px] border border-[#E0E0E0] rounded-[10px] p-[5px] font-YekanBakhMedium'
                onChange={(e) => {
                  if (selectedproductDefaultAttributeIndex === -1) return;
                  const newDefaultAttributesList =
                    productData.default_attributes;
                  newDefaultAttributesList[
                    selectedproductDefaultAttributeIndex
                  ].value = e.target?.value;
                  setProductData({
                    ...productData,
                    default_attributes: newDefaultAttributesList,
                  });
                }}
                defaultValue={
                  selectedproductDefaultAttributeIndex == -1
                    ? ""
                    : productData.default_attributes[
                        selectedproductDefaultAttributeIndex
                      ]?.value
                }
              />
            )}

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
                }}
              >
                <span className='text-[14px] text-white font-YekanBakhMedium'>
                  تایید
                </span>
              </button>
            </div>
          </div>
        )}
      </DesktopModal>
    </>
  );
};

export default CustomAttributes;
