"ue client";

import { useEffect, useState } from "react";
import moment from "jalali-moment";

import ChevronDownIcon from "../icons/chevron_down_icon";

const weekDays = [
  "شنبه",
  "یک‌شنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
];

export default function Calendar() {
  const [info, setInfo] = useState({
    startDayIndex: 0,
    daysInMonth: 31,
    actualDate: {
      year: 1403,
      month: "فروردین",
      day: 1,
    },
    selectedDate: {
      year: 1403,
      month: "فروردین",
      day: 1,
    },
  });

  const firstDayOfMonth = (day: number, dayName: string) => {
    let index = weekDays.indexOf(dayName);
    while (day != 1) {
      day -= 1;
      index -= 1;
      if (index == -1) {
        index = 6;
      }
    }

    return index;
  };

  useEffect(() => {
    const date = moment().locale("fa");

    setInfo({
      startDayIndex: firstDayOfMonth(Number(date.format("D")), date.format("dddd")),
      daysInMonth: date.daysInMonth(),
      actualDate: {
        year: Number(date.format("YYYY")),
        month: date.format("MMMM"),
        day: Number(date.format("D")),
      },
      selectedDate: {
        year: Number(date.format("YYYY")),
        month: date.format("MMMM"),
        day: Number(date.format("D")),
      },
    });
  }, []);

  return (
    <div className='w-[530px] h-[337px] flex flex-col gap-[15px] p-[5px] pt-[10px] bg-white rounded-[10px]'>
      {/* Month and year */}
      <div className='w-full flex justify-between'>
        <div className='rotate-[-90deg]'>
          <ChevronDownIcon />
        </div>

        <span className='text-[20px] text-black font-YekanBakhHeavy'>
          {info.selectedDate.month}  {info.selectedDate.year.toLocaleString("fa").replace("٬", "")}
        </span>

        <div className='rotate-90'>
          <ChevronDownIcon />
        </div>
      </div>

      {/* Days of week */}
      <div className='w-full flex bg-[#6695FF] py-[5px] rounded-[10px]'>
        {weekDays.map((item, index) => {
          return (
            <div key={index} className='w-[75px] flex justify-center'>
              <span className='text-[14px] text-white font-YekanBakhMedium'>
                {item}
              </span>
            </div>
          );
        })}
      </div>

      {/* Dates */}
      <div className='w-full flex flex-wrap gap-y-[10px]'>
        {[...Array(info.daysInMonth + 10)].map((item, index) => {
          return (
            <div key={index} className='w-[74px] flex justify-center'>
              <div className='w-[35px] h-[35px] flex justify-center items-center rounded-[10px]'>
                {index < info.startDayIndex || index > 32 ? (
                  <></>
                ) : (
                  <span className={`${info.actualDate.year === info.selectedDate.year && info.actualDate.month === info.selectedDate.month && index + 1 - info.startDayIndex === info.actualDate.day ? 'border border-[#6695FF] rounded-[100px] px-[8px]' : ''} mt-[5px] text-[20px] text-[#63626A] font-YekanBakhMedium`}>
                    {(index + 1 - info.startDayIndex).toLocaleString("fa")}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
