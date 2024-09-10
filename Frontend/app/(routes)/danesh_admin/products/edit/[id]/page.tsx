"use client";

import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Audio } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import { urlToFile } from "@/app/functions/dataURLtoFile";

// Components
import PanelLayout from "@/app/_components/admin_panel/panel_layout";
import ProductImages from "@/app/_components/admin_panel/add & edit/right-side/images/main";
import ProductCategory from "@/app/_components/admin_panel/add & edit/right-side/categories/main";
import ProductPrice from "@/app/_components/admin_panel/add & edit/right-side/price/main";
import ProductAttributes from "@/app/_components/admin_panel/add & edit/left-side/attributes/main";

// Icons
import CheckIcon from "@/app/_components/icons/check_icon";

// api
import {
  deleteProduct,
  editProduct,
  getCategories,
  getProduct,
} from "@/app/actions/actions";

export default function EditProduct({ params }: { params: { id: string } }) {
  const router = useRouter();

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

  const [resData, setResData] = useState<Product | null>(null);

  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [isInitialData, setIsInitialData] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getProduct({ id: params.id });
      const data: Product = res.data;
      setResData(data);

      setTimeout(() => {
        setResData(null);
      }, 500);

      if (res.success) {
        const imageFiles: File[] = [];
        for (let image of data.images) {
          const imageFile = await urlToFile(image.image);

          imageFiles.push(imageFile);
        }

        setProductData({ ...productData, images: imageFiles });

        let imageFile = null;
        if (data.main_image) {
          imageFile = await urlToFile(data.main_image);
        }

        console.log(data.default_attributes);

        setProductData({
          categories: data.categories,
          name: data.name,
          description: data.description,
          discount_price: data.discount_price,
          price: data.price.toString(),
          main_image: imageFile,
          images: imageFiles,
          attributes: data.attributes,
          default_attributes: data.default_attributes,
          brand: data.brand,
          stock: data.stock,
          colors: data.colors,
        });

        setInitialLoading(false);

        setTimeout(() => setIsInitialData(false), 1000);
      } else {
        setInitialLoading(false);
      }
    };

    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteProduct = async () => {
    const res = await deleteProduct({ id: params.id });

    if (res.success) {
      router.push("/danesh_admin/products/all");
    } else {
      toast.error("خطایی رخ داده است. لطفا دوباره تلاش کنید.!", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
        closeOnClick: true,
        hideProgressBar: false,
        pauseOnHover: false,
      });
    }
  };

  const handleEditProduct = async () => {
    let error = false;
    if (productData.categories.length == -1) {
      error = true;
      toast.error("انتخاب دسته بندی اجباریست!", {
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
      const res = await editProduct({ data: formData, id: params.id });
      if (res.success) {
        setLoading(false);
        toast.success("محصول ویرایش شد.", {
          position: "top-right",
          autoClose: 5000,
          transition: Bounce,
          closeOnClick: true,
          hideProgressBar: false,
          pauseOnHover: false,
        });
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

  if (initialLoading) {
    return (
      <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
        <Audio height={60} width={60} color='black' />
      </div>
    );
  }

  return (
    <>
      <PanelLayout section_id='2'>
        <div className='flex-grow w-[100%] pt-[26px] px-[30px] dsk:px-[62px] overflow-y-auto'>
          {/* ---------------------------- Title ----------------------------------- */}
          <div className='flex gap-[490px]'>
            <span className='text-[24px] text-back font-YekanBakhBold'>
              ویرایش محصول
            </span>

            <div className='flex gap-[15px]'>
              <button
                className='w-[200px] h-[35px] flex justify-center items-center text-[14px] text-black border border-[#707070] font-YekanBakhMedium rounded-[5px]'
                onClick={handleDeleteProduct}
              >
                {loading ? (
                  <Audio height={20} width={20} color='white' />
                ) : (
                  "حذف"
                )}
              </button>
              <button
                className='w-[200px] h-[35px] flex justify-center items-center text-[14px] text-white font-YekanBakhMedium bg-[#6695FF] rounded-[5px]'
                onClick={handleEditProduct}
              >
                {loading ? (
                  <Audio height={20} width={20} color='white' />
                ) : (
                  "ویرایش"
                )}
              </button>
            </div>
          </div>

          <div className='h-[35px]'></div>

          {/* ---------------------------- Content ----------------------------------- */}
          <div className='w-full flex justify-between gap-[10px]'>
            {/* ---------------------------- Right Side ----------------------------------- */}
            <div className='w-[529px] h-[710px] flex flex-col py-[14px] px-[17px] bg-white rounded-[10px]'>
              {/* ---------------------------- Add Image ----------------------------------- */}
              <ProductImages
                productMainImage={resData?.main_image}
                productImages={resData?.images.map((item) => item.image)}
                productData={productData}
                setProductData={setProductData}
                reset={false}
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
                productPrice={productData.price}
                productDiscountPrice={productData.discount_price}
                productData={productData}
                setProductData={setProductData}
                reset={false}
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
                reset={false}
                isInitialData={isInitialData}
              />
            </div>
          </div>
        </div>

        <div className='h-[30px]'></div>
      </PanelLayout>
    </>
  );
}
