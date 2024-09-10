import SortIcon from "../../icons/sort_icon";

export default function CategoryPageSorts() {
  return (
    <div className='w-[500px] h-[40px] flex justify-between items-center px-[12px] border border-[#929292] rounded-[6px]'>
      <div className='flex gap-[26px] items-center'>
        <span className='text-[16px] text-[#707070] font-YekanBakhBold'>
          مرتب سازی:
        </span>

        <span className='text-[16px] text-[#707070] font-YekanBakhRegular'>
          جدیدترین
        </span>
        <span className='text-[16px] text-[#707070] font-YekanBakhRegular'>
          ارزان ترین
        </span>
        <span className='text-[16px] text-[#707070] font-YekanBakhRegular'>
          گران ترین
        </span>
      </div>

      <SortIcon color="#A08CAF"/>
    </div>
  );
}
