import FilterIcon from "../../icons/filter_icon";

export default function CategoryPageFilterTitle() {
    return <div className="w-[240px] h-[40px] flex justify-between items-center px-[12px] border border-[#929292] rounded-t-[6px]">
        <span className="text-[16px] text-[#707070] font-YekanBakhBold">فیلترها</span>
        <FilterIcon />
    </div>
}