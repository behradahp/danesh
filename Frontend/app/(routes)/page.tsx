// Components
import Header from "@/app/_components/common/header/header";
import HomeBanners from "@/app/_components/home_page/home_banners";
import Categories from "@/app/_components/home_page/categories";
import SuggestedProducts from "@/app/_components/home_page/suggested_products";
import DaneshServices from "@/app/_components/home_page/danesh_services";
import DiscountProducts from "../_components/home_page/discount_products";
import PopularBrands from "../_components/home_page/popular_brands";
import SelectedProducts from "../_components/home_page/selected_products";
import DaneshFeatures from "../_components/home_page/danesh_features";
import Footer from "../_components/common/footer/footer";

export default function HomePage() {
  return (
    <main className="bg-[#FDFCFF]">
      <Header />
      <div className="h-[28.5px]"></div>
      <HomeBanners />
      <div className="h-[40px]"></div>
      <Categories />
      <div className="h-[40px]"></div>
      <SuggestedProducts />
      <div className="h-[78px]"></div>
      <DaneshServices />
      <div className="h-[78px]"></div>
      <DiscountProducts />
      <div className="h-[60px]"></div>
      <PopularBrands />
      <div className="h-[78px]"></div>
      <SelectedProducts />
      <div className="h-[75px]"></div>
      <DaneshFeatures />
      <div className="h-[90px]"></div>
      <Footer />
    </main>
  );
}