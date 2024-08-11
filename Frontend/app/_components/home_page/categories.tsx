"use client";

// Components
import CategoryCard from "./category_card";

// Icons
import AllInOneIcon from "@/app/_components/icons/home_categories_icons/all_in_one_icon";
import LaptopIcon from "@/app/_components/icons/home_categories_icons/laptop_icon";
import GamingIcon from "@/app/_components/icons/home_categories_icons/gaming_icon";
import NetworkSwitchIcon from "@/app/_components/icons/home_categories_icons/network_switch_icon";
import DigitalAccessoriesIcon from "@/app/_components/icons/home_categories_icons/digital_accessories_icon";
import NonDigitalAccessoriesIcon from "../icons/home_categories_icons/non_digital_accessories_icon";

const CATEGORIES = [
  {
    id: 1,
    name: "آل این وان",
    icon: AllInOneIcon,
  },
  {
    id: 2,
    name: "لپ تاپ",
    icon: LaptopIcon,
  },
  {
    id: 3,
    name: "گیمینگ",
    icon: GamingIcon,
  },
  {
    id: 4,
    name: "سوییچ شبکه",
    icon: NetworkSwitchIcon,
  },
  {
    id: 5,
    name: "لوازم جانبی الکترونیکی",
    icon: DigitalAccessoriesIcon,
  },
  {
    id: 6,
    name: "لوازم جانبی غیر الکترونیکی",
    icon: NonDigitalAccessoriesIcon,
  },
];

export default function Categories() {
  return (
    <section className='flex justify-between px-[45px]'>
      {CATEGORIES.map((item) => {
        return (
          <div key={item.id}>
            <CategoryCard name={item.name} Icon={item.icon} id={item.id} />
          </div>
        );
      })}
    </section>
  );
}
