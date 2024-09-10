import ChevronDownIcon from "../../icons/chevron_down_icon";

export default function CategoryPageFilters() {
  return (
    <div className='flex-shrink-0 w-[240px] h-[830px] flex flex-col gap-[13px] py-[12.5px] px-[14px] rounded-b-[6px] border border-[#929292]'>
      <div className='w-full flex items-center justify-between cursor-pointer'>
        <span className='text-[16px] text-[#666666] font-YekanBakhMedium'>
          محدوده قیمت
        </span>
        <ChevronDownIcon />
      </div>
      <div className='w-full flex items-center justify-between cursor-pointer'>
        <span className='text-[16px] text-[#666666] font-YekanBakhMedium'>
          برند
        </span>
        <ChevronDownIcon />
      </div>
      <div className='w-full flex items-center justify-between cursor-pointer'>
        <span className='text-[16px] text-[#666666] font-YekanBakhMedium'>
          رنگ
        </span>
        <ChevronDownIcon />
      </div>
    </div>
  );
}
