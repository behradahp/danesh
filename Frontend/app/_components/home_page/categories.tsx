"use client";

// Components
import CategoryCard from "./category_card";

// Icons
import AllInOneIcon from "@/public/images/home_categories/all-in-one.png";
import laptop from "@/public/images/home_categories/laptop.png";
import networkSwitch from "@/public/images/home_categories/netwok-switch.png";

const CATEGORIES = [
  {
    id: 1,
    name: "آل این وان",
    image: AllInOneIcon,
  },
  {
    id: 2,
    name: "لپ تاپ",
    image: laptop,
  },
  {
    id: 3,
    name: "گیمینگ",
    image: AllInOneIcon,
  },
  {
    id: 4,
    name: "سوییچ شبکه",
    image: networkSwitch,
  },
  {
    id: 5,
    name: "لوازم جانبی الکترونیکی",
    image: AllInOneIcon,
  },
  {
    id: 6,
    name: "لوازم جانبی غیر الکترونیکی",
    image: AllInOneIcon,
  },
];

export default function Categories() {
  return (
    <section className='flex justify-between px-[45px]'>
      {CATEGORIES.map((item) => {
        return (
          <div key={item.id}>
            <CategoryCard name={item.name} image={item.image} id={item.id} />
          </div>
        );
      })}
    </section>
  );
}
