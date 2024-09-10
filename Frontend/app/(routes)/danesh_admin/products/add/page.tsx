"use client";

import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Audio } from "react-loader-spinner";

// Components
import PanelLayout from "@/app/_components/admin_panel/panel_layout";
import ProductImages from "@/app/_components/admin_panel/add & edit/right-side/images/main";
import ProductCategory from "@/app/_components/admin_panel/add & edit/right-side/categories/main";
import ProductPrice from "@/app/_components/admin_panel/add & edit/right-side/price/main";
import ProductAttributes from "@/app/_components/admin_panel/add & edit/left-side/attributes/main";

// Icons
import CheckIcon from "@/app/_components/icons/check_icon";

// api
import { createProduct } from "@/app/actions/actions";

export default function AddProduct() {
  const [productData, setProductData] = useState<ProductData>({
    categories: [],
    name: "",
    description: "",
    discount_price: "",
    price: "",
    main_image: null,
    images: [],
    attributes: [],
    default_attributes: [],
    brand: "",
    stock: false,
    colors: [],
  });

  const [loading, setLoading] = useState<boolean>(false);

  const [resetEverything, setResetEverything] = useState<boolean>(false);

  const handleAddProduct = async () => {
    let error = false;
    if (productData.categories.length == -1) {
      error = true;
      toast.error("انتخاب حداقل یک دسته بندی اجباریست!", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
        closeOnClick: true,
        hideProgressBar: false,
        pauseOnHover: false,
      });
    }
    if (productData.name == "") {
      error = true;
      toast.error("انتخاب اسم محصول اجباریست!", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
        closeOnClick: true,
        hideProgressBar: false,
        pauseOnHover: false,
      });
    }
    for (const att of productData.default_attributes) {
      if (!att.value) {
        error = true;
        toast.error("مقادیر ویژگی‌ها خالی است!", {
          position: "top-right",
          autoClose: 5000,
          transition: Bounce,
          closeOnClick: true,
          hideProgressBar: false,
          pauseOnHover: false,
        });
        break;
      }
    }
    if (!error) {
      setLoading(true);
      const formData = new FormData();
      formData.append("categories", JSON.stringify(productData.categories));
      formData.append("name", productData.name);
      formData.append(
        "description",
        productData.description ? productData.description : " No description"
      );
      formData.append("price", productData.price);
      formData.append("discount_price", productData.discount_price ?? "0");
      formData.append("brand", productData.brand);
      formData.append("stock", productData.stock.toString());
      formData.append("colors", JSON.stringify(productData.colors));
      const userJson = localStorage.getItem("user");
      if (!userJson) {
        toast.error("خطایی رخ داده است. لطفا دوباره تلاش کنید.!", {
          position: "top-right",
          autoClose: 5000,
          transition: Bounce,
          closeOnClick: true,
          hideProgressBar: false,
          pauseOnHover: false,
        });
        setLoading(false);
        return;
      }
      const admin = JSON.parse(userJson);
      formData.append("admin_username", admin.username);
      formData.append("lats_update_admin_username", admin.username);
      if (productData.attributes.length != 0) {
        formData.append("attributes", JSON.stringify(productData.attributes));
      }
      if (productData.default_attributes.length != 0) {
        formData.append(
          "default_attributes",
          JSON.stringify(productData.default_attributes)
        );
      }
      if (productData.main_image != null) {
        formData.append("main_image", productData.main_image);
      }
      if (productData.images.length != 0) {
        if (productData.images.length > 1) {
          for (let index = 0; index < productData.images.length - 1; index++) {
            formData.append("images", productData.images[index]);
          }
        }
      }
      const res = await createProduct(formData);
      if (res.success) {
        setLoading(false);
        toast.success("محصول اصافه شد.", {
          position: "top-right",
          autoClose: 5000,
          transition: Bounce,
          closeOnClick: true,
          hideProgressBar: false,
          pauseOnHover: false,
        });

        setProductData({
          categories: [],
          name: "",
          description: "",
          discount_price: "",
          price: "",
          main_image: null,
          images: [],
          attributes: [],
          default_attributes: [],
          brand: "",
          stock: false,
          colors: [],
        });
        setResetEverything(true);
        setTimeout(() => {
          setResetEverything(false);
        }, 500);
        return;
      }
      toast.error("خطایی رخ داده است. لطفا دوباره تلاش کنید.!", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
        closeOnClick: true,
        hideProgressBar: false,
        pauseOnHover: false,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <PanelLayout section_id='3'>
        <div className='flex-grow w-[100%] pt-[26px] px-[30px] dsk:px-[62px] overflow-y-auto'>
          {/* ---------------------------- Title ----------------------------------- */}
          <div className='flex gap-[600px]'>
            <span className='text-[24px] text-back font-YekanBakhBold'>
              اضافه کردن محصول
            </span>

            <button
              className='w-[200px] h-[35px] flex justify-center items-center text-[14px] text-white font-YekanBakhMedium bg-[#6695FF] rounded-[5px]'
              onClick={handleAddProduct}
            >
              {loading ? (
                <Audio height={20} width={20} color='white' />
              ) : (
                "اضافه کردن"
              )}
            </button>
          </div>

          <div className='h-[35px]'></div>

          {/* ---------------------------- Content ----------------------------------- */}
          <div className='w-full flex justify-between gap-[10px]'>
            {/* ---------------------------- Right Side ----------------------------------- */}
            <div className='w-[529px] h-[710px] flex flex-col py-[14px] px-[17px] bg-white rounded-[10px]'>
              {/* ---------------------------- Add Image ----------------------------------- */}
              <ProductImages
                productData={productData}
                setProductData={setProductData}
                reset={resetEverything}
              />

              {/* ---------------------------- Product Name ----------------------------------- */}
              <div className='h-[20px]'></div>
              {/* title */}
              <span className='text-[16px] text-[#4E5A60] font-YekanBakhMedium mb-[5px]'>
                نام محصول
              </span>

              <input
                type='text'
                className='w-full border border-[#E0E0E0] rounded-[10px] p-[5px]'
                value={productData.name}
                onChange={(e) =>
                  setProductData({ ...productData, name: e.target.value })
                }
              />

              {/* ---------------------------- Product Category ----------------------------------- */}
              <div className='h-[20px]'></div>
              <ProductCategory
                productData={productData}
                setProductData={setProductData}
              />

              {/* ---------------------------- Product Price ----------------------------------- */}
              <ProductPrice
                productData={productData}
                setProductData={setProductData}
                reset={resetEverything}
              />

              {/* ---------------------------- Stock ----------------------------------- */}
              <div className='h-[20px]'></div>
              <div className='flex gap-[10px] items-center'>
                <span className='text-[17px] text-[#65716F] font-YekanBakhMedium'>
                  استوک
                </span>
                <div
                  className={`${
                    productData.stock ? "hidden" : ""
                  } w-[15px] h-[15px] border border-[#E0E0E0] rounded cursor-pointer`}
                  onClick={() =>
                    setProductData({ ...productData, stock: true })
                  }
                ></div>
                <div
                  className={`${
                    !productData.stock ? "hidden" : ""
                  } w-[15px] h-[15px] bg-[#6695FF] border border-[#E0E0E0] rounded cursor-pointer`}
                  onClick={() =>
                    setProductData({ ...productData, stock: false })
                  }
                >
                  <CheckIcon />
                </div>
              </div>
            </div>

            {/* ---------------------------- Left Side ----------------------------------- */}
            <div className='w-[529px] h-[710px] flex flex-col py-[14px] px-[28px] bg-white rounded-[10px]'>
              {/* ---------------------------- Product Description ----------------------------------- */}
              {/* title */}
              <span className='text-[16px] text-[#4E5A60] font-YekanBakhMedium mb-[5px]'>
                توضیحات
              </span>
              <textarea
                name=''
                id=''
                className='w-full min-h-[180px] max-h-[180px] p-[10px] border-2 border-[#E0E0E0] rounded-[10px]'
                value={productData.description}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value,
                  })
                }
              ></textarea>

              {/* ---------------------------- Product Attributes ----------------------------------- */}
              <div className='h-[20px]'></div>
              <ProductAttributes
                productData={productData}
                setProductData={setProductData}
                reset={resetEverything}
              />
            </div>
          </div>
        </div>

        <div className='h-[30px]'></div>
      </PanelLayout>
    </>
  );
}
