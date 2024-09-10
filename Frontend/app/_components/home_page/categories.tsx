"use client";

import { useEffect, useState } from "react";

// Components
import CategoryCard from "./category_card";

// Icons
import SliderRightChevron from "../icons/slider_right_chevron";
import SliderLeftChevron from "../icons/slider_left_chevron";

// Api
import { getCategories } from "@/app/actions/actions";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [sliderIndex, setSliderIndex] = useState<number>(0);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      const data: Category[] = res.data;
      setCategories(data);
    };

    fetchCategories();
  }, []);
  
  return (
    <section className='flex items-center justify-between px-[45px]'>
      <div
        onClick={() => {
          if (sliderIndex == 0) {
            setSliderIndex(0.06);
            setTimeout(() => setSliderIndex(0), 100);
            return;
          }
          setSliderIndex((prev) => prev - 1);
        }}
      >
        <SliderRightChevron />
      </div>

      <div className='flex-grow overflow-hidden'>
        <div
          className='w-full flex gap-[25px] px-[25px] transition-all duration-300'
          style={{ transform: `translateX(${226 * sliderIndex}px)` }}
        >
          {
            categories.map((category) => {
              return <div key={category.id}>
                <CategoryCard id={category.id} image={category.image} name={category.name}/>
              </div>
            })
          }
        </div>
      </div>

      <div
        onClick={() => {
          if (sliderIndex == categories.length - 6) {
            setSliderIndex(prev => prev + 0.06);
            setTimeout(() => setSliderIndex(categories.length - 6), 100);
            return;
          }
          setSliderIndex((prev) => prev + 1);
        }}
      >
        <SliderLeftChevron />
      </div>
    </section>
  );
}
