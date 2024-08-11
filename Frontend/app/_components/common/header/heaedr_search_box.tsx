// Icons
import SearchIcon from "@/app/_components/icons/search_icon";

export default function HeaderSearchBox() {
  return (
    <div className='w-[705px] h-[56px] flex items-center bg-[#F8F8F8] px-[10px] rounded-[5px]'>
      <input
        type='text'
        className='flex-grow outline-none bg-transparent font-YekanBakhMedium text-[20px] placeholder:text-[20px] placeholder:text-[#707070] placeholder:font-YekanBakhMedium'
        placeholder='جستجو'
      />

      <SearchIcon color='#A08CAF' />
    </div>
  );
}
