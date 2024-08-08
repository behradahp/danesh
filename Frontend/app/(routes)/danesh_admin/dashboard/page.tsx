"use client";
import { useEffect, useState } from "react";
import { colorPalette } from "@/app/constants/color_palette";
import axios from "axios";
import { url } from "@/app/constants/url";

// Components
import PanelLayout from "@/app/_components/admin_panel/panel_layout";
import Calendar from "@/app/_components/admin_panel/calendar";

// Icons
import CategoryIcon from "@/app/_components/icons/category_icon";

// api
import { productsCategoryCount } from "@/app/actions/actions";

const selectedColors: number[] = [];

export default function AdminDashboard() {
  const [categories, setCategories] = useState<ProductCount | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  const [categoryColors, setCategoryColors] = useState<string[]>([])

  const handleRandomColor = () => {
    if (selectedColors.length == colorPalette.length) selectedColors.length = 0;
    while (true) {
      const index = Math.floor(Math.random() * colorPalette.length);
      if (!selectedColors.includes(index)) {
        selectedColors.push(index);
        return index;
      }
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const res = await productsCategoryCount();
      setLoading(false);

      setCategories(res.data);

      const list = [];
      for(let item = 0; item < res.data.categories.length; item++) {
        list.push(colorPalette[handleRandomColor()]);
      }
      console.log(list);
      setCategoryColors(list);
    };

    fetchCategories();

    const fetchNote = async () => {
      const res = await axios.get(`${url}api/note/1`);

      setNote(res.data.text);
    };

    fetchNote();
  }, []);

  const handleNoteEdit = async () => {
    const data = new FormData();
    data.append("text", note);
    const res = await axios.put(`${url}api/note/1/`, data);
  };

  return (
    <PanelLayout section_id='1'>
      <div className='flex-grow w-[100%] pt-[26px] px-[30px] dsk:px-[62px] overflow-y-auto'>
        {/* ---------------------------- Title ----------------------------------- */}
        <span className='text-[24px] text-back font-YekanBakhBold'>
          داشبورد
        </span>

        <div className='h-[35px]'></div>

        {/* ---------------------------- Products Count ----------------------------------- */}
        <div className='max-w-[100%] flex gap-[10px] overflow-x-auto pb-[8px]'>
          {loading ? (
            <div>LOADING...</div>
          ) : categories ? (
            <>
              {true ? (
                <div className='flex-shrink-0 w-[200px] h-[60px] flex justify-between items-center bg-white rounded-[8px] px-[10px] shadow-default'>
                  {/* ---------------------------- Icon ----------------------------------- */}
                  <div
                    className={`w-[30px] h-[30px] flex justify-center rounded-[100px]`}
                    style={{ backgroundColor: "#606036" }}
                  >
                    <CategoryIcon color='white' />
                  </div>

                  {/* ---------------------------- Category Info ----------------------------------- */}
                  <div dir='ltr' className='flex flex-col'>
                    <span className='text-[14px] text-[#0000009a] font-YekanBakhMedium'>
                      کل محصولات
                    </span>
                    <span className='text-[18px] font-YekanBakhBold'>
                      {categories.all.toString()}
                    </span>
                  </div>
                </div>
              ) : (
                <></>
              )}
              {categories.categories.map((item, index) => {
                return (
                  <div
                    key={index}
                    className='flex-shrink-0 w-[200px] h-[60px] flex justify-between items-center bg-white rounded-[8px] px-[10px] shadow-default'
                  >
                    {/* ---------------------------- Icon ----------------------------------- */}
                    <div
                      className={`w-[30px] h-[30px] flex justify-center rounded-[100px]`}
                      style={{
                        backgroundColor: categoryColors[index],
                      }}
                    >
                      <CategoryIcon color='white' />
                    </div>

                    {/* ---------------------------- Category Info ----------------------------------- */}
                    <div dir='ltr' className='flex flex-col'>
                      <span className='text-[14px] text-[#0000009a] font-YekanBakhMedium'>
                        {item.name}
                      </span>
                      <span className='text-[18px] font-YekanBakhBold'>
                        {item.count.toString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div>FAILED</div>
          )}
        </div>

        <div className='h-[46px]'></div>

        {/* ---------------------------- Notes & Calendar ---------------------------- */}
        <div className='w-[100%] flex justify-between'>
          {/* ---------------------------- Notes ---------------------------- */}
          <div className='w-[530px] flex flex-col gap-[20px] py-[21px] px-[36px] bg-white rounded-[10px]'>
            <div className='w-full flex justify-between'>
              <span className='tet-[16px] font-YekanBakhMedium'>
                یادداشت ها
              </span>
              <button
                className='w-[145px] h-[24px] bg-[#6695FF] rounded-[10px] text-white font-YekanBakhMedium'
                onClick={handleNoteEdit}
              >
                ثبت
              </button>
            </div>

            <textarea
              name=''
              id=''
              className='min-h-[253px] w-full border-2 border-[#EBEBEB] rounded-[10px] p-[10px]'
              defaultValue={note}
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
              }}
            />
          </div>

          <Calendar />
        </div>
      </div>
    </PanelLayout>
  );
}
