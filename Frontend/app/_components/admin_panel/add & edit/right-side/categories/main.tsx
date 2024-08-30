import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import useClickOutside from "@/app/hooks/useClickOutside";

// Icons
import ChevronDownIcon from "@/app/_components/icons/chevron_down_icon";
import CheckIcon from "@/app/_components/icons/check_icon";

// api
import { getCategories } from "@/app/actions/actions";

const ProductCategory = ({
  productData,
  setProductData,
}: {
  productData: ProductData;
  setProductData: Dispatch<SetStateAction<ProductData>>;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    setIsCategoryOptionsOpen(false);
  });

  const [isCategoryOptionsOpen, setIsCategoryOptionsOpen] =
    useState<boolean>(false);
  const [categories, setCategories] = useState<Category[] | null>(null);

  const getCategoryOptions = () => {
    if (!categories || productData.categories.length == 0) {
      return "انتخاب دسته بندی";
    }

    let categoriesString = "";

    for (let category of productData.categories) {
      categoriesString += category.name;
      categoriesString += "، ";
    }

    const lastCommaIndex = categoriesString.lastIndexOf("،");
    categoriesString = categoriesString.slice(0, lastCommaIndex);

    return categoriesString;
  };

  const handleSelectCategory = (selectedCategory: Category) => {
    for (const category of productData.categories) {
      if (category.id === selectedCategory.id) {
        const newCategories = productData.categories.filter(
          (item) => item.id != selectedCategory.id
        );
        setProductData({ ...productData, categories: newCategories });
        return;
      }
    }

    setProductData({
      ...productData,
      categories: [...productData.categories, selectedCategory],
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();

      if (res.success) {
        setCategories(res.data);
      }
    };

    fetchCategories();
  }, []);

  const isSelected = (selectedCategory: Category) => {
    for (const category of productData.categories) {
      if (category.id === selectedCategory.id) {
        return true;
      }
    }
    return false;
  };
  return (
    <>
      {/* title */}
      <span className='text-[16px] text-[#4E5A60] font-YekanBakhMedium mb-[5px]'>
        دسته بندی
      </span>

      <div
        className='relative w-full h-[35.6px] flex justify-between items-center border border-[#E0E0E0] rounded-[10px] p-[5px] cursor-pointer'
        onClick={() => setIsCategoryOptionsOpen((prev) => !prev)}
        ref={ref}
      >
        <span className='text-[16px] text-black font-YekanBakhMedium'>
          {getCategoryOptions()}
        </span>

        <ChevronDownIcon />

        {/* category options */}
        <div
          className={`${
            isCategoryOptionsOpen ? "" : "hidden"
          } absolute left-0 top-[40px] w-full flex flex-col gap-[10px] p-[10px] bg-white rounded-[10px] shadow-default z-20`}
        >
          {categories?.map((category, index) => {
            return (
              <div
                key={category.id.toString()}
                className='w-full flex gap-[10px] items-center p-[5px] hover:bg-[#C6D7FF] rounded-[5px] cursor-pointer'
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectCategory(category);
                }}
              >
                <div
                  className={`${
                    isSelected(category) ? "hidden" : ""
                  } w-[15px] h-[15px] border border-[#E0E0E0] rounded`}
                ></div>
                <div
                  className={`${
                    !isSelected(category) ? "hidden" : ""
                  } w-[15px] h-[15px] bg-[#6695FF] border border-[#E0E0E0] rounded`}
                >
                  <CheckIcon />
                </div>

                <span className='text-[16px] text-black font-YekanBakhMedium'>
                  {category.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductCategory;
