import BreadCrumbIcon from "../../icons/bread_crumb_icon";

const BreadCrumb = ({category, productName}: {category?: Category, productName?: string}) => {
    return <div className="flex gap-[10px] items-center mr-[84px]">
        <span className="text-[14px] text-[#929292] font-YekanBakhMedium">خانه</span>
        <BreadCrumbIcon />
        <span className="text-[14px] text-[#929292] font-YekanBakhMedium">{category?.name}</span>
        <BreadCrumbIcon />
        <span className="text-[14px] text-[#929292] font-YekanBakhMedium">{productName}</span>
    </div>;
}

export default BreadCrumb;