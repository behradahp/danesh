"use client";

import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Audio } from "react-loader-spinner";

// Components
import Header from "@/app/_components/common/header/header";
import BreadCrumb from "@/app/_components/common/beadcrumb/main";
import Footer from "@/app/_components/common/footer/footer";
import CategoryPageFilterTitle from "@/app/_components/category_page/filters/filters_title";
import CategoryPageSorts from "@/app/_components/category_page/sorts/sorts";
import CategoryPageFilters from "@/app/_components/category_page/filters/filters";
import ProductCard from "@/app/_components/common/cards/product_card";

// Api
import { getCategory, getCategoryProducts } from "@/app/actions/actions";

// Consts
import { url } from "@/app/constants/url";

const ProductPage = ({ params }: { params: { id: string; name: string } }) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductsAndCategory = async () => {
      const categoryRes = await getCategory({ id: params.id });
      const productsRes = await getCategoryProducts({ id: params.id });

      if (categoryRes.success && productsRes.success) {
        const categoryData: Category = categoryRes.data;
        const productsData: Product[] = productsRes.data;
        setCategory(categoryData);
        setProducts(productsData);
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

    fetchProductsAndCategory();
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

      <BreadCrumb category={category!} productName='' />

      <div className='h-[25px]'></div>

      <div className='px-[55px]'>
        <div className='w-full flex justify-between items-center'>
          <div className='flex gap-[20px]'>
            <CategoryPageFilterTitle />
            <CategoryPageSorts />
          </div>

          <span className="text-[15px] text-[#707070] font-YekanBakhMedium">محصول {products?.length.toLocaleString("fa")}</span>
        </div>

        <div className='flex gap-[20px]'>
          <CategoryPageFilters />

          <div className='w-full h-full flex flex-wrap gap-[20px] mt-[17px]'>
            {products?.map((item) => {
              return (
                <div key={item.id}>
                  <ProductCard data={item} url={url} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className='h-[86px]'></div>

      <Footer />
    </main>
  );
};

export default ProductPage;
