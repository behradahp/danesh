"use client";

import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Audio } from "react-loader-spinner";

// Components
import Header from "@/app/_components/common/header/header";
import BreadCrumb from "@/app/_components/common/beadcrumb/main";
import ProductpageImages from "@/app/_components/product_page/images/main";
import ProductPageAttributeAndColor from "@/app/_components/product_page/attribute_color/main";
import ProductPagePriceAndOptions from "@/app/_components/product_page/price_options/main";
import ProductPageDescription from "@/app/_components/product_page/description/main";
import ProductPageAttributes from "@/app/_components/product_page/attributes/main";
import DaneshFeatures from "@/app/_components/home_page/danesh_features";
import Footer from "@/app/_components/common/footer/footer";

// Api
import { getProduct } from "@/app/actions/actions";

const ProductPage = ({ params }: { params: { id: string; name: string } }) => {
  const [productData, setProductData] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [descriptionOptions, setDescriptionOptions] = useState<number>(0);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getProduct({ id: params.id });
      if (res.success) {
        const data: Product = res.data;
        setProductData(data);
        setLoading(false);
        return;
      }

      toast.error("مشکلی پیش آمده است!", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
        closeOnClick: true,
        hideProgressBar: false,
        pauseOnHover: false,
      });
      setLoading(false);
    };

    fetchProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
        <Audio height={60} width={60} color='black' />
      </div>
    );
  }

  return (
    <main className='bg-[#FDFCFF]'>
      <Header />

      <div className='h-[12.5px]'></div>

      <BreadCrumb
        category={productData?.categories[0]}
        productName={productData?.name}
      />

      <div className='h-[25px]'></div>

      <div className='px-[55px]'>
        <div className='flex gap-[100px]'>
          {/* Images */}
          <ProductpageImages
            images={[
              { id: "0", image: productData!.main_image },
              ...productData!.images,
            ]}
            discountPercent={productData!.discount}
          />

          {/* Product Name & Informations */}
          <div className='flex-grow flex flex-col gap-[66px]'>
            {/* Product Name */}
            <span className='text-[24px] text-black font-YekanBakhMedium'>
              {productData?.name}
            </span>

            {/* Product Information */}
            <div className='w-full flex justify-between'>
              {/* Attributes & Colors */}
              <ProductPageAttributeAndColor
                attributes={[...productData!.attributes, ...productData!.default_attributes]}
                colors={productData!.colors}
              />

              {/* Price and Options */}
              <ProductPagePriceAndOptions
                price={productData!.price}
                discountPrice={productData!.discount_price}
              />
            </div>
          </div>
        </div>

        <div className='h-[78px]'></div>

        <div className='w-[872px]'>
          <div className='relative w-full flex justify-center gap-[50px]'>
            <div
              className={`absolute top-[25px] ${
                descriptionOptions == 0 ? "left-[460px]" : "left-[340px]"
              } h-[3px] w-[75px] bg-[#8A53B4] transition-all ease-in-out duration-300`}
            ></div>
            <span
              className='text-[20px] text-[#263238] font-YekanBakhMedium cursor-pointer'
              onClick={() => setDescriptionOptions(0)}
            >
              توضیحات
            </span>
            <span
              className='text-[20px] text-[#263238] font-YekanBakhMedium cursor-pointer'
              onClick={() => setDescriptionOptions(1)}
            >
              مشخصات
            </span>
          </div>

          <div className='h-[34px]'></div>

          {descriptionOptions == 0 ? (
            <ProductPageDescription
              description={productData!.description}
              image={productData!.main_image}
            />
          ) : (
            <ProductPageAttributes attributes={[...productData!.default_attributes, ...productData!.attributes]} />
          )}
        </div>

        <div className='h-[59px]'></div>

        <DaneshFeatures />

        <div className='h-[51px]'></div>
      </div>

      <Footer />
    </main>
  );
};

export default ProductPage;
