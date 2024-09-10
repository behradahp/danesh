const ProductPageAttributes = ({attributes} : {attributes: Attribute[];}) => {
    return <div className="w-full bg-white rounded py-[14px] px-[31px]">
        <span className="text-[20px] text-[#263238] font-YekanBakhMedium">مشخصات فنی</span>
        <div className='h-[34px]'></div>

        {
            attributes.map(item => {
                return <div key={item.id} className="mb-[18px] w-full h-[51px] flex justify-between py-[15px] px-[23px] bg-[#F8F8F8] rounded">
                    <span className="text-[18px] text-[#263238] font-YekanBakhMedium">{item.key}</span>
                    <span className="text-[18px] text-[#263238] font-YekanBakhMedium">{item.value}</span>
                </div>
            })
        }
    </div>
}

export default ProductPageAttributes